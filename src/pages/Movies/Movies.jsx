import React, {useState,useEffect} from 'react'
import style from './movies.module.css'
import Card from '../../components/CardMovie/CardMovie';
import {useSelector,useDispatch} from "react-redux"
import Navbar from "../../components/Navbar/Navbar"
import Footer from '../../components/Footer/Footer';
import { Pagination, Dropdown } from 'react-bootstrap';
import {getGeneros} from '../../redux/actions'

const Movies = () => {

  const dispatch = useDispatch();

  const [movies, setMovies] = useState([])
  const [infoPage, setInfoPage] = useState({})
  const [itemsPage, setItemsPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('')

  const generos = useSelector(state => state.Generos)

  useEffect(() => {
    dispatch(getGeneros())
  },[dispatch])


  
  //----------------------------PAGINADO y ORDENAMIENTOS------------------------------------------------

  const getMovieAndPage = (page, genre, price, order) =>{
    let newUrl = `http://localhost:3001/media/movies?page=${page}`
    if (genre) {
      newUrl += `&genre=${genre}`;
    }
    if (price) {
      newUrl += `&ordprecio=${price === 'up' ? 'up' : 'down'}`;
    }
    if(order){
      newUrl += `&ordalfa=${order === 'up' ? 'up' : 'down'}`
    }    

    fetch(newUrl)
    .then(response => response.json())
    .then(data => {
      setMovies(data.elementos)
      setInfoPage(data.totalPages)
      setCurrentPage(page)
    })
  };
  
  useEffect(()=>{
    getMovieAndPage(1, null, null, null)
  },[]);

  useEffect(() => {
    let items = []
    for(let i = 1; i <= infoPage; i++){
      items.push(<Pagination.Item key={i} onClick={(event) =>{
        setCurrentPage(parseInt(event.target.text))
        getMovieAndPage(parseInt(event.target.text), null)}}>{i}</Pagination.Item>)

      }
      setItemsPage(items)   
    },[infoPage, currentPage]);
    
    const handlePreviousPage = () => {      
      if (currentPage > 1) {
        getMovieAndPage(currentPage - 1, null);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < infoPage) {
        getMovieAndPage(currentPage + 1, null);
      }
    };

    const handleGenreChange = (event) => {
      setSelectedGenre(event.target.value);
      getMovieAndPage(1, event.target.value, selectedPrice);
    };
  
    const handlePriceChange = (event) => {
      setSelectedPrice(event.target.value);
      getMovieAndPage(1, selectedGenre, event.target.value);
    };

    const handleOrderChange = (event) => {
      setSelectedOrder(event.target.value);
      getMovieAndPage(1, selectedGenre, selectedPrice, event.target.value);
    };

   



  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }
  

  return (
  
    <section className={style.containerMax}>
      <Navbar isScrolled={isScrolled} /> 
      <h1 className={style.allmovies}>Todas las peliculas</h1>
      <div className={style.filters}>
        <div>
            <span>Categoría</span>
            <select
            className={style.select1}
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">All</option>
            {generos.map((gender) => {
              return (
                <option key={gender.id} value={gender.name}>
                  {gender.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <span>Precio</span>
          <select
            className={style.select1}
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            <option value="">Select price</option>
            <option value="up">Lowest to highest</option>
            <option value="down">Highest to lowest</option>
          </select>
        </div>
        <div>
          <span>Ordenamiento</span>
            <select 
            className={style.select1}
            value={selectedOrder}
            onChange={handleOrderChange}>
              <option value="">Select order</option>
            <option value="up">A - Z</option>
            <option value="down">Z - A</option>
          </select>
        </div>        
      </div>
      <div className={style.Container}>
        <div className={style.peliculaContainer}>
          {movies?.map((image, index) => (
            
            <Card key={index} id={image.id} image={image.image} />
          ))}
         </div>
         
        <div >
          <Pagination className={style.paginado}>
            <Pagination.Prev
              className={style.but}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            />
            {itemsPage.map((item) => item)}
            <Pagination.Next
              className={style.but}
              onClick={handleNextPage}
              disabled={currentPage === infoPage}
            />
          </Pagination>
          </div>
        </div>
      
      <Footer/>
    </section>
   
  )
}

export default Movies