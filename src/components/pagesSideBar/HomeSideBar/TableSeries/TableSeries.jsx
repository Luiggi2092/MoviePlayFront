import { useTable,useSortBy  } from "react-table";
import React from "react";
import axios from "axios"
import style from '../HomeSideBar.module.css';
import { useMemo,useState,useEffect } from "react";
import data from "../../../../data";



const tableSeries = () => {

    const [series, setSeries] = useState([])
    const [ViewsBreakingBad,setViewsBreakingBad]= useState();
    const [ViewsArcane,setViewsArcane] = useState();
    const [ViewsOnePiece,setViewsOnePiece] = useState();
    const [ViewsRickyyMorthy,setViewsRickyMorthy]= useState();
    const [ViewsAnne,setViewsAnne] = useState();


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
        getSeriesAndPage(1, null, null, null)
    
        const videoUrlBreakingBad = "https://www.youtube.com/watch?v=V8WQhxHEmMc";
        const videoUrlArcane =  "https://www.youtube.com/watch?v=xPKN7MxS8TU";
        const videoOnePiece = "https://www.youtube.com/watch?v=JoO7TGG2Kms";
        const videoRickyMorty = "https://www.youtube.com/watch?v=Zg3LHyxG37E";
        const videoAnne = "https://www.youtube.com/watch?v=M4T-_aB8smU";

    
    
        const videoId = videoUrlBreakingBad.split("v=")[1];
        const videoId1 = videoUrlArcane.split("v=")[1];
        const videoId2 = videoOnePiece.split("v=")[1];
        const videoId3 = videoRickyMorty.split("v=")[1];
        const videoId4  = videoAnne.split("v=")[1];

        

    
        const apikey = "AIzaSyCmPz2-n-yiOhxO38XAkvAVXq_obZQtaY4";
    
       
        const apiUril = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apikey}&part=statistics`
        const apiUril1 = `https://www.googleapis.com/youtube/v3/videos?id=${videoId1}&key=${apikey}&part=statistics`
        const apiUri2 = `https://www.googleapis.com/youtube/v3/videos?id=${videoId2}&key=${apikey}&part=statistics`
        const apiUril3 = `https://www.googleapis.com/youtube/v3/videos?id=${videoId3}&key=${apikey}&part=statistics`
        const apiUril4 = `https://www.googleapis.com/youtube/v3/videos?id=${videoId4}&key=${apikey}&part=statistics`
        

        axios.get(apiUril)
        .then(response => {
          const viewCount = response.data.items[0].statistics.viewCount;
          setViewsBreakingBad(viewCount);
          
        })
    
        .catch(error => {
          console.error("Error al obtener la cantidad de reproduciones : ",error);
        })

        axios.get(apiUril1)
        .then(response => {
          const viewCount = response.data.items[0].statistics.viewCount;
          setViewsArcane(viewCount);
          
        })
    
        .catch(error => {
          console.error("Error al obtener la cantidad de reproduciones : ",error);
        })

        axios.get(apiUri2)
        .then(response => {
          const viewCount = response.data.items[0].statistics.viewCount;
          setViewsOnePiece(viewCount);
          
        })
    
        .catch(error => {
          console.error("Error al obtener la cantidad de reproduciones : ",error);
        })

        
        axios.get(apiUril3)
        .then(response => {
          const viewCount = response.data.items[0].statistics.viewCount;
          setViewsRickyMorthy(viewCount);
          
        })
    
        .catch(error => {
          console.error("Error al obtener la cantidad de reproduciones : ",error);
        })
    
        axios.get(apiUril4)
        .then(response => {
          const viewCount = response.data.items[0].statistics.viewCount;
          setViewsAnne(viewCount);
          
        })
    
        .catch(error => {
          console.error("Error al obtener la cantidad de reproduciones : ",error);
        })

         
        setSeries(rows.slice().sort((a, b) => b.values.views - a.values.views));
    

      },[]);
    
      const columns = useMemo(
        ()=>[
        //    {
        //     Header : "Id",
        //     accessor: "id",
        //     Cell: ({ value}) => <strong>{value}</strong>
        //    },
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
              {row.id == 0 && <p>85500</p>}
              {row.id == 1 && <p>84854</p>}
              {row.id == 2 && <p>25535</p>}
              {row.id == 3 && <p>19500</p>}
              {row.id == 4 && <p>12500</p>}
              
              </>
              
          )   
          
          
          
          },

        ],[series]
      )
     
      const tableInstance = useTable({
        columns
        ,data:series  // Ordenar por 'age' de mayor a menor
             // Ordenar por la columna "age" de manera descendente al principio
          },
          useSortBy);
    
        const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
      } = tableInstance
     
        console.log(rows);

    return (
        <>
    
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


    

        </>
    )
}


export default tableSeries;