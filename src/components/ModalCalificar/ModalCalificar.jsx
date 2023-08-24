import style from "./ModalCalificar.module.css"
import { FaStar } from "react-icons/fa"
import {useEffect, useState} from "react"
import { useElements } from "@stripe/react-stripe-js";
import {CreateReview, todosLosProductosXidUser} from "../../redux/actions"
import {useDispatch} from "react-redux"




const Calificacion = ({openModal,cambiarEstado,idUser,idMov,idSer}) => {

    const [Currentvalue,setCurrentValue] = useState(0);
    const [hoverValue,setHovervalue] = useState(undefined);
    const dispatch = useDispatch();

    const [form,setForm] = useState({
           calificacion: 0,
           comentario: "",
           idMovie:"",
           idSerie:"",
           idUser: "", 
    
    
    })

    useEffect(()=>{
          
        setForm({ idUser: idUser,idMovie:idMov,idSerie:idSer,calificacion:Currentvalue})
        
    },[idMov,Currentvalue,idSer])
    
    
    const HandleClick = (value) => {
   
        setCurrentValue(value) 


    }

    const HandleMouseOver = (value) => {
        
         setHovervalue(value)
    }

    const HandleMouseLeaver = () => {
         
        setHovervalue(undefined);
    } 

    const BotonCerrar = () => {

       cambiarEstado(!openModal);
    
    }

    const stars = Array(5).fill(0);


    const ChangeHandler = (e) => {
        e.preventDefault();
        
        setForm({...form,comentario: e.target.value})
    }


    const SubmitHandler = (event) => {
         event.preventDefault();
         if(form.calificacion &&
            form.comentario &&
            form.idMovie &&
            form.idUser || form.calificacion &&
            form.comentario &&
            form.idSerie &&
            form.idUser ){
                dispatch(CreateReview(form));
                dispatch(todosLosProductosXidUser(idUser))
                cambiarEstado(false);
                setCurrentValue(0);
                setForm({
                    calificacion: 0,
                    comentario: "",
                    idMovie:"",
                    idSerie:"",
                    idUser: "", 
             
             
             })
            }


    }

  return (
  <>
    {openModal && <form>
        <div className={style.Overlay}>
           <div className={style.ContenedorModal}>
               <div className={style.EncabezadoModal}>
                 <h2 className={style.titulo}>
                      Califica tu Compra
                 </h2>
                 <div className={style.contenedor}>
                    <div className={style.stars}>
                      {stars.map((_,index) => {
                         return (
                            <FaStar key={index}
                                    size={24}
                                    style={{
                                        marginRight: "10px",
                                        cursor: "pointer"

                                    }}
                                    color={(hoverValue || Currentvalue) > index ? "orange": "black"}
                                    onClick={()=> HandleClick(index + 1)}
                                    onMouseOver={()=> HandleMouseOver(index + 1)}
                                    onMouseLeave={HandleMouseLeaver}/>

                         )
                      })}
                    </div>   
                       
                 </div>
                 <div className={style.inputs}>
                      <textarea className={style.textarea} placeholder="Escribe un Comentario..." name="comentario" onChange={ChangeHandler}>

                      </textarea>

                    <button type="submit" onClick={SubmitHandler}>
                         Enviar
                    </button>
                     
                 <div className={style.BotonCerrar} >
                 <button onClick={BotonCerrar}>X</button>
                        </div>
                     

                 </div>

                </div>  
           </div>
        </div>
        
        
        
        
        </form>}
     

  </>
  )

}



export default Calificacion;