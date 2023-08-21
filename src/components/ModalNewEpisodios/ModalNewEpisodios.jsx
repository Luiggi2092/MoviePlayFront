import { useEffect } from "react";
import style from "./ModalNewEpisodios.module.css"
import {useDispatch,useSelector} from "react-redux"
import {AllNameSeries,postSerie} from "../../redux/actions"
import { useState } from "react";
import Swal from 'sweetalert2'



const AgregarEpisodio = ({openModalEpi,cambiarEstado}) => {


   const dispatch = useDispatch();
   const SeriesAll = useSelector(state=> state.AllNameSer);
    
    const BotonCerrar = () => {
        cambiarEstado(false);
        
    }


    const [form,setForm] = useState({
         
        titulo : "",
        numEpisodio:0,
        numTemporada:0,
        tituloEpisodio:"",
        descripcionEpisodio:"",
        linkVideo:"",
        duracion:"",
        
    }) 

    useEffect(()=> {
           
      dispatch(AllNameSeries());
   
        
    },[])


    const ChangeHandle = (event)=> {

      let property = event.target.name;
      let value = event.target.value;

      setForm({
          ...form,
          [property]:value
      })


    }

   const submitHandler = (event) => {
         event.preventDefault()
        if(form.titulo &&
           form.numTemporada &&
           form.numEpisodio &&
           form.tituloEpisodio &&
           form.descripcionEpisodio &&
           form.duracion && 
           form.linkVideo){
               
            dispatch(postSerie(form));
            cambiarEstado(false);
           }else{
            Swal.fire({
               title:`Debes llenar correctamento los campos`,
                icon:'error',
                confirmButtonText:'Ok'});
       
           }

   }


   

     return (
        <>
        {openModalEpi && <form>
           <div className={style.Overlay}>
             <div className={style.ContenedorModal}>
                <div>
                    <h2 className={style.titulo}>Episodios</h2>
                </div>
                <div className={style.contenedor}>
                    <div className={style.inputs}>
                        <label>Nombre de Serie : </label>
                        <select name="titulo" onChange={ChangeHandle}>
                           <select>Seleccione :</select>
                             {SeriesAll.map((e,index) => {
                                return <option key={index}>{e.titulo}</option>
                             })}
                        </select>
                        <div>
                    <label>N° Temporada :</label>
                    <br/>
                    <input type="text" name="numTemporada" onChange={ChangeHandle} />
                    <span className="error">{/*errors.numEpisodio*/}</span> 
                 </div>
                    
                    <fieldset className="episodio"> 
                 <legend>Episodio :</legend>
                 <div>
                    <label>N° Episodio :</label>
                    <br/>
                    <input type="text" name="numEpisodio" onChange={ChangeHandle} />
                    <span className="error">{/*errors.numEpisodio*/}</span> 
                 </div>
                 <div>
                    <label>Titulo de Episodio :</label>
                    <br/>
                    <input type="text" name="tituloEpisodio" onChange={ChangeHandle}/>
                 </div>
                 <div>
                 <br/>
                 <br/>
                    <label>Descripcion de Episodio :</label>
                    <br/>
                    <textarea name="descripcionEpisodio" onChange={ChangeHandle} />
                 </div>
                 
                 <div>
                    <label>Duracion de Episodio : </label>
                    <br/>
                    <input type="text" name="duracion" onChange={ChangeHandle} />
                    <span className="error">{/*errors.duracion*/}</span>
                 </div>
                 <br/>
                 <br/>
                 <div>
                    <label>Url de Episodio</label>
                    <input type="text" name="linkVideo" onChange={ChangeHandle} />
                    <span className="error">{/*errors.linkVideo*/}</span>
                 </div>
                 </fieldset>

                 </div>
                 <button type="submit" className="botonMovie" onClick={submitHandler} >
                            Crear Episodio
                     </button>
                
                 <div className={style.BotonCerrar} onClick={BotonCerrar}>
                            X
                        </div>
            </div> 
                </div>
             </div>
             
            
            </form>}
        </>
     )

}


export default AgregarEpisodio;