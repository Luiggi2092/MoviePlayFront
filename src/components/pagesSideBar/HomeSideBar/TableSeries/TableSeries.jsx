import { useTable,useSortBy  } from "react-table";
import React from "react";
import axios from "axios"
import { useMemo,useState,useEffect } from "react";
import data from "../../../../data";
import './tableSeries.css'



const tableSeries = ({Top5Ser}) => {



      const columns = useMemo(
        ()=>[
        //    {
        //     Header : "Id",
        //     accessor: "id",
        //     Cell: ({ value}) => <strong>{value}</strong>
        //    },
           {
            Header : "Imagen",
            accessor: "seriesImage"
           },
           {
            Header : "Titulo",
            accessor: "seriesTitle"
           },
           {Header : "Vistas",
            accessor: "viewCount"
              
          
          
          
          },

        ],[]
      )
     
      const tableInstance = useTable({
        columns
        ,data:Top5Ser  
          });
    
        const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
      } = tableInstance
     
        // console.log(rows);

    return (
        <>
        <div className="table-container">
    <h4>Top 5 Series</h4>
    <table {...getTableProps()} className='table2' >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: "blue" }}>
                   {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}  >
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
            <tbody {...getTableBodyProps()} className='tbody'>
              {rows.map((row) => {
                 prepareRow(row);
                 return (
                  <tr {...row.getRowProps()}  className="table-row">
                      {row.cells.map((cell) => {
                        
                        return (
                          <td {...cell.getCellProps()}  className="table-cell"> 
                            {cell.column.id === 'seriesImage' ? (
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

    

        </>
    )
}


export default tableSeries;