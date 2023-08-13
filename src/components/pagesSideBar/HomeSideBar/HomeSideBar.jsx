import { Chart } from "react-google-charts";
import style from './HomeSideBar.module.css';
import { useTable } from "react-table";
import TableSeries from "./TableSeries/TableSeries";
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
  const [ViewsFlash,setViewsFlash] = useState("");
  const [ViewsBarbie,setViewsBarbie] = useState("");
  const [ViewsTransformer,setViewsTranforme] = useState("");
  const [ViewsMermaid,setViewsMermaid] = useState("");
  const [ViewsResident,setViewsResident] = useState("");

  
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

  

  useEffect(()=>{
    getMovieAndPage(1, null, null, null)

    const videoUrlBarbie = "https://www.youtube.com/watch?v=zh4KhVSMwtQ";
    const videoUrlFlash =  "https://www.youtube.com/watch?v=av-9lvBdZ0k";
    const videoUrlTransformer = "https://www.youtube.com/watch?v=v0d0id78XdE";
    const videoUrlMermaid = "https://www.youtube.com/watch?v=kpGo2_d3oYE";
    const videoUrlResindent = "https://www.youtube.com/watch?v=L-vkuA8oqMY"

  
    const video1 = videoUrlBarbie.split("v=")[1];
    const video2 = videoUrlFlash.split("v=")[1];
    const video3 = videoUrlTransformer.split("v=")[1];
    const video4 = videoUrlMermaid.split("v=")[1];
    const video5 = videoUrlResindent.split("v=")[1];

    const apikey = "AIzaSyCmPz2-n-yiOhxO38XAkvAVXq_obZQtaY4";

    const apiUril = `https://www.googleapis.com/youtube/v3/videos?id=${video1}&key=${apikey}&part=statistics`
    const apiUril1 = `https://www.googleapis.com/youtube/v3/videos?id=${video2}&key=${apikey}&part=statistics`
    const apiUril2 = `https://www.googleapis.com/youtube/v3/videos?id=${video3}&key=${apikey}&part=statistics`
    const apiUril3 = `https://www.googleapis.com/youtube/v3/videos?id=${video4}&key=${apikey}&part=statistics`
    const apiUril4 = `https://www.googleapis.com/youtube/v3/videos?id=${video5}&key=${apikey}&part=statistics`
     

    axios.get(apiUril)
    .then(response => {
      const viewCount = response.data.items[0].statistics.viewCount;
      setViewsBarbie(viewCount);
      
    })

    .catch(error => {
      console.error("Error al obtener la cantidad de reproduciones : ",error);
    })

    axios.get(apiUril1)
    .then(response => {
      const viewCount = response.data.items[0].statistics.viewCount;
      setViewsFlash(viewCount);
      
    })

    .catch(error => {
      console.error("Error al obtener la cantidad de reproduciones : ",error);
    })

    axios.get(apiUril2)
    .then(response => {
      const viewCount = response.data.items[0].statistics.viewCount;
      setViewsTranforme(viewCount);
      
    })

    .catch(error => {
      console.error("Error al obtener la cantidad de reproduciones : ",error);
    })

    axios.get(apiUril3)
    .then(response => {
      const viewCount = response.data.items[0].statistics.viewCount;
      setViewsMermaid(viewCount);
      
    })

    .catch(error => {
      console.error("Error al obtener la cantidad de reproduciones : ",error);
    })

    axios.get(apiUril4)
    .then(response => {
      const viewCount = response.data.items[0].statistics.viewCount;
      setViewsResident(viewCount);
      
    })

    .catch(error => {
      console.error("Error al obtener la cantidad de reproduciones : ",error);
    })

  },[]);



  const columns = useMemo(
    ()=>[
      //  {
      //   Header : "Id",
      //   accessor: "id",
      //   Cell: ({ value}) => <strong>{value}</strong>
      //  },
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
          {row.id == 0 && <p>82562</p>}
          {row.id == 1 && <p>75865</p>}
          {row.id == 2 && <p>68595</p>}
          {row.id == 3 && <p>58655</p>}
          {row.id == 4 && <p>9785</p>}  
          
          </>
          
      )   
      
      
      },

    ],[movies]
  )
  const tableInstance = useTable({
    columns
    ,data : movies,  initialState: {
      sortBy: [{ id: 'views', desc: true }], // Ordenar por la columna "age" de manera descendente al principio
    },
  });

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
     <TableSeries/>
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