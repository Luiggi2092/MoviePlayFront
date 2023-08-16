import { useState,useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import style from "./ModalEditarMovie.module.css"
import {getMoviexid,getGeneros,clearMovieId,ActualizarMovie} from "../../redux/actions";
import { useDispatch,useSelector} from "react-redux"
const url = 'https://api.cloudinary.com/v1_1/dpq8kiocc/image/upload'
const UPLOAD_PRESET = 'Products'



const ModelEditarMovie = ({openModalEdit,cambiarEstado,idpelicula})=> {


    const [avance, setAvance] = useState(0);
    const dispatch = useDispatch();
    const listaGenero = useSelector(state=> state.Generos);
    const pelicula = useSelector(state => state.MovieId);
    
    

    const [form,setForm] = useState({
        type: "movie",
        name: "",
        image: "",
        genres: [],
        time: 0,
        linkVideo: "",
        description: "",
        price : ""

    })


    const [errors,setErrors] = useState({
        type: "movie",
        name: "",
        image: "",
        genres: [],
        time: "",
        linkVideo: "",
        description: "",
        price: ""

    })

    


    useEffect(()=> {
          dispatch(getGeneros()); 

          if(Number(idpelicula) > 0){
          dispatch(getMoviexid(Number(idpelicula))); 
          dispatch(clearMovieId()); 
          }
      
    
    },[idpelicula])  

    useEffect(()=> {

    },[form.image])
  
   

    const handleImagenUpload  = async (event) =>{
        const file = event.target.files  && event.target.files[0];

        const formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const res  = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/formData'
            },
            onUploadProgress(e) {
                const progress = Math.round((100 * e.loaded || 1) / (e.total || 1));
                setAvance(progress);
            }
        });
        console.log(res);
        setForm({...form,image: res.data.secure_url});

    };

    const BotonCerrar = () => {
        cambiarEstado(false);
        setForm({...form,image: "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps" })
        
        setAvance(0);
        setErrors({...errors,time: "",linkVideo:"",price:""})

    }

    const ChangeHandleCombo = (event)=> {
          
        let value = event.target.value;
        
        let array=[];
        array.push(...form.genres,value);
        setForm({...form,genres:[...array]});

    }

    const ChangeHandle = (event) => {
       
        let property  = event.target.name;
        let value = event.target.value;

        
        



        setForm({
            ...form,
            [property]:value
        })


        validate(value,property);

    }


    const validate =(value,property)=> {
         var RegExUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
         var RegExUrlPrecio = /^\d*\.?\d*$/;

         
    
         if(property === "linkVideo") {

            console.log(value)
              
            if(!RegExUrl.test(value) ){
                if(value == ""){
                    setErrors({...errors,linkVideo: ""});  
                }else{
                setErrors({...errors,linkVideo : "No cumple con el formato de una url"});
            }}
            else{
                setErrors({...errors,linkVideo: ""});
            }
         }

         if(property === "time"){
            
            if(Number(value)>= 240){
                setErrors({...errors,time: "La Duracion de la pelicula debe ser menos de 240 minutos"})
            }else if(!RegExUrlPrecio.test(value)){
                setErrors({...errors,time: "La Duracion solo puede contener numeros"}) 
            }
            
            else{
                setErrors({...errors,time: ""});
            }
         }

         if(property === "price"){
            if(!RegExUrlPrecio.test(value)){
                setErrors({...errors,price : "El Precio solo puede contener numeros"})
            }else{
                setErrors({...errors,price: ""});
            }
         }


    }

    const submitHandler =(event)=> {
       event.preventDefault();
       if(form.type && 
          form.name &&
          form.image &&
          form.genres &&
          form.time &&
          form.linkVideo &&
          form.description &&
          form.price  ){
            dispatch(ActualizarMovie(form));
            cambiarEstado(false); 
            setForm({...form,image: "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps" })
            setAvance(0);
            setErrors({...errors,time: "",linkVideo:"",price:""})
        }else{
            Swal.fire({
                title:`Debe llenar correctamente los campos`,
                 icon:'error',
                 confirmButtonText:'Ok'});
        
        }  


       
    }


    return (
        <>
        
        {openModalEdit && <form onSubmit={submitHandler}>
            <div className={style.Overlay}>
                <div className={style.ContenedorModal}>
                   <div className={style.EncabezadoModal}>
                       <h2 className={style.titulo}>Movie</h2>
                   </div>
                   <div className={style.contenedor}>
                      
                     <div>      
                     <img src={form.image == "" || form.image == "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps" ? pelicula.image : form.image}  />  
                                <input type="file" accept="image/*" className={style.fileinput} onChange={handleImagenUpload} />
                                
                     </div>
                     <div>
                        <progress value={avance} max={100} id="progress-bar" />      
                        <br/> 
                     </div>
                     </div>
                     <div className={style.inputs}>
                     <div>
                        <label>Titulo :  </label>
                        <br/>
                        <input type="text" name="name" onChange={ChangeHandle} value={pelicula.name}/>
                     </div> 
                     <div className={style.genero}>
                        <label>Genero :    </label>
                        <br/>
                        <select name="genres" onChange={ChangeHandleCombo}>
                            <option>Seleccione :</option>
                            {listaGenero?.map((gen,index)=>{
                                  return <option key={index}>{gen.name}</option>
                            })}  
                        </select> 
                     </div>
                     <div>
                        <label>Duracion :   </label>
                        <br/>
                        <input type="text" name="time" onChange={ChangeHandle} value={pelicula.time}></input>
                        <br/>
                        <span className={style.error}>{errors.time}</span>
                     </div> 
                     <div>
                        <label>Url Video :   </label>
                        <br/>
                        <input type="url" name="linkVideo" onChange={ChangeHandle} value={pelicula.linkVideo}></input>
                        <br/>
                        <span className={style.error}>{errors.linkVideo}</span>
                     </div>
                     <div>
                        <label>Precio $ : </label>
                        <br/>
                        <input type="text" name="price"  onChange={ChangeHandle} id="texto" value={pelicula.price}  />
                         <br/>
                         <span className={style.error}>{errors.price}</span>
                     </div>
                     <br/>
                    
                     
                     <button type="submit" className={style.botonMovie} >
                            Editar Pelicula
                     </button>
                
                        

                     
                <div className={style.BotonCerrar} >
                 <button onClick={BotonCerrar}>X</button>
                        </div>
                     
                   </div>
                     
                    
                   
                <div className={style.textArea}>
                <label>Descripcion : </label>
                <br/>
                <textarea name="description" onChange={ChangeHandle} value={pelicula.description}></textarea>
                </div>
                   
                </div>
                
                


            </div>
            
            
            </form>}
        </>
    )

}


export default ModelEditarMovie;