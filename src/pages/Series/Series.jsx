import React from 'react'

import style from './series.module.css'

import { useDispatch,useSelector} from "react-redux"
import { useState,useEffect } from "react";
import {getGeneros, fetchCartContent, todosLosProductosXidUser} from "../../redux/actions";

import Card from '../../components/CardSerie/Card'
import Navbar from "../../components/Navbar/Navbar"
import Footer from '../../components/Footer/Footer'
import Loading from "../../components/Loading/Loading";
import useFetch from '../../assets/useFetch';

const Series = () => {

  const dispatch = useDispatch();

  const listaGenero = useSelector(state=> state.Generos);
  const user = localStorage.getItem('email')
  const idUser = localStorage.getItem('id')
  const [series, setSeries] = useState([])
  const [infoPage, setInfoPage] = useState({})
  const [itemsPage, setItemsPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('')
  const [Load,setLoad] = useState(false)


  const [isScrolled, setIsScrolled] = useState(false)
  window.onscroll = () => {
  setIsScrolled(window.pageYOffset === 0 ? false : true);
  return () => (window.onscroll = null);
  }


    useEffect(()=> {
        dispatch(getGeneros()); 
    },[])

    useEffect(() => {
      dispatch(fetchCartContent(user))
  }, [])

  useEffect(() => {
      dispatch(todosLosProductosXidUser(idUser))
  },[])



  const getSeriesAndPage = (page, genre, price, order) =>{
    let newUrl = `http://localhost:3001/media/series?page=${page}`
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
      setSeries(data.elementos)
      setInfoPage(data.totalPages)
      setCurrentPage(page)
      setLoad(false)
    })
  };
  
  useEffect(()=>{
    getSeriesAndPage(1, null, null, null)
    setLoad(true)
  },[]);

  useEffect(() => {
    let items = []
    for(let i = 1; i <= infoPage; i++){
      items.push(<button key={i} onClick={(event) =>{
        setCurrentPage(parseInt(event.target.text))
        getSeriesAndPage(parseInt(event.target.text), null)}}>{i}</button>)

      }
      setItemsPage(items)   
    },[infoPage, currentPage]);
    
    const handlePreviousPage = () => {      
      if (currentPage > 1) {
        getSeriesAndPage(currentPage - 1, null);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < infoPage) {
        getSeriesAndPage(currentPage + 1, null);
      }
    };

    const handleGenreChange = (event) => {
      setSelectedGenre(event.target.value);
      getSeriesAndPage(1, event.target.value, selectedPrice);
    };
  
    const handlePriceChange = (event) => {
      setSelectedPrice(event.target.value);
      getSeriesAndPage(1, selectedGenre, event.target.value);
    };

    const handleOrderChange = (event) => {
      setSelectedOrder(event.target.value);
      getSeriesAndPage(1, selectedGenre, selectedPrice, event.target.value);
    };

  return (
    <section className={style.containerMax}>
      <Navbar isScrolled={isScrolled} /> 
      
      <h1 className={style.texto}>Todas las series</h1>
      
      <div className={style.filters}>
        
        <div>
          <span>Categoría</span>
          <select 
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option defaultChecked hidden>Seleccionar</option>
            <option value="">Restaurar</option>
              {listaGenero?.map((gen,index)=>{
                return <option key={index} value={gen.name} >{gen.name}</option>
              })}
          </select>
        </div>
        
        <div>
          <span>Precio</span>
          <select 
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            <option defaultChecked hidden>Seleccionar</option>
            <option value="">Restaurar</option>
            <option value='up'>Min - Max</option>
            <option value='down'>Max - Min</option>
          </select>
        </div>
        
        <div>
          <span>Ordenamiento</span>
          <select 
            alue={selectedOrder}
            onChange={handleOrderChange}
          >
            <option defaultChecked hidden>Seleccionar</option>
            <option value="">Restaurar</option>
            <option value='up'>A - Z</option>
            <option value='down'>Z - A</option>
          </select>
        
        </div>
      
      </div>
      
      <div className={style.Container}>
      
        <div className={style.serieContainer}>
          
        {Load == true && <Loading/>}
          {
            series?.map((element) => (
              <Card key={element.id} id={element.id} image={element.image} price={element.price} name={element.name} calif={element.calificacion} />
          ))}
        </div>
        <div >
          
            <button className={style.but} onClick={handlePreviousPage}>Ant</button>
            {itemsPage.map((item) => 
            <button
              key={item.key}
              className={style.but}
              onClick={() => {
              setCurrentPage(parseInt(item.key));
              getSeriesAndPage(parseInt(item.key), selectedGenre, selectedPrice, selectedOrder);
              }}
            >
              {item.key}
            </button>)}
            <button className={style.but} onClick={handleNextPage}>Next</button>      
            
          </div>
          
          </div>
      
      
      <Footer/>
      
    </section>
  )
}

export default Series