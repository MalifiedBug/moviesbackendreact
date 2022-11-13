import express, { response } from "express"; // "type": "module"
import { Db, MongoClient } from "mongodb";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const app = express();

const PORT = process.env.PORT;


// const MONGO_URL = "mongodb://localhost"; // v5
const MONGO_URL = process.env.MONGO_URL ; // v6

async function createConnection() {
  const client = new MongoClient(MONGO_URL); // dial number
  await client.connect(); // pressing call button
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.post("/movies",express.json(), async function(request,response){
  const data = request.body;
  
  const movie = await client.db("MoviesApp")
  .collection("movies")
  .insertMany(data)

  response.send(movie)
    
})

app.get("/movies", async function (request, response){


  if(request.query.rating){
    request.query.rating = +request.query.rating;
  }

  //cursor as pagination cursor to arry use toArray()
  const movies = await client
  .db("MoviesApp")
  .collection("movies")
  .find(request.query)
  .toArray();
  response.send(movies)
})


app.get("/movies/:id", async function(request, response){
const {id} = request.params;

const movie = await client.db("MoviesApp")
.collection("movies")
.findOne({id: id})

movie?
response.send(movie)
:response.status(404).send({msg:"not found"})
})

app.delete("/movies/:id", async function(request, response){
  const {id} = request.params;

  const movie = await client
  .db("MoviesApp")
  .collection("movies")
  .deleteOne({id: id})

  movie?
  response.send(movie)
  :response.status(404).send({msg: "movie not found"})

})






 

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
