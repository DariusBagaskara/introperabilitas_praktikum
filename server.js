const express = require('express');
const app = express();
const port = 3200;

app.use(express.json());

let movies = [
    {id: 1, title: 'Parasite', director: 'Bong Joon-ho', year: 2019 },
    {id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 },
    {id: 3, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 }
];

let directors = [
    { id: 1, name: 'Bong Joon-ho', year: 2019 },
    { id: 2, name: 'Francis Ford Coppola', year: 1972 },
    { id: 3, name: 'Christopher Nolan', year: 2008 }
];



app.get('/',(req, res) => {
    res.send('Selamat datang di API Film!');
});

app.get('/movies',(req, res) => {
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Film tidak ditemukan');
    }
});
app.get('/movies/title/:title', (req, res) => {
    const movie = movies.find(m => m.title.toLowerCase() === req.params.title.toLowerCase());
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Film tidak ditemukan');
    }
});

app.get('/directors', (req, res) => {
    res.json(directors);
});

app.get('/directors/:id', (req, res) => {
    const director = directors.find(d => d.id === parseInt(req.params.id));
    if (director) {
        res.json(director);
    } else {
        res.status(404).send('Sutradara tidak ditemukan');
    }
});


app.post('/movies', (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.post('/directors', (req, res) => {
    const newDirector = {
        id: directors.length + 1,  
        name: req.body.name,
        year: req.body.year
    };
    directors.push(newDirector);
    res.status(201).json(newDirector);
});


// PUT/movies/:id-Memperbaruidatafilm
 app.put('/movies/:id',(req, res)=>{
     const id=Number(req.params.id);
      const movieIndex=movies.findIndex(m=>m.id===id);
       if(movieIndex===-1){
         returnres.status(404).json({error:'Movietidakditemukan'});
 }
  const {title,director, year}=req.body||{};
   const updatedMovie={id,title,director,year};
    movies[movieIndex]=updatedMovie;
     res.json(updatedMovie);
});

// DELETE/movies/:id-Menghapusfilm
 app.delete('/movies/:id',(req,res)=>{
     const id=Number(req.params.id);
      const movieIndex=movies.findIndex(m=>m.id===id);
       if(movieIndex===-1){
         returnres.status(404).json({error:'Movietidakditemukan'});
 }
 movies.splice(movieIndex,1);
 res.status(204).send();
});

// error handler terpusat
 app.use((err, req, res, _next) => {
 console.error('[ERROR]', err);
 res.status(500).json({ error: 'Terjadi kesalahan pada server' });
 });

// app.get('/movies/:director', (req, res) => {
//     const movie = movies.find(m => m.id === parseInt(req.params.id));
//     if (movie) {
//         res.json(movie);
//     } else {
//         res.status(404).send('Film tidak ditemukan');
//     }
// });

app. listen(port, () => {
    console.log(`Server Berjalan di http://localhost:${port}`);
});