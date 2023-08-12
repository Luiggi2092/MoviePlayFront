import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'

import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home'
import Movies from './pages/Movies/Movies'
import MoviesDetail from './pages/MoviesDetail/MoviesDetail'
import Series from './pages/Series/Series'
import SerieDetail from './pages/Seriedetail/Seriedetail'
import Register from './pages/Register/Register'
import AccessPage from './pages/AccessPage/AccessPage'
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin'

import CarShop from './pages/CarShop/CarShop'
import PrivateRouter from './router/PrivateRouter'

const App = () => {

  	return (

	<HashRouter>
		<Routes>
			<Route exact path='/' element={<Landing/>} />
			<Route exact path='/login' element={<AccessPage/>}/>
			<Route exact path='/register' element={<Register/>} />
			{/* <Route element={<PrivateRouter/>}> */}
            	<Route exact path='/DashboardAdmin/:contentId' element={<DashboardAdmin/>}/>
				<Route exact path='/home' element={<Home/>} />	
				<Route exact path='/movies' element={<Movies/>} />
				<Route exact path='/series' element={<Series/>} />
				<Route exact path='/moviesdetail/:id' element={<MoviesDetail/>} />
				<Route exact path='/detailSeries/:id' element={<SerieDetail/>}/>
				<Route exact path="/purchase-detail" element={<CarShop/>}/>
			{/* </Route> */}
		</Routes>
	</HashRouter>
)
}

export default App



