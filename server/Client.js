const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var cookieParser = require('cookie-parser');
const { ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://aycakidan:aycakidan@aycakidan.idv7hli.mongodb.net/?retryWrites=true&w=majority';

  // Database Name
const dbName = 'FoodDeliveryDB';

const app = new express();

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

  // Configure session store
const store = new MongoDBStore({
  uri: 'mongodb+srv://aycakidan:aycakidan@aycakidan.idv7hli.mongodb.net/FoodDeliveryDB?retryWrites=true&w=majority',
  collection: 'Members'
});

// Catch errors in session store
store.on('error', function (error) {
  console.error('Session store error:', error);
});

// Configure session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    // Cookie name
    name: 'App Session',

    // Set the cookie options
    maxAge: 3600000, // Cookie expiration time in milliseconds
    secure: true, // Set to true if using HTTPS
    httpOnly: true, // Prevent client-side JavaScript access
    sameSite: 'strict', // Set the SameSite attribute (strict, lax, or none)
  }
}));

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

const port = 4000;

var Database;
 
class MongoDatabase{

  async GetCollections() {
    app.get('/members', async (req, res) => {
      try {
        const members = await Database.collection('Members').find().toArray();
        res.json(members);
      } catch (error) {
        console.error('Could not find members collection:', error)
        res.status(500).json({ error: 'Could not find members collection' });
      }
    });

    app.get('/foods', async (req, res) => {
      try {
        const foods = await Database.collection('Foods').find().toArray();
        res.json(foods);
      } catch (error) {
        console.error('Could not find foods collection:', error)
        res.status(500).json({ error: 'Could not find foods collection' });
      }
    });
  }

  async DeleteFood(){
    app.delete('/foods/:categoryIndex/:foodIndex', async (req, res) => {
      try {
        const foods = await Database.collection('Foods').find().toArray();
        const categoryIndex = parseInt(req.params.categoryIndex);
        const foodIndex = parseInt(req.params.foodIndex);
    
        if (
          Number.isNaN(categoryIndex) ||
          categoryIndex < 0 ||
          Number.isNaN(foodIndex) ||
          foodIndex < 0
        ) {
          return res.status(400).json({ error: 'Invalid category or food index' });
        }
    
        if (
          categoryIndex >= foods.length ||
          foodIndex >= foods[categoryIndex].items.length
        ) {
          return res.status(404).json({ error: 'Invalid category or food index' });
        }
    
        foods[categoryIndex].items.splice(foodIndex, 1);
        await Database.collection('Foods').updateOne({ label: foods[categoryIndex].label }, { $set: foods[categoryIndex] });
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }
  
  // Register member
  async AddMember(){
    app.post('/members', async (req, res) => {
      try {
        const memberData = req.body;

        const members = await Database.collection('Members');
        const member = await members.insertOne(memberData);
        
        req.session.memberId = member.ops[0]._id;
        res.status(201).json({ message: 'Item inserted successfully' });
      } catch (error) {
        console.error('Error inserting item:', error);
        res.status(500).json({ error: 'Failed to insert item' });
      }
    })
  }

  async LoginCheck(){
    app.post('/members/login', async (req, res) => {
      // Retrieve the user data from the request, e.g., req.query.username or req.query.email
      const { username, password } = req.body;

      if(username === 'admin' && password === 'admin'){
        res.json({ success: true, message: 'Admin login successful' });
        return;
      }

      try {
        const members = await Database.collection('Members');
        const member = await members.findOne({ username: username, password: password });

        if (member) {
          req.session.memberId = member._id;
          req.session.save((error) => {
            if (error) {
              console.error('Error saving session:', error);
              res.status(500).json({ success: false, error: 'Error saving session' });
            } else {
              res.json({ success: true, memberId: req.session.memberId });
            }
          });
        } else {
          // Member does not exist or invalid credentials, send an error response
          res.json({ success: false, message: 'Invalid email or password' });
        }
      } 
      catch (error) {
      console.error('Error occurred while checking member:', error);
      // Handle the error and send an error response
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    })
  }

  async RegisterCheck(){
    app.post('/members/username', async (req, res) => {
      // Retrieve the user data from the request, e.g., req.query.username or req.query.email
      const { username } = req.body;

      if(username === 'admin'){
        res.json({ success: false, message: 'Username can not be admin' });
        console.warn('Username can not be admin')
        return;
      }

      try {
        const members = await Database.collection('Members');
        // Perform the database query to check if the user is a member
        const member = await members.findOne({ username: username });

        if (member) {
          // Member exists, send a success response
          res.json({ success: true, message: 'Username is taken' });
        } else {
          // Member does not exist or invalid credentials, send an error response
          res.json({ success: false, message: 'Username is valid' });
        }
      } 
      catch (error) {
      console.error('Error occurred while checking username:', error);
      // Handle the error and send an error response
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    })

    app.post('/members/email', async (req, res) => {
      const { email } = req.body;

      try {
        const members = await Database.collection('Members');
        const member = await members.findOne({ email: email });

        if (member) {
          // Member exists, send a success response
          res.json({ success: true, message: 'Email is already registered in database' });
        } else {
          // Member does not exist or invalid credentials, send an error response
          res.json({ success: false, message: 'Email is valid' });
        }
      } catch (error) {
        console.error('Error occurred while checking email:', error);
      // Handle the error and send an error response
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    })
  }

  async DeleteMember(){
    app.delete(`/members/:id`, async (req, res) => {
      try {
        const memberId = req.session.memberId;
        const members = await Database.collection('Members');
        const member = await members.findOne({ _id: memberId });

        if(member){ 
          await members.deleteOne({ _id: memberId });
          res.json({ success: true, message: 'Member deleted successfully' });
        }
        else {
          res.json({ success: false, message: 'Member is not represented in database' });
        }
        
      } catch (error) {
        console.error('Error occurred while checking member:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    })
  }

  async AddMemberInfo(){
    app.put('/members/:id', async (req, res) => {
      try {
        const memberId = req.session.memberId;
        const updatedData = req.body;

        const members = await Database.collection('Members');
        const result = await members.updateOne({ _id: memberId }, { $set: updatedData })
    
        if (result) {
          res.json({ success: true, message: 'Member updated successfully' });
        } else {
          res.json({ success: false, message: 'Member not found' });
        }
      } catch (error) {
        console.error('Error occurred while updating member:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    });
  }

  async GetId(){
    app.get('/members/login', async (req, res) => {
      const members = await Database.collection('Members');
      const memberId = req.session.memberId;

      if(ObjectId.isValid(memberId)){
        const member = await members.findOne({ _id: memberId });

        if ( member ) {
          res.json({ success: true, user: member });
        } else {
          res.status(401).json({ success: false, error: 'Member ID not found in session '+ memberId, memberId: ObjectId(memberId) });
        }
      }
    });
  }

  async SendMail(){
    app.post('/send-email', (req, res) => {
      // Extract the necessary information from the request
      const { recipientEmail, orderDetails } = req.body;
    
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'canaltay2001@windowslive.com',
          pass: 'test'
        }
      });
    
      // Compose the email message
      const mailOptions = {
        from: 'canaltay2001@windowslive.com',
        to: recipientEmail,
        subject: 'Order Confirmation',
        text: `Thank you for your order. Here are your order details: ${orderDetails}`
      };
    
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ message: 'Error sending email' });
        } else {
          console.log('Email sent:', info.response);
          res.json({ message: 'Email sent successfully' });
        }
      });
    });
  }
}
    
async function InitializeExpress(){
  var db = new MongoDatabase();
  
  await client.connect().then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
  Database = client.db(dbName);

  await db.GetCollections();
  await db.AddMember();
  await db.LoginCheck();
  await db.DeleteMember();
  await db.AddMemberInfo();
  await db.RegisterCheck();
  await db.GetId();
  await db.SendMail();
  await db.DeleteFood();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
    
  //client.close();
}

InitializeExpress();
