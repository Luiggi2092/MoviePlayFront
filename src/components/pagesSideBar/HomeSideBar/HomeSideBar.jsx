import { Chart } from "react-google-charts";
import './HomeSideBar.css';
import {useDispatch,useSelector} from "react-redux"
import { useTable } from "react-table";
import {getTopFiveMovies,getTopFiveSeries} from "../../../redux/actions"
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

  const dispatch = useDispatch();
  const Top5Mov = useSelector((state)=> state.Top5Mov)
  const Top5Ser = useSelector((state)=> state.Top5Ser)

  
  

  useEffect(()=>{
       
    dispatch(getTopFiveMovies());
    dispatch(getTopFiveSeries());
 
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
        Header : "Título",
        accessor: "title"
       },
       {Header : "Vistas",
        accessor: "viewCount"
          
      
      
      }

    ],[]
  )
  const tableInstance = useTable({
    columns
    ,data : Top5Mov
  });

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
  } = tableInstance
 

 
  

  return (
    <div className='contentHome'>
      <div className="scrollable-container">
    <div className='table1'>
      
    <h4>Top 5 Peliculas</h4>
    <table {...getTableProps()} className='table' >
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
            <tbody {...getTableBodyProps()} className='tbody'>
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
    <div className='table2'>
     <TableSeries Top5Ser={Top5Ser}/>
    </div>
        <div className='graficoven'>
          <Chart
            chartType="ColumnChart"
            width="500px"
            height="400px"
            loader={<div className="chart-loader">Cargando gráfico...</div>}
            data={data}
            options={{
              title: "Numero de Usuarios",
              chartArea: { width: "70%" },
              hAxis: { title: "Meses", minValue: 0 },
              vAxis: { title: "N° Usuarios", minValue: 0 },
              legend: "none",
            }}
          />
        </div>
    </div>
    </div>
  )

}

export default HomeSideBar;