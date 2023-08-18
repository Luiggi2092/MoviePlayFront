import Modal from "../../ModalCreateSerie/ModalCreateSerie"
import ModalEdit from "../../ModalEditSerie/ModalEditSerie"
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
  const Series = useSelector((state)=> state.Series);
  const numPage = useSelector((state)=> state.numPage);
  const [page,setPage] = useState(numPage);
  const busquedaSer = useSelector((state)=> state.SearchAdmiSerie);
  const busqueda = useSelector((state)=> state.Search);

  const [mostrar,setMostrar] = useState(null);
  
  
  const handleModalSerie = () => {
    setOpenModalSerie(!openModalSerie)
   }

   const inativar =(row)=> {
    setMostrar(row.id)
    //settempPage(currentPage)
    console.log("Tbmentro");
    console.log("id de pelicula" + row.original.id);
    dispatch(ActivarDesactivarSeries(row.original.id));
     dispatch(getTodoBusqedaAdmSeries(busqueda.search));
        
    dispatch(getTodoFillCleanAdm());
    

  }

  const activar = (row)=> {
    console.log("Tbmentro");
    setMostrar(null)
    dispatch(ActivarDesactivarSeries(row.original.id));
    
     dispatch(getTodoBusqedaAdmSeries(busqueda.search));
          
    dispatch(getTodoFillCleanAdm());
      
    
    
  }




   useEffect(()=> {

    dispatch(SeriesxPage(numPage));
  },[])

   const columns = useMemo(
    ()=>[
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
          <button>Editar</button>
          {row.original.active == true ? (<button onClick={()=> inativar(row)}>Desactivar</button>):
          (<button onClick={()=> activar(row)}>Activar</button>)}
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
      dispatch(SeriesxPage(page));
   },[numPage,Series])
  

       return (
        <div className={style.container}>
          <div>
          <button onClick={handleModalSerie} className={style.CreateNew}>Nueva Serie</button>
          </div>
          <Modal  openModalSerie={openModalSerie} cambiarEstadoSerie={setOpenModalSerie}></Modal>
          <ModalEdit openModalSerieEdit={openModalSerieEdit} cambiarEstadoSerie={setopenModalSerieEdit}></ModalEdit>   
          <br/>
          <br/>
          <div>
            <table {...getTableProps()} className={style.table} >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{backgroundColor: "red"}}>
                  {headerGroup.headers.map((column)=> (
                    <th {...column.getHeaderProps()}>
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
        </div>
       )

}


export default MantenerSeries;