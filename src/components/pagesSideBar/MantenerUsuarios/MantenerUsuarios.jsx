import style from './MantenerUsuarios.module.css'
import { useState, useEffect} from "react";
import axios from 'axios';

const MantenerUsuarios = () => {


  const [data, setData] = useState();
  const [infoPage, setInfoPage] = useState({})
  const [currentPage, setCurrentPage] = useState(1)


  const handleToggle = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, activo: !item.activo };
      }
      return item;
    });
    setData(updatedData);
  };
  

  const getUserAndPage = (page) =>{
      let newUrl = `http://localhost:3001/admin/allUser?page=${page}`
  
      fetch(newUrl)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setCurrentPage(page)
      })
    };

  useEffect(() => {
      getUserAndPage(1)
  }, [])


  const handlePreviousPage = () => {      
      getUserAndPage(currentPage - 1);
    };
  
  const handleNextPage = () => {
    getUserAndPage(currentPage + 1);
  };

   return (
   
    <div>
        <table className={style.table}>
            <thead>
            <tr>
                <th className={style.th}>ID</th>
                <th className={style.th}>Nombre</th>
                <th className={style.th}>Apellido</th>
                <th className={style.th}>Email</th>
                <th className={style.th}>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {data?.map(item => (
                <tr key={item.id}>
                <td className={style.td}>{item.id}</td>
                <td className={style.td}>{item.nombre}</td>
                <td className={style.td}>{item.apellido}</td>
                <td className={style.td}>{item.email}</td>
                <td className={style.td}>
                  <button className={style.button} onClick={() => handleToggle(item.id)}>
                    {item.activo ? 'Activar' : 'Desactivar'}
                  </button>
                  <button className={style.button}>Admin</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className={style.paginado}>
            <button
              className={style.but}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}> Prev 
            </button>
            
            <button
              className={style.but}
              onClick={handleNextPage}> Next 
            </button>
           
           </div>
    </div>
   )
}


export default MantenerUsuarios;