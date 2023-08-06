import { useState,useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import style from "./ModalCreateMovie.module.css"
import {getGeneros,postMovie} from "../../redux/actions";
import { useDispatch,useSelector} from "react-redux"
const url = 'https://api.cloudinary.com/v1_1/dpq8kiocc/image/upload'
const UPLOAD_PRESET = 'Products'



const ModelCreateMovie = ({openModal,cambiarEstado})=> {

    const [avance, setAvance] = useState(0);
    const dispatch = useDispatch();
    const listaGenero = useSelector(state=> state.Generos);
    


    const [form,setForm] = useState({
        type: "movie",
        name: "",
        image: "",
        genres: [],
        time: 0,
        linkVideo: "",
        description: "",
        price : 0.0

    })


    const [errors,setErrors] = useState({
        type: "movie",
        name: "",
        image: "",
        genres: [],
        time: "",
        linkVideo: "",
        description: "",
        price: 0.0

    })


    useEffect(()=> {
          dispatch(getGeneros()); 

    },[])  
  
   

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
        setErrors({...errors,time: "",linkVideo:""})

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
        

         if(property === "linkVideo") {

            console.log(value)
              
            if(!RegExUrl.test(value) ){
                setErrors({...errors,linkVideo : "No cumple con el formato de una url"});
            }
            else{
                setErrors({...errors,linkVideo: ""});
            }
         }

         if(property === "time"){
            
            if(Number(value)>= 240){
                setErrors({...errors,time: "La Duracion de la pelicula debe ser menos de 240 minutos"})
            }else{
                setErrors({...errors,time: ""});
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
          form.price ){
            dispatch(postMovie(form));
            cambiarEstado(false);
            Swal.fire({
            title:`La pelicula se creo con exito`,
             icon:'success',
             confirmButtonText:'Ok'});
    
        }else{
            Swal.fire({
                title:`ocurrio un error al crear pelicula`,
                 icon:'error',
                 confirmButtonText:'Ok'});
        
        }  


       
    }


    return (
        <>
        
        {openModal && <form onSubmit={submitHandler}>
            <div className={style.Overlay}>
                <div className={style.ContenedorModal}>
                   <div className={style.EncabezadoModal}>
                       <h2 className={style.titulo}>Movie</h2>
                   </div>
                   <div className={style.contenedor}>
                      
                     <div>      
                     <img src={form.image == "" ? "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps": form.image} />  
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
                        <input type="text" name="name" onChange={ChangeHandle}/>
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
                        <input type="text" name="time" onChange={ChangeHandle}></input>
                        <br/>
                        <span className={style.error}>{errors.duracion}</span>
                     </div> 
                     <div>
                        <label>Trailer :   </label>
                        <br/>
                        <input type="url" name="linkVideo" onChange={ChangeHandle}></input>
                        <br/>
                        <span className={style.error}>{errors.trailer}</span>
                     </div>
                     <div>
                        <label>Precio $ : </label>
                        <br/>
                        <input type="text" name="price" onChange={ChangeHandle} />
                     </div>
                     <br/>
                    
                     
                     <button type="submit" className={style.botonMovie} >
                            Crear Pelicula
                     </button>
                
                        

                     
                <div className={style.BotonCerrar} >
                 <buttonon onClick={BotonCerrar}>X</buttonon>
                        </div>
                     
                   </div>
                     
                    
                   
                <div className={style.textArea}>
                <label>Descripcion : </label>
                <br/>
                <textarea name="description" onChange={ChangeHandle}></textarea>
                </div>
                   
                </div>
                
                


            </div>
            
            
            </form>}
        </>
    )

}


export default ModelCreateMovie;