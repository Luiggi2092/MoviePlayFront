import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home'
import Movies from './pages/Movies/Movies'
import MoviesDetail from './pages/MoviesDetail/MoviesDetail'
import Series from './pages/Series/Series'
import SerieDetail from './pages/Seriedetail/Seriedetail'
import Register from './pages/Register/register'


const App = () => {

  return (

<BrowserRouter>
 <Routes>
	<Route exact path='/' element={<Landing/>} />
	<Route exact path='/home' element={<Home/>} />
	<Route exact path='/movies' element={<Movies/>} />
	
	<Route exact path='/register' element={<Register/>} />
	<Route exact path='/series' element={<Series/>} />
	<Route exact path='/moviesdetail/:id' element={<MoviesDetail/>} />
	<Route exact path='/detailSeries/:id' element={<SerieDetail/>}/>
 </Routes>
</BrowserRouter>
)
}

export default App



