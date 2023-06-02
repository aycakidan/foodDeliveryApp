const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

  // Connection URL
  const url = 'mongodb+srv://aycakidan:aycakidan@aycakidan.idv7hli.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);

  // Database Name
const dbName = 'FoodDeliveryDB';
const app = new express();

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

var Database;
 
class MongoDatabase{

  async GetCollections() {
    // Members route
    app.get('/members', async (req, res) => {
        const members = await Database.collection('Members').find().toArray();
        res.json(members);
    });

    // Foods route
    app.get('/foods', async (req, res) => {
      const foods = await Database.collection('Foods').find().toArray();
      res.json(foods);
    });
  }
  
  // Register member
  async AddMember(){
    app.post('/members', async (req, res) => {
      try {
        const memberData = req.body;

        await client.connect()
        console.log('Connected successfully to server');

        const members = await Database.collection('Members');
        await members.insertOne(memberData);

        res.status(201).json({ message: 'Item inserted successfully' });
      } catch (error) {
        console.error('Error inserting item:', error);
        res.status(500).json({ error: 'Failed to insert item' });
      }
    })
  }

  async CheckIfMember(){
    app.post('/members/login', async (req, res) => {
      // Retrieve the user data from the request, e.g., req.query.username or req.query.email
      const { password, email } = req.body;

      try {
        const members = await Database.collection('Members');
        // Perform the database query to check if the user is a member
        const member = await members.findOne({ email: email, password: password });

        if (member) {
          // Member exists, send a success response
          res.json({ success: true, message: 'Member login successful' });
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
}
    
async function InitializeExpress(){
  var db = new MongoDatabase();
  
  await client.connect()
    console.log('Connected successfully to server');
    Database = client.db(dbName);

  await db.GetCollections();
  await db.AddMember();
  await db.CheckIfMember();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
    
  //client.close();
}

InitializeExpress();
