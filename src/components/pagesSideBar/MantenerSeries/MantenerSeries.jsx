import Modal from "../../ModalCreateSerie/ModalCreateSerie"
import ModalEdit from "../../ModalEditSerie/ModalEditSerie"
import ModalEpi from "../../ModalNewEpisodios/ModalNewEpisodios"
import style from './MantenerSeries.module.css'
import { useEffect, useMemo, useState } from "react";
import {SeriesxPage,ActivarDesactivarSeries,getTodoBusqedaAdmSeries,getTodoFillCleanAdm} from "../../../redux/actions"
import { useSearchParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Column,useTable } from "react-table";


const MantenerSeries = ()=> {
 
  
  const dispatch = useDispatch();

  const [openModalSerie,setOpenModalSerie] = useState(false);
  const [openModalSerieEdit,setopenModalSerieEdit] = useState(false);
  const [accionOcurrida,setAccionOcurrida] = useState(false);
  const [openModalEpi,setOpenModalEpi] = useState(false);
  const Series = useSelector((state)=> state.Series);
  const numPage = useSelector((state)=> state.Page);
  const totalPages = useSelector((state)=> state.TotalPag);
  const [page,setPage] = useState(1);
  const busquedaSer = useSelector((state)=> state.SearchAdmiSerie);
  const busqueda = useSelector((state)=> state.Search);
  let [idSerie,setidSerie] = useState(0);
  const [itemsPage, setItemsPage] = useState([])
  const numberArray = [...Array(totalPages)].map((_, index) => index + 1);
 
  
  const [mostrar,setMostrar] = useState(null);
  

  

  const handleModalSerie = () => {
    setOpenModalSerie(!openModalSerie)
   }

  const handleModalSerieEdit = (id) => {
    setidSerie(id)
    setopenModalSerieEdit(!openModalSerieEdit)
  } 


  const handleModalEpisodio = () => {
    setOpenModalEpi(!openModalEpi)
  }


   const inativar =(id)=> {
    //setMostrar(row.id)
    
    setAccionOcurrida(true);
    setidSerie(id)
    dispatch(ActivarDesactivarSeries(id));
     dispatch(getTodoBusqedaAdmSeries(busqueda.search));
        
    dispatch(getTodoFillCleanAdm());
    
    dispatch(SeriesxPage(page))
  }

  const activar = (id)=> {
    
    setAccionOcurrida(true);
    
    setidSerie(id)
    dispatch(ActivarDesactivarSeries(id));
    
     dispatch(getTodoBusqedaAdmSeries(busqueda.search));
          
    dispatch(getTodoFillCleanAdm());
      
    
    dispatch(SeriesxPage(page))
    
    
  }




   useEffect(()=> {


    dispatch(SeriesxPage(numPage));
    
    dispatch(getTodoFillCleanAdm());
  },[])


  useEffect(()=> {
        dispatch(SeriesxPage(page))
  },[page])

  //  const columns = useMemo(
  //   ()=>[
  //     {
  //        Header: "Id",
  //        accessor: "id",
  //       //Cell: ({ value}) => <strong>{value}</strong>
  //     },
  //     {
  //       Header: "Nombre",
  //       accessor: "name"
  //     },
  //     { Header: "Imagen",
  //       accessor: "image" },
  //     {
  //       Header: "Precio",
  //       accessor: "price"},
  //     { Header: "Accion",
  //       accessor: "accion",
  //       Cell: ({row}) => (
  //         <>
  //         <button className={style.buttonAccion} onClick={()=> handleModalSerieEdit(row)}>Editar</button>
  //         {row.original.active == true ? (<button className={style.buttonAccion1} onClick={()=> inativar(row)}>Desactivar</button>):
  //         (<button className={style.buttonAccion2} onClick={()=> activar(row)}>Activar</button>)}
  //         </>
  //       )}
        
  //   ],[mostrar]
  //  );

  //  const tableInstance = useTable({
  //    columns,
  //    manualPagination:true
  //    ,data: busquedaSer.length == 0 ? Series : busquedaSer}

  //  )

  //  const {
  //      getTableProps,
  //      getTableBodyProps,
  //      headerGroups,
  //      rows,
  //      prepareRow
  //  } = tableInstance

    useEffect(()=> {
       if(accionOcurrida){
          
       dispatch(SeriesxPage(numPage));
       setAccionOcurrida(false);
       }
    },[accionOcurrida])
  

     

   
  const handlePreviousPage = () => {  
        
    if (page > 1) {
     //getMovieAndPage(currentPage - 1, null);
     // setCurrentPage(Number(currentPage - 1))
       dispatch(SeriesxPage(numPage - 1))
       setPage(numPage - 1)
    }
  };

  const handleNextPage = () => {
   
      //getMovieAndPage(currentPage + 1, null);
        dispatch(SeriesxPage(numPage + 1))
        setPage(numPage + 1)

  };


       return (
        <div className={style.container}>
             <button className={style.addButtons}  onClick={handleModalSerie} >Nueva Serie</button>
           <div className={style.addButtons}>
             <button className={style.addButtons1} onClick={handleModalEpisodio}>Agregar Episodios</button>
          </div>
          <Modal  openModalSerie={openModalSerie} cambiarEstadoSerie={setOpenModalSerie} page={page}></Modal>
          <ModalEdit openModalSerieEdit={openModalSerieEdit} cambiarEstadoSerie={setopenModalSerieEdit} idSerie={idSerie > 0 ? idSerie : 1} page={page}></ModalEdit>   
          <ModalEpi openModalEpi={openModalEpi} cambiarEstado={setOpenModalEpi}></ModalEpi>
          <br/>
          <br/>
          <div>
            <table className={style.table} >
            <thead>
              <tr style={{backgroundColor:"#011f69",color:"white"}}>
                   <th className={style.th2}>
                  id
                 </th>
                   <th className={style.th2}>
                  Nombre
                 </th >
                   <th className={style.th2}>
                  Imagen
                 </th>
                   <th className={style.th2}>
                  Precio
                 </th>
                   <th className={style.th2}>
                  Edicion
                 </th>
                   <th className={style.th2}>
                  Activacion
                 </th>
              </tr>
            </thead>  
            <tbody className={style.tbody}>
                
            {busquedaSer.length == 0 ? (Series.map((item)=>(
               <tr>
                <td className={style.tablecell} value={idSerie=item.id}>{item.id}</td>  
                <td className={style.tablecell}>{item.name}</td>
                <td className={style.tablecell}><img src={item.image} style={{width:"50px",height:"50px"}}/></td>
                <td className={style.tablecell}>{item.price}</td>
                <td className={style.tablecell}><button className={style.buttonAccion} onClick={()=>handleModalSerieEdit(item.id)} >Editar</button></td>
                <td>
                {item.active == true ? (<button className={style.buttonAccion1} onClick={()=>inativar(item.id,item.active)} >Desactivar</button>) : 
                  (<button className={style.buttonAccion2} onClick={()=> activar(item.id,item.active)} >Activar</button>)}
                
                </td>
               </tr> 
            ))) : busquedaSer.map((item)=> (
              <tr key={item.id} className={style.tablerow}>
              <td className={style.tablecell}>{item.id}</td>
              <td className={style.tablecell}>{item.name}</td>
              <td className={style.tablecell}><img src={item.image} style={{width: "50px", height:"50px"}}/></td>
              <td className={style.tablecell}>{item.price}</td>
              <td>
                <button onClick={()=>handleModalSerieEdit(item.id)} className={style.buttonAccion}>Editar</button>
                </td>
              <td className={style.tablecell}>
              {item.active == true ? (<button className={style.buttonAccion1} onClick={()=>inativar(item.id,item.active)} >Desactivar</button>) : 
                (<button className={style.buttonAccion2} onClick={()=> activar(item.id,item.active)} >Activar</button>)}</td>
              </tr>

            ))}

            </tbody>

            </table>
          </div>
          <div className={style.paginado}>
         <button
              className={style.but2}
              onClick={handlePreviousPage}
              disabled={page === 1}
            >Ant</button>
             {numberArray.map((item) => 
            <button
            key={item}
            className={style.but2}
            onClick={() => {
               setPage(parseInt(item))
            }}
          >
            {item}
          </button>)}
            <button
              className={style.but2}
              onClick={handleNextPage}
              //disabled={Series.length < 10}
              disabled={page === totalPages}
            >Sig</button>
           </div >
        </div>
       )

}


export default MantenerSeries;