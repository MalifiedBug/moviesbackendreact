import express from 'express'
import { client } from '../index.js';
import { getAllMovies, getMovieById,createMovies, deleteMovieById, updateMovieById } from '../services/movies.service.js';


const router = express.Router();



router.post("/",express.json(), async function(request,response){
    const data = request.body;
    
    const movie = await createMovies(data)
  
    response.send(movie)
      
  })
  
  router.get("/", async function (request, response){
  
  
    if(request.query.rating){
      request.query.rating = +request.query.rating;
    }
  
    //cursor as pagination cursor to arry use toArray()
    const movies = await getAllMovies(request);

    response.send(movies);
  })
  
  
  router.get("/:id", async function(request, response){
  const {id} = request.params;
  
  const movie = await getMovieById(id)
  
  movie?
  response.send(movie)
  :response.status(404).send({msg:"not found"})
  })
  
  router.delete("/:id", async function(request, response){
    const {id} = request.params;
  
    const movie = await deleteMovieById(id);
  
    movie.deletedCount > 0?
    response.send({msg:`movie deleted sucessfully`})
    :response.status(404).send({msg: "movie not found"})
  
  })
  
  
  router.put("/:id", async function(request, response){
    const {id} = request.params;
    const data = request.body;
    
    const movie = await updateMovieById(id, data)
    
    movie?
    response.send({msg:"movie update successfully"})
    :response.status(404).send({msg:"not found"})
    })

export default router;


    


