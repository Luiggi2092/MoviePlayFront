import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'

import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home'
import Peliculas from './pages/Peliculas/Peliculas'
import MoviesDetail from './pages/MoviesDetail/MoviesDetail'
import Series from './pages/Series/Series'
import SerieDetail from './pages/Seriedetail/Seriedetail'
import Register from './pages/Register/Register'
import AccessPage from './pages/AccessPage/AccessPage'
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin'
import Profile from './pages/Profile/Profile'
import Favoritos from './pages/Favoritos/Favoritos'

import CarShop from './pages/CarShop/CarShop'
import PrivateRouter from './router/PrivateRouter'
import PrivateRouterDashbor from './router/PrivateDashbor'

const App = () => {
	
	

  	return (

	<HashRouter>
		<Routes>
			<Route exact path='/' element={<Landing/>} />
			<Route exact path='/login' element={<AccessPage/>}/>
			<Route exact path='/register' element={<Register/>} />
            
			<Route element={<PrivateRouterDashbor/>}>
            	<Route exact path='/DashboardAdmin/:contentId' element={<DashboardAdmin/>}/>
			</Route>
			
			<Route element={<PrivateRouter/>}>
				<Route exact path='/home' element={<Home/>} />	
				<Route exact path='/peliculas' element={<Peliculas/>} />
				<Route exact path='/series' element={<Series/>} />
				<Route exact path='/moviesdetail/:id' element={<MoviesDetail/>} />
				<Route exact path='/detailSeries/:id' element={<SerieDetail/>}/>
				<Route exact path="/purchase-detail" element={<CarShop/>}/>
				<Route exact path="/profile" element={<Profile/>} />
				<Route exact path="/favoritos" element={<Favoritos/>} />
			</Route>
		</Routes>
	</HashRouter>
)
}

export default App



