import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar"
import './series.css'

const Series = () => {

  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  return (

    <section className="section">
      <div>
        <Navbar isScrolled={isScrolled} /> 
      <p className="pTitle">Todas la series</p>

      <div className="containerFilter">

        <div className="div">

          <p className="p">Categoria</p>

          <select className="select">
            <option>Filtrar</option>
          </select>

        </div>

        <div className="div">

          <p className="p">Año</p>

          <select className="select">
            <option>Filtrar</option>
          </select>

        </div>

        <div className="div">

          <p className="p">Puntuación</p>

          <select className="select">
            <option>Filtrar</option>
          </select>

        </div>

        <div className="div">

          <p className="p">Ordenamiento</p>

          <select className="select">
            <option>Filtrar</option>
          </select>

        </div>

      </div>

      <section className="containerSeries">

        <div className="divContainerCard">

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://i.postimg.cc/dQfgLrfV/IMG-20221231-124201.jpg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://i.blogs.es/522d7e/mejoresfantasia2023/1366_2000.jpeg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://i.postimg.cc/dQfgLrfV/IMG-20221231-124201.jpg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://i.blogs.es/522d7e/mejoresfantasia2023/1366_2000.jpeg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://i.blogs.es/522d7e/mejoresfantasia2023/1366_2000.jpeg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
          </NavLink>


          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://i.blogs.es/522d7e/mejoresfantasia2023/1366_2000.jpeg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://i.blogs.es/522d7e/mejoresfantasia2023/1366_2000.jpeg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
          </NavLink>

          <NavLink to='/detailSeries'>
            <img className="imgSeries" src="https://i.blogs.es/522d7e/mejoresfantasia2023/1366_2000.jpeg" alt="" />
          </NavLink>

        </div>

        <div className="divPaginado">

          <button className="elementoB button">Anterior</button>

          <p className='pPaginado'>1</p>
          <p className='pPaginado'>2</p>
          <p className='pPaginado'>3</p>

          <button className="elementoB button">Siguiente</button>

        </div>

      </section>
      </div>
    </section>
  )
}

export default Series