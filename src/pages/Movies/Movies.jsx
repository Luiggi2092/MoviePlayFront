import React, {useState,useEffect} from 'react'
import style from './movies.module.css'
import Card from '../../components/CardMovie/CardMovie';
import {useSelector,useDispatch} from "react-redux"
import Navbar from "../../components/Navbar/Navbar"
import Footer from '../../components/Footer/Footer';
import Pagination from 'react-bootstrap/Pagination';

const Movies = () => {

  const dispatch = useDispatch();

  const [movies, setMovies] = useState([])
  const [infoPage, setInfoPage] = useState({})
  const [itemsPage, setItemsPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  
  //----------------------------PAGINADO------------------------------------------------

  const getMovieAndPage = (page, url) =>{
    let newUrl = page === null ? url :`http://localhost:3001/media/movies?page=${page}`

    fetch(newUrl)
    .then(response => response.json())
    .then(data => {
      setMovies(data.elementos)
      setInfoPage(data.totalPages)
      setCurrentPage(page)
    })
  }
  
  
  useEffect(()=>{
    getMovieAndPage(0, null)
  },[])

  useEffect(() => {
    let items = []
    for(let i = 1; i <= infoPage; i++){
      items.push(<Pagination.Item key={i} onClick={(event) =>{
        setCurrentPage(parseInt(event.target.text))
        getMovieAndPage(parseInt(event.target.text), null)}}>{i}</Pagination.Item>)

      }
      setItemsPage(items)   
    },[infoPage])
    
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
            <select className={style.select1}>
              <option>Select categoria</option>
          </select>
        </div>
        <div>
          <span>Año</span>
          <select className={style.select1}>
              <option className={style.p1}>Select año</option>
          </select>
        </div>
        <div>
          <span>Puntuación</span>
            <select className={style.select1}>
              <option className={style.p1}>Select Puntuación</option>
          </select>
        </div>
        <div>
          <span>Ordenamiento</span>
            <select className={style.select1}>
              <option className={style.p1}>select Ordenamiento</option>
          </select>
        </div>
      </div>
      <div className={style.Container}>
        <div className={style.peliculaContainer}>
          {movies?.map((image, index) => (
            
            <Card key={index} id={image.id} image={image.image} />
          ))}
          <div className={style.paginado}>
            <Pagination>
              <Pagination.Prev onClick={handlePreviousPage}/>
              {itemsPage.map(item => item)}      
              <Pagination.Next onClick={handleNextPage}/>      
            </Pagination>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
   
  )
}

export default Movies