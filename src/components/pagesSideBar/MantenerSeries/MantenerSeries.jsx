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

  const handleModalSerieEdit = (row) => {
    setidSerie(row.original.id)
    setopenModalSerieEdit(!openModalSerieEdit)
  } 


  const handleModalEpisodio = () => {
    setOpenModalEpi(!openModalEpi)
  }


   const inativar =(row)=> {
    setMostrar(row.id)
    
    setAccionOcurrida(true);
    setidSerie(row.original.id)
    dispatch(ActivarDesactivarSeries(row.original.id,page));
     dispatch(getTodoBusqedaAdmSeries(busqueda.search));
        
    dispatch(getTodoFillCleanAdm());
    

  }

  const activar = (row)=> {
    setMostrar(null)
    
    setAccionOcurrida(true);
    
    setidSerie(row.original.id)
    dispatch(ActivarDesactivarSeries(row.original.id,page));
    
     dispatch(getTodoBusqedaAdmSeries(busqueda.search));
          
    dispatch(getTodoFillCleanAdm());
      
    
    
  }




   useEffect(()=> {


    dispatch(SeriesxPage(numPage));
    
    dispatch(getTodoFillCleanAdm());
  },[])


  useEffect(()=> {
        dispatch(SeriesxPage(page))
  },[page])

   const columns = useMemo(
    ()=>[
      {
         Header: "Id",
         accessor: "id",
        //Cell: ({ value}) => <strong>{value}</strong>
      },
      {
        Header: "Nombre",
        accessor: "name"
      },
      { Header: "Imagen",
        accessor: "image" },
      {
        Header: "Precio",
        accessor: "price"},
      { Header: "Accion",
        accessor: "accion",
        Cell: ({row}) => (
          <>
          <button className={style.buttonAccion} onClick={()=> handleModalSerieEdit(row)}>Editar</button>
          {row.original.active == true ? (<button className={style.buttonAccion1} onClick={()=> inativar(row)}>Desactivar</button>):
          (<button className={style.buttonAccion2} onClick={()=> activar(row)}>Activar</button>)}
          </>
        )}
        
    ],[mostrar]
   );

   const tableInstance = useTable({
     columns,
     manualPagination:true
     ,data: busquedaSer.length == 0 ? Series : busquedaSer}

   )

   const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       rows,
       prepareRow
   } = tableInstance

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
            <table {...getTableProps()} className={style.table1} >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{backgroundColor: "red"}}>
                  {headerGroup.headers.map((column)=> (
                    <th className={style.thS}  {...column.getHeaderProps()}>
                      <div>
                        {column.render('Header')}
                        <br/>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>  
            <tbody {...getTableBodyProps()} className={style.tbody}>
                 {rows.map((row)=> {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className={style.tablerow}>
                        {row.cells.map((cell) => {

                        return(  
                          <td {...cell.getCellProps()} className={style.tablecell}>
                          {cell.column.id == 'image' ? (
                            <img src={cell.value} style={{ maxWidth: '120px', maxHeight: '150px'}}></img>
                          ):(
                            cell.render("Cell")
                            
                          )}
                          
                        </td>
                          )
                          })}
                      </tr>
                    )
                 })}
            </tbody>

            </table>
          </div>
          <div className={style.paginado}>
         <button
              className={style.but2}
              onClick={handlePreviousPage}
              disabled={page === 1}
            >Prev</button>
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
            >Next</button>
           </div >
        </div>
       )

}


export default MantenerSeries;