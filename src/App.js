import logo from './logo.svg';
import './App.css';
import Movie from './components/Movie';
import { useEffect, useState } from 'react';
import UploadImage from './components/UploadImage';
import axios from "axios"

function App() {

    let [movies, setMovies] = useState([])
    let [showModal, setShowModal] = useState(false)
    let [modalMovieName, setModalMovieName] = useState("")
    let [modalMovieUrl, setModalMovieUrl] = useState("")
    let [modalMovieRating, setModalMovieRating] = useState(0)
    let [file, setFile] = useState(null)

    useEffect(() => {
        axios.get("https://movie-app-example-backend.herokuapp.com/movies")
        .then(res => {
            let tempMoviesArr = res.data
            setMovies(tempMoviesArr)
        })
    }, [])

    async function getMovies(){
        let tempMoviesArr = (await axios.get("https://movie-app-example-backend.herokuapp.com/movies")).data
        console.log(tempMoviesArr)
        setMovies(tempMoviesArr)
    }

    const addMovie = async (e) => {

        e.preventDefault()
        //insert code to add movie to database
        if(parseInt(modalMovieRating) <= 5){

            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'mongodb-demo')

            const data = (await axios.post("https://api.cloudinary.com/v1_1/dvrjxs1zg/image/upload", formData)).data

            let movie = {
                url: data.secure_url,
                name: modalMovieName,
                rating: parseInt(modalMovieRating)
            }
            console.log(movie)
            await axios.post("https://movie-app-example-backend.herokuapp.com/movies/add", movie)
                .then(res => {console.log(res.data)})

            setShowModal(false)
            getMovies()
        }
    }

    return (
        <div className=''>
            <div className='flex justify-between items-center w-full py-4 px-20 bg-slate-800'>
                <p className='text-2xl font-semibold text-gray-200'>Movie App</p>
                <div className='bg-blue-600 px-4 py-2 rounded text-white cursor-pointer'
                    onClick={() => {
                        console.log("HERE")
                        setShowModal(true)
                    }}>
                    <p>Add Movie</p>
                </div>
            </div>
            <div className='min-h-screen grid grid-cols-4 px-20 gap-8 pt-6 bg-slate-900 pb-8'>
                {
                    movies.map((movie, index) => {
                        return (
                            <Movie url={movie.url} name={movie.name} rating={movie.rating} />
                        )
                    })
                }
            </div>
            {
                showModal &&
                <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div class="fixed inset-0 z-10 overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center text-center sm:items-center">
                            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-white px-10 py-6">
                                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 class="text-xl font-medium leading-6 text-gray-900" id="modal-title">Add Movie</h3>
                                    <div class="mt-4 w-full">
                                        <div className='w-full space-y-4'>
                                            <input className='border w-full outline-red-blue-500 py-1 px-2 rounded' type="text" onChange={(e) => { setModalMovieName(e.target.value) }} placeholder="Movie Name" />
                                            <UploadImage file={file} setFile={setFile} />
                                            <div className='flex space-x-2 items-center'>
                                                <p>Rating: </p>
                                                <input className='border w-10 outline-red-blue-500 py-1 px-2 rounded' type="text" onChange={(e) => { setModalMovieRating(e.target.value) }} />
                                                <div>
                                                    <p>/5</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-3 sm:flex sm:flex-row-reverse">
                                    <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={addMovie}>Add</button>
                                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => { setShowModal(false) }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default App;
