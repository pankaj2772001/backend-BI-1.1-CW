const {initializeData} = require('./db/db.connect')

initializeData()

const express = require('express')

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const Movie = require('./models/movies.model')


//cors

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//get all movies

async function getAllMovies(){

    try {

        const movie = await Movie.find()

        return(movie)
        
    } catch (error) {

        console.log("Failed to find movie", error)
        
    }
}

// getAllMovies()

app.get('/movies', async (req, res) => {

    try {

        const movie = await getAllMovies()

        if(movie.length != 0){

            res.json(movie)
        }else{

            res.status(404).json({error: "Movie not found"})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch data"})
        
    }
})


//read movie by title

async function readMovieByTitle(movieTitle) {

    try {

        const movie = await Movie.findOne({title: movieTitle})
        return movie

        
    } catch (error) {

        throw error
        
    }
    
}

// readMovieByTitle("Bahubali: The Beginning")

app.get('/movies/:title', async (req, res) => {

    try {

        const movie = await readMovieByTitle(req.params.title)


        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(404).json({error: "Movie not found"})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch movie."})
        
    }
})



async function createMovie(newMovie){

    try {

        const movie = new Movie(newMovie)
        const saveMovie = await movie.save()
        return saveMovie
        
    } catch (error) {

        throw error
        
    }


}

// createMovie(newMovie)

app.post('/movies', async (req, res) => {

    try {

        const movie = await createMovie(req.body)

        res.status(201).json({message: "Movie added successfully", newMovie: movie})
        
    } catch (error) {

        res.status(500).json({error: "Failed to add movie."})
        
    }
    
    
})


app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})