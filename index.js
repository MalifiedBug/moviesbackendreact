import express, { response } from "express"; // "type": "module"
import { Db, MongoClient } from "mongodb";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import moviesRouter from './routes/movies.route.js'

dotenv.config()

const app = express();

const PORT = process.env.PORT;

app.use(express.json())


// const MONGO_URL = "mongodb://localhost"; // v5
const MONGO_URL = process.env.MONGO_URL ; // v6

async function createConnection() {
  const client = new MongoClient(MONGO_URL); // dial number
  await client.connect(); // pressing call button
  console.log("Mongo is connected ✌😊");
  return client;
}

export const client = await createConnection();

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});


app.use("/movies", moviesRouter);

 

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
