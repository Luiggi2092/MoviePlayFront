import Modal from "../../ModalCreateMovie/ModalCreateMovie"
import { useState,useEffect, useMemo } from "react";
import { Column,useTable, useSortBy,useGlobalFilter } from "react-table";
import style from "./MantenerMovies.module.css"
import Loading from "../../Loading/Loading";


const MantenerMovies = ()=> {
   
    
  const [openModal, setOpenModal] = useState(false); 
  const [movies, setMovies] = useState([])
  const [itemsPage, setItemsPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
 
  
   const columns = useMemo(
     ()=>[
       {
         Header: "Id",
         accessor: "id",
         Cell: ({ value}) => <strong>{value}</strong>
       },
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
          <><button className={style.buttonAccion} onClick={() => console.log('Botón presionado', row)}>Editar</button>
          
          <button className={style.buttonAccion1} onClick={() => console.log('Botón presionado', row)}>Desactivar</button></>
          
      )   },
      

     ]
     ,[]
   );

   const tableInstance = useTable({
     columns
     ,data : movies}, useSortBy);

   const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       rows,
       prepareRow
   } = tableInstance


  const getMovieAndPage = (page, genre, price, order) =>{
    let newUrl = `https://movieplay.onrender.com/media/movies?page=${page}`
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
      setMovies(data.elementos)
      //setInfoPage(data.totalPages)
      //setCurrentPage(page)
    })
  };


   useEffect(()=>{
     getMovieAndPage(1, null, null, null)
   },[]);

  
  const handleModalMovie = () => {
    setOpenModal(!openModal);
  }

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

    return (
        <div className={style.tablecontainer} >
          <br/>
          <button onClick={handleModalMovie} className={style.CreateNew}>Nueva Pelicula</button>
          
         <Modal openModal={openModal} cambiarEstado={setOpenModal}></Modal>
         <br/>
         <br/>
         <div>
          <table {...getTableProps()} className={style.table} >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: "blue" }}>
                   {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}  >
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
                  <tr {...row.getRowProps()}  className="table-row">
                      {row.cells.map((cell) => {
                        
                        return (
                          <td {...cell.getCellProps()}  className="table-cell"> 
                            {cell.column.id === 'image' ? (
                              <img src={cell.value} style={{ maxWidth: '50px', maxHeight: '60px' }}></img>
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
         <button
              className={style.but}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >Prev</button>
            <button
              className={style.but}
              onClick={handleNextPage}
              disabled={currentPage === infoPage}
            >Next</button>
          
        </div>
    )
}


export default MantenerMovies;