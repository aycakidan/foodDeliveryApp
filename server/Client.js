const { MongoClient } = require('mongodb');
const express = require('express');

  // Connection URL
  const url = 'mongodb+srv://aycakidan:aycakidan@aycakidan.idv7hli.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);

  // Database Name
const dbName = 'FoodDeliveryDB';

var Database;
 
class MongoDatabase{

  async StartClient() {
    // Use connect method to connect to the server  
    await client.connect()
    console.log('Connected successfully to server');
    Database = client.db(dbName);

    const app = new express();

    // Define your routes here

    // Example route
    app.get('/members', async (req, res) => {
        // Code to retrieve members from the database
        // and send the response back
        const members = await Database.collection('Members').find().toArray();
        res.json(members);
    });

    // Start the server
    const port = 4000;
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
  
    return app;
  }
  
  // Register member
  async AddMember(name, surname, email, phoneNumber, adress){
    var member = {name: name, surname: surname, email: email, phoneNumber: phoneNumber, adress: adress}
    var collection = await Database.collection("Members");
    await collection.insertOne(member);
    return await this.GetMember(member);
  }

  // Unregister member
  async DeleteMember(member){
    var collection = await Database.collection("Members");
    await collection.deleteOne(member)
  }

  // Check if member exist in database
  async CheckMember(member){
    var collection = await Database.collection("Members");
    var count = await collection.count(member, {limit: 1});
    if(count > 0) return true;
    else return false;
  }

  async GetMember(member){
    var collection = await Database.collection("Members");
          
    if(await this.CheckMember(member)){
      var m = await collection.find(member).toArray();
      return m[0]; 
    }
    else return 'The member does not exists in the database.'
  }

  // email: 
  // password: 
  // firstName: 
  // lastName: 
  // phoneNumber: 

  async CheckFood(food){
    var collection = await Database.collection("Foods");
    var count = await collection.count({item: food}, {limit: 1});
    if(count > 0) return true;
    else return false;
  }

  async GetFood(food){
    var collection = await Database.collection("Foods");
    if(await this.CheckFood(food)){
      var f = await collection.find({item: food}).toArray();
      return f[0]; 
    }
    else return 'This food does not exists in the database.'
  }

  async CreateCollection(){
    var inserted_elements = await collection.insertMany([  //insert operation for adding content in the menu

      { item : 'Soup',price : 40,},

      {item : 'Pasta',price : 100,},

      {item : 'Fish',price : 300,},

      {item : 'Chicken',price : 150,},
      
      {item : 'Dessert',price : 80,},

      {item : 'Fruits',price : 60,},
        
      { item : 'Drinks', price : 20,}

    ]);

  }
  

  async GetCollection(name){
    const collection = await Database.collection(name)
    return await collection.find({}).toArray();
  }
}
    
var db = new MongoDatabase();
var app = db.StartClient();