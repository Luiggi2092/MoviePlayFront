import Modal from "../../ModalCreateMovie/ModalCreateMovie"
import ModalEdit from "../../ModalEditarMovie/ModalEditarMovie"
import { useState,useEffect, useMemo } from "react";
import {ActivaroDesactivarMovies,moviesxPage,getTodoFillCleanAdm,getTodobusquedaAdm} from  "../../../redux/actions";
import { useDispatch,useSelector} from "react-redux"
import { Column,useTable } from "react-table";
import style from "./MantenerMovies.module.css"
import Loading from "../../Loading/Loading";


const MantenerMovies = ()=> {

  const dispatch = useDispatch();

  

  const busquedaMov = useSelector((state)=> state.SearchAdmimovie)
  const Movies = useSelector((state)=> state.Movies);
  const numPage = useSelector((state)=> state.numPage);
  const [page,setPage] = useState(numPage);
  const busqueda = useSelector((state)=> state.Search);


  useEffect(()=>{
    
    dispatch(moviesxPage(numPage));
    dispatch(getTodoFillCleanAdm());
   
  
  },[]);

  const [openModal, setOpenModal] = useState(false); 
  const [openModalEdit,setOpenModalEdit] = useState(false);
  const [mostrar,setMostrar] = useState(null);
  const [idpelicula,setidPelicula] = useState(0);
  const [itemsPage, setItemsPage] = useState([])
  const [infoPage, setInfoPage] = useState({})
  const [tempPage,settempPage] = useState(0);
  const [movieAct,setMoviAct] = useState([]);



  
  const inativar =(row)=> {
    setMostrar(row.id)
    //settempPage(currentPage)
    console.log("Tbmentro");
    console.log("id de pelicula" + row.original.id);
    dispatch(ActivaroDesactivarMovies(row.original.id));
    
    dispatch(getTodobusquedaAdm(busqueda.search));
        
    dispatch(getTodoFillCleanAdm());
    

  }

  const activar = (row)=> {
    console.log("Tbmentro");
    setMostrar(null)
    dispatch(ActivaroDesactivarMovies(row.original.id));
    
      dispatch(getTodobusquedaAdm(busqueda.search));
          
      dispatch(getTodoFillCleanAdm());
      
    
    
  }

  
   const columns = useMemo(
     ()=>[
       /*{
         Header: "Id",
         accessor: "id",
         Cell: ({ value}) => <strong>{value}</strong>
       },*/
       {
         Header: "Nombre",
         accessor: "name"

       },
       { Header: "Imagen",
         accessor: "image"
       },
       { Header: "Precio",
         accessor: "price"},
      { Header: "Accion",
          accessor: "accion",
         Cell: ({ row }) => ( // Renderiza el botón en la celda
          <><button className={style.buttonAccion}  onClick={()=>handleModalMovieEdit(row)}>Editar</button>
          {  row.original.active == true  ? (<button className={style.buttonAccion1} onClick={()=>inativar(row)}>Desactivar</button> ):
           (<button className={style.buttonAccion2} onClick={()=>activar(row)}>Activar</button>)
            }</>
          
      )   },
      

     ]
     ,[mostrar]
   );

   const tableInstance = useTable({
     columns
     ,manualPagination : true,data : busquedaMov.length == 0 ? Movies : busquedaMov}
     );

   const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       rows,
       prepareRow
   } = tableInstance


  // const getMovieAndPage = async(page, genre, price, order) =>{
  //   let newUrl = `https://movieplay.onrender.com/admin/disableMovies?page=${page}`
  //   if (genre) {
  //     newUrl += `&genre=${genre}`;
  //   }
  //   if (price) {
  //     newUrl += `&ordprecio=${price === 'up' ? 'up' : 'down'}`;
  //   }
  //   if(order){
  //     newUrl += `&ordalfa=${order === 'up' ? 'up' : 'down'}`
  //   }    

  //   const response = await axios.get(newUrl)
    
  //     setMovies(response.data.elementos)
  //     setInfoPage(response.data.totalPages)
  //     //setCurrentPage(response.data.currentPage)
  //   }
  


  useEffect(()=> {
    
    //dispatch(moviesxPage(page));
      

   },[numPage,Movies])




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


  const handleModalMovieEdit = (row)=> {
    console.log(row.original.id);
    setidPelicula(row.original.id);
    setOpenModalEdit(!openModalEdit);
  }


 
  const handlePreviousPage = () => {  
        
    if (page > 1) {
     //getMovieAndPage(currentPage - 1, null);
     // setCurrentPage(Number(currentPage - 1))
       setPage(page - 1)
    }
  };

  const handleNextPage = () => {
   
      //getMovieAndPage(currentPage + 1, null);
        setPage( page + 1);

  };

    return (
      <div className={style.container} >
          <br/>
          <div className={style.CreateNew} > 
          <button onClick={handleModalMovie} >Nueva Pelicula</button>
        </div>
         <Modal openModal={openModal} cambiarEstado={setOpenModal}></Modal>
         <ModalEdit openModalEdit={openModalEdit} cambiarEstado={setOpenModalEdit} idpelicula={idpelicula >= 1 && idpelicula}></ModalEdit>
         <br/>
         <br/>
         <div>
          <table {...getTableProps()} className={style.table} >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: "red" }}>
                   {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}  >
                       <div
                  
                >
                  {column.render('Header')}
                  <br/>
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc 
                      ? "D"
                      : "A" : ""}
                  </span>
                </div>
                    </th>
                   ))}

                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className={style.tbody}>
              {rows.map((row) => {
                 prepareRow(row);
                 return (
                  <tr {...row.getRowProps()}  className={style.tablerow}>
                      {row.cells.map((cell) => {
                        
                        return (
                          <td {...cell.getCellProps()}  className={style.tablecell}> 
                            {cell.column.id === 'image' ? (
                              <img src={cell.value} style={{ maxWidth: '120px', maxHeight: '150px' }}></img>
                            ): 
                            (cell.render("Cell"))}
                            </td>

                        )
                      } )}
                   </tr>
                 )
              })}
              
            </tbody>
          </table>
         </div>
         <div className={style.paginado}>
         <button
              className={style.but}
              onClick={handlePreviousPage}
             // disabled={currentPage === 1}
            >Prev</button>
             {itemsPage.map((item) => 
            <button
            key={item.key}
            className={style.but}
            onClick={() => {
              //setCurrentPage(parseInt(item.key));
              //getMovieAndPage(parseInt(item.key)/*, selectedGenre, selectedPrice, selectedOrder*/);
            }}
          >
            {item.key}
          </button>)}
            <button
              className={style.but}
              onClick={handleNextPage}
              disabled={Movies.length < 10}
             // disabled={currentPage === infoPage}
            >Next</button>
           </div >
        </div>
    )
}


export default MantenerMovies;