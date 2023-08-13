import { Chart } from "react-google-charts";
import style from './HomeSideBar.module.css';
import { useTable, useSortBy } from "react-table";
import axios from "axios";

import { useMemo,useState,useEffect } from "react";
const HomeSideBar = ()=> {

   const data = [
    ["2023", "2023", { role: "style" }],
    ["Enero", 170, "#b87333"], // RGB value
    ["Febrero", 800, "silver"], // English color name
    ["Marzo", 500, "gold"],
    ["Abril", 100, "color: #e5e4e2"], // CSS-style declaration
    ["Mayo", 200, "red"],
    ["Junio", 400, "blue"],
    ["Agosto", 100, "black"],
    ["Setiembre", 450, "yellow"],
    ["Octubre", 950, "green"],
    ["Noviembre", 666, "pink"],
    ["Diciembre", 450, "#e5e4e2"]
  ];



  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])

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
      setMovies(data.elementos.slice(0,5))
      //setInfoPage(data.totalPages)
      //setCurrentPage(page)
    })
  };

  const getSeriesAndPage = (page, genre, price, order) =>{
    let newUrl = `https://movieplay.onrender.com/media/series?page=${page}`
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
      setSeries(data.elementos.slice(0,5))
      //setInfoPage(data.totalPages)
      //setCurrentPage(page)
    })
  };



  useEffect(()=>{
    getMovieAndPage(1, null, null, null)
    getSeriesAndPage(1, null, null, null)

    const videoUrlBarbie = "https://www.youtube.com/watch?v=zh4KhVSMwtQ";
    const videoUrbFlash =  "https://www.youtube.com/watch?v=av-9lvBdZ0k";


    const videoId = videoUrlBarbie.split("v=")[1];

    console.log(videoId);

    const apikey = "AIzaSyCmPz2-n-yiOhxO38XAkvAVXq_obZQtaY4";

    const apiUril = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apikey}&part=statistics`

    axios.get(apiUril)
    .then(response => {
      const viewCount = response.data.items[0].statistics.viewCount;
      console.log(viewCount);
      
    })

    .catch(error => {
      console.error("Error al obtener la cantidad de reproduciones : ",error);
    })

  },[]);



  const columns = useMemo(
    ()=>[
       {
        Header : "Id",
        accessor: "id",
        Cell: ({ value}) => <strong>{value}</strong>
       },
       {
        Header : "Imagen",
        accessor: "image"
       },
       {
        Header : "Titulo",
        accessor: "name"
       },
       {Header : "Views",
        accessor: "views",
        Cell: ({ row }) => ( // Renderiza el botón en la celda
          <>
          <p>100</p>
          </>
          
      )   
      
      
      },

    ],[]
  )
  const tableInstance = useTable({
    columns
    ,data : movies},useSortBy);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
  } = tableInstance
 

 
  

  return (
    <>
    <div className={style.table1}>
      
    <h4>Top 5 Peliculas</h4>
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
    <div className={style.table2}>
    <h4>Top 5 Series</h4>
    <table {...getTableProps()} className={style.table2} >
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
    <div className={style.graficoven}>
     <Chart chartType="ColumnChart" width="1000px"  height="400px" 
        loader={<div>Cargando gráfico...</div>} data={data}  options={{
          title: "Numero de Usuarios",
          chartArea: { width: "50%" },
         hAxis: { title: "Meses", minValue: 0 },
           vAxis: { title: "N° Usuarios" },
           legend: "none",
         }}  />
    </div>
    </>
  )

}

export default HomeSideBar;