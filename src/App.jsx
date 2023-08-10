import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector} from "react-redux"

import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home'
import Movies from './pages/Movies/Movies'
import MoviesDetail from './pages/MoviesDetail/MoviesDetail'
import Series from './pages/Series/Series'
import SerieDetail from './pages/Seriedetail/Seriedetail'
import Register from './pages/Register/register'
import AccessPage from './pages/AccessPage/AccessPage'
import PrivateRouter from "./router/PrivateRouter"


const App = () => {

	const acceso = useSelector(state => state.Acceso)

  	return (

		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing/>} />
				<Route path='/register' element={<Register/>} />
				<Route path='/login' element={<AccessPage/>}/>
				
				<Route element={ <PrivateRouter user={acceso}/> }>
					<Route path='/home' element={<Home/>}/>
					<Route path='/movies' element={<Movies/>} />
					<Route path='/series' element={<Series/>} />
					<Route path='/moviesdetail/:id' element={<MoviesDetail/>} />
					<Route path='/detailSeries/:id' element={<SerieDetail/>}/>
				</Route>
				
			</Routes>
		</BrowserRouter>
	)
}

export default App



