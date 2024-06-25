import { useEffect, useState } from 'react';
import './App.css';
import Auth from './componets/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './config/firebase';

function App() {

  let [moviesList, setMoviesList] = useState([])


  // new movie States 
  let [newMovieTitle, setNewMovieTitle] = useState("")
  let [newMovieRelaseDate, setNewMovieRelaseDate] = useState(0)
  let [newMovieOscar, setNewMovieOscar] = useState(false)

  // update States
  let [updateMovieTitle, setUpdateMovieTitle] = useState("")


  // get the ref of your table ,, from db with table name's movies
  let moviesCollectionRef = collection(db, 'movies')

  const getMoviesList = async () => {
    try {
      // get docs (rows of the table)
      const data = await getDocs(moviesCollectionRef)
      // console.log(data)
      let filteredData = data.docs.map(doc => (
        { ...doc.data(), id: doc.id }
      ))
      setMoviesList(filteredData)
    }
    catch (err) {
      console.log(err)
    }
  }



  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef,
        {
          title: newMovieTitle,
          relaseDate: newMovieRelaseDate,
          receivedAnOscar: newMovieOscar
        }
      )
      getMoviesList()
    }
    catch (error) {
      console.log(error)
    }
  }


  const deleteMovie = async (id) => {
    let movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  }


  const updateMovie = async (id) => {
    let movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {
      title: updateMovieTitle
    })
  }






  useEffect(() => {

    getMoviesList()

  }, [])






  return (
    <>
      <Auth />
      <div>
        <input onChange={e => setNewMovieTitle(e.target.value)} placeholder='Movie Title...' />
        <input onChange={e => setNewMovieRelaseDate(e.target.value)} placeholder='Movie Release...' type='number' />
        <input checked={newMovieOscar} onChange={e => setNewMovieOscar(e.target.checked)} placeholder='Movie oscar...' type='checkbox' />
        <lable>Recived An Oscar :</lable>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {moviesList.map((movie, index) => (
          <div key={index}>
            <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'black' }}>
              {movie.title}
            </h1>
            <p>Date : {movie.relaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input placeholder='new Title ...' onChange={e => setUpdateMovieTitle(e.target.value)} />
            <button onClick={() => updateMovie(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
    </>

  );
}

export default App;
