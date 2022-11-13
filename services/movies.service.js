import { client } from '../index.js';

export async function updateMovieById(id, data) {
    return await client.db("MoviesApp")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client
        .db("MoviesApp")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function getMovieById(id) {
    return await client.db("MoviesApp")
        .collection("movies")
        .findOne({ id: id });
}
export async function getAllMovies(request) {
    return await client
        .db("MoviesApp")
        .collection("movies")
        .find(request.query)
        .toArray();
}

export async function createMovies(data) {
    return await client.db("MoviesApp")
        .collection("movies")
        .insertMany(data);
}

