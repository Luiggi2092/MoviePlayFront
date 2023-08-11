import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home'
import Movies from './pages/Movies/Movies'
import MoviesDetail from './pages/MoviesDetail/MoviesDetail'
import Series from './pages/Series/Series'
import SerieDetail from './pages/Seriedetail/Seriedetail'
import Register from './pages/Register/register'
import AccessPage from './pages/AccessPage/AccessPage'
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin'

import CardShop from './pages/CarShop/CarShop'

const App = () => {

  return (

<HashRouter>
 <Routes>
	<Route exact path='/' element={<Landing/>} />
	<Route exact path='/home' element={<Home/>} />
	<Route exact path='/movies' element={<Movies/>} />
    <Route exact path='/DashboardAdmin/:contentId' element={<DashboardAdmin/>}/>
	<Route exact path='/register' element={<Register/>} />
	<Route exact path='/series' element={<Series/>} />
	<Route exact path='/moviesdetail/:id' element={<MoviesDetail/>} />
	<Route exact path='/detailSeries/:id' element={<SerieDetail/>}/>
	<Route exact path='/login' element={<AccessPage/>}/>
	<Route exact path="/purchase-detail" element={<CardShop/>}/>


 </Routes>
</HashRouter>
)
}

export default App



