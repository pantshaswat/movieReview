import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import ReviewsDAO from "./dao/reviewsDAO.js";

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.mongo_username;
const mongo_password = process.env.mongo_password;

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ljlchyr.mongodb.net/?retryWrites=true&w=majority`;
const port = 8000;
const hostname = '127.0.0.1';
MongoClient.connect(uri,{
    maxPoolSize: 50,
    wtimeoutMS: 2500,
   
}).catch(err =>{
    console.error(err.stack);
    process.exit(1);
}).then(async client =>{
    await ReviewsDAO.injectDB(client);
    app.listen(port,()=>{
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});
