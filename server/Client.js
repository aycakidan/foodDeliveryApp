const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

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
  
  // Register member
  async AddMember(){
    app.post('/members', async (req, res) => {
      try {
        const memberData = req.body;

        const members = await Database.collection('Members');
        await members.insertOne(memberData);

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
        // Perform the database query to check if the user is a member
        const member = await members.findOne({ username: username, password: password });

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
    app.delete('/members/:id', async (req, res) => {
      try {
        const id = req.params.id;

        const members = await Database.collection('Members');
        const member = await members.findOne({ _id: id });

        if(member){ 
          await member.deleteOne({ _id: id });
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

    const memberSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      address: String,
      phoneNumber: String
    });

    const member = mongoose.model('Member', memberSchema);

    app.put('/members/:id', async (req, res) => {
      try {
        const memberId = req.params.id;
        const updatedData = req.body;

        const result = await member.findByIdAndUpdate(memberId, updatedData);
    
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
}
    
async function InitializeExpress(){
  var db = new MongoDatabase();
  
  await client.connect()
    console.log('Connected successfully to server');
    Database = client.db(dbName);

  await db.GetCollections();
  await db.AddMember();
  await db.LoginCheck();
  await db.DeleteMember();
  await db.AddMemberInfo();
  await db.RegisterCheck();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
    
  //client.close();
}

InitializeExpress();
