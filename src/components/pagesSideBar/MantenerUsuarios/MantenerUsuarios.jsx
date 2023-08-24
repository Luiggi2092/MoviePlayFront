import style from './MantenerUsuarios.module.css'
import { useState, useEffect} from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {getUserAdmin} from "../../../redux/actions"

const MantenerUsuarios = () => {

  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  
  const usuario = useSelector((state) => state.GetUserAdmin)

  const datos = usuario.length ? usuario : data

  const getUserAndPage = async (page) =>{
    const {data} = await axios.get(`/admin/allUser?page=${page}`)
    setData(data)
    setCurrentPage(page)
  };

  const handleDesactivar = async (id) => {
    
    const response = await axios.delete(`/admin/disableUser/${id}`)
    getUserAndPage(currentPage)
    dispatch(getUserAdmin()) 
  }

  const handleActivar = async (id) => {

    const response = await axios.put(`/admin/enableUser/${id}`) 
    getUserAndPage(currentPage)
    dispatch(getUserAdmin()) 
  }

  // Hacer admin
  const handleAdmin = async (id) => {
    const {data} = await axios.put(`/admin/transform/${id}`)
    getUserAndPage(currentPage)
  }


  //Paginado
  const handlePreviousPage = () => {      
    getUserAndPage(currentPage - 1);
  };
  //Paginado
  const handleNextPage = () => {
    getUserAndPage(currentPage + 1);
  };


  useEffect(() => {
    getUserAndPage(1)
  }, [])

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
            {
              datos?.map(item => (
                <tr key={item.id}>
                <td className={style.td}>{item.id}</td>
                <td className={style.td}>{item.nombre}</td>
                <td className={style.td}>{item.apellido}</td>
                <td className={style.td}>{item.email}</td>
                <td className={style.td}>
                  {
                    item.estadoActivo === true ? <button className={style.button} style={{ backgroundColor: "red" }} onClick={() => handleDesactivar(item.id)}>Desactivar</button> : <button className={style.button} style={{ backgroundColor: "green" }} onClick={() => handleActivar(item.id)}>Activar</button>
                  }
                  {
                    item.rol == "Usuario" ? <button className={style.button} onClick={() => handleAdmin(item.id)}>Hacer admin</button> : <button className={style.button} style={{ backgroundColor: "green" }} onClick={() => handleAdmin(item.id)}>Hacer usuario</button>
                  }
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className={style.paginado}>
          <button
            className={style.butP}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}> Ant 
          </button>
          <p className={style.pPage}>
            Página {currentPage}
          </p>
          <button
            className={style.butN}
            onClick={handleNextPage}
            disabled={data?.length < 10}> Sig
          </button>
        </div>
    </div>
   )
}


export default MantenerUsuarios;