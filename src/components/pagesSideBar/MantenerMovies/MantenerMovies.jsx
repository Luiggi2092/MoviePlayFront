import Modal from "../../ModalCreateMovie/ModalCreateMovie"
import ModalEdit from "../../ModalEditarMovie/ModalEditarMovie"
import { useState,useEffect, useMemo } from "react";
import {ActivaroDesactivarMovies,moviesxPage,getTodoFillCleanAdm,getTodobusquedaAdm, getMovies} from  "../../../redux/actions";
import { useDispatch,useSelector} from "react-redux"
import { Column,useTable } from "react-table";
import style from "./MantenerMovies.module.css"
import Loading from "../../Loading/Loading";


const MantenerMovies = ()=> {

  const dispatch = useDispatch();

  

  const busquedaMov = useSelector((state)=> state.SearchAdmimovie)
  const Movies = useSelector((state)=> state.Movies);
  const numPage = useSelector((state)=> state.Page);
  const totalPages = useSelector((state)=> state.TotalPag);
  const  [page,setPage] = useState(1);
  const busqueda = useSelector((state)=> state.Search);
  const numberArray = [...Array(totalPages)].map((_, index) => index + 1);


  useEffect(()=>{
    
    dispatch(moviesxPage(page));
    dispatch(getTodoFillCleanAdm());


  
  },[]);



  const [openModal, setOpenModal] = useState(false); 
  const [openModalEdit,setOpenModalEdit] = useState(false);
  const [accionOcurrida,setAccionOcurrida] = useState(false);
  const [mostrar,setMostrar] = useState(null);
  let [idpelicula,setidPelicula] = useState(0);
  
  const [itemsPage, setItemsPage] = useState([])
  const [infoPage, setInfoPage] = useState({})
  const [tempPage,settempPage] = useState(0);
  const [movieAct,setMoviAct] = useState([]);
  const [active,setActive] = useState(false);




   const inativar =(id,act)=> {
    console.log(id)
    
    setAccionOcurrida(true);
  //   console.log("no entra");
  //   console.log(row.original.active)
    
     setidPelicula(id);
    
     dispatch(ActivaroDesactivarMovies(id));
    
     dispatch(getTodobusquedaAdm(busqueda.search));
        
     dispatch(getTodoFillCleanAdm());
    
    
     dispatch(moviesxPage(page));
     
     setidPelicula(0)
    
   }

  const activar = (id,act)=> {
    
     console.log(id)
   
    setidPelicula(id)

    
    setAccionOcurrida(true);
     
    
    dispatch(ActivaroDesactivarMovies(id));

    
       dispatch(getTodobusquedaAdm(busqueda.search));
          
       dispatch(getTodoFillCleanAdm());
      
     dispatch(moviesxPage(page));
     
    
    
   }

  
  //  const columns = useMemo(
  //    ()=>[
  //      /*{
  //        Header: "Id",
  //        accessor: "id",
  //        Cell: ({ value}) => <strong>{value}</strong>
  //      },*/
  //      {
  //        Header: "Nombre",
  //        accessor: "name"

  //      },
  //      { Header: "Imagen",
  //        accessor: "image"
  //      },
  //      { Header: "Precio",
  //        accessor: "price"},
  //     { Header: "Accion",
  //         accessor: "accion",
  //        Cell: ({ row }) => ( // Renderiza el botón en la celda
          
  //         <><button className={style.buttonAccion}  onClick={()=>handleModalMovieEdit(row)}>Editar</button>
  //         {  row.original.active == true  ? (<button className={style.buttonAccion1} onClick={()=>inativar(row)}>Desactivar</button> ):
  //          (<button className={style.buttonAccion2} onClick={()=>activar(row)}>Activar</button>)
  //           }</>
          
  //     )   },
      

  //    ]
  //    ,[mostrar]
  //  );

  //  const tableInstance = useTable({
  //    columns
  //    ,manualPagination : true,data : busquedaMov.length == 0 ? Movies : busquedaMov}
  //    );

  //  const {
  //      getTableProps,
  //      getTableBodyProps,
  //      headerGroups,
  //      rows,
  //      prepareRow
  //  } = tableInstance





   useEffect(()=> {

      if(accionOcurrida){ 
     dispatch(moviesxPage(page));
       setAccionOcurrida(false);
      }

      },[accionOcurrida])


    useEffect(()=> {
       dispatch(moviesxPage(page))
    },[page])    


  //  useEffect(() => {
  //   let items = []
  //   for(let i = 1; i <= infoPage; i++){
  //     items.push(<button key={i} onClick={(event) =>{
  //      // setCurrentPage(parseInt(event.target.text))
  //      // getMovieAndPage(parseInt(event.target.text), null)}}>{i}</button>)

  //     }
  //     setItemsPage(items)   
  //   },[infoPage, currentPage]);

  
   const handleModalMovie = () => {
     setOpenModal(!openModal);
   }


   
//   useEffect(()=> {
     
//     if(Movies){
//        dispatch(moviesxPage(numPage));

//     } 
    
//  },[Movies,numPage])



// useEffect(() => {
//   if (shouldUpdateMovies) {
//     dispatch(moviesxPage(numPage));
//     setShouldUpdateMovies(false);
//   }
// }, [shouldUpdateMovies, numPage]);

// useEffect(() => {
//   if (Movies) {
//     setShouldUpdateMovies(true);
//   }
// }, [Movies]);

   const handleModalMovieEdit = (id)=> {
     setidPelicula(id);
     setOpenModalEdit(!openModalEdit);
   }


 
   const handlePreviousPage = () => {  
       
  
      //getMovieAndPage(currentPage - 1, null);
      // setCurrentPage(Number(currentPage - 1))
      setidPelicula(0)
  //    console.log(numPage);
   
   dispatch(moviesxPage(numPage - 1));
   setPage(numPage - 1);
        
     
    
   };

   const handleNextPage = () => {
   
       //getMovieAndPage(currentPage + 1, null);
        // setPage( page + 1);
        setidPelicula(0)
        console.log(numPage);
        dispatch(moviesxPage(numPage + 1));
        setPage(numPage + 1);
        
       

   };



    return (
      <div className={style.container} >
          <br/>
          <div className={style.CreateNew} > 
          <button onClick={handleModalMovie} className={style.buttonAccion} >Nueva Película</button>
        </div>
         <Modal openModal={openModal} cambiarEstado={setOpenModal} page={page}></Modal>
         <ModalEdit openModalEdit={openModalEdit} cambiarEstado={setOpenModalEdit} idpelicula={idpelicula}  page={page}></ModalEdit>
         <br/>
         <br/>
         <div className={style.table3}>
          <table className={style.table1} >
            <thead>
              <tr style={{backgroundColor: "#011f69",color:"white"}}>
                <th className={style.thM}>
                  id
                </th>
                <th>
                  Nombre
                </th>
                <th>
                  Imagen
                </th>
                <th>
                  Precio
                </th>
                <th>
                  Edición
                </th>
                <th>
                  Activación
                </th>
              </tr>
            </thead>
            <tbody className={style.tbody}>

              {busquedaMov.length == 0 ? (Movies.map((item) => (
                <tr key={item.id} className={style.tablerow} >
                <td className={style.tablecell} value={idpelicula=item.id}>{item.id}</td>  
                <td className={style.tablecell}>{item.name}</td>
                <td className={style.tablecell}><img src={item.image} style={{width:"50px",height:"50px"}}/></td>
                <td className={style.tablecell}>{item.price}</td>
                <td className={style.tablecell}><button className={style.buttonAccion} onClick={()=>handleModalMovieEdit(item.id)} >Editar</button></td>
                <td>
                  {item.active == true ? (<button className={style.buttonAccion1} onClick={()=>inativar(item.id,item.active)} >Desactivar</button>) : 
                  (<button className={style.buttonAccion2} onClick={()=> activar(item.id,item.active)} >Activar</button>)}</td>
                </tr>
              ))): busquedaMov.map((item) => (
                <tr key={item.id} className={style.tablerow}>
                <td className={style.tablecell}>{item.id}</td>
                <td className={style.tablecell}>{item.name}</td>
                <td className={style.tablecell}><img src={item.image} style={{width: "50px", height:"50px"}}/></td>
                <td className={style.tablecell}>{item.price}</td>
                <td>
                  <button onClick={()=>handleModalMovieEdit(item.id)} className={style.buttonAccion}>Editar</button>
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
              className={style.but}
              onClick={handlePreviousPage}
             disabled={numPage === 1}
            >Ant</button>
              
             {
             numberArray.length > 0 && numberArray.map(
              (e)=>{
               return <button onClick={()=> setPage(parseInt(e))}
                 key={e}
                 className={style.but}
               >{e}
                
               </button>
              })
                
              }
              
          

            <button
              className={style.but}
              onClick={handleNextPage}
              disabled={Movies.length < 10}
             // disabled={currentPage === infoPage}
            >Sig</button>
           </div >
        </div>
    )
}


export default MantenerMovies;