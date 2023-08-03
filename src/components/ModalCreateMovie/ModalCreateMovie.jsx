import { useState } from "react";
import axios from "axios";
import "./ModalCreateMovie.css"

const url = 'https://api.cloudinary.com/v1_1/dpq8kiocc/image/upload'
const UPLOAD_PRESET = 'Products'



const ModelCreateMovie = ({openModal,cambiarEstado})=> {

    const [avance, setAvance] = useState(0);

    const [form,setForm] = useState({
        name: "",
        imagen: "",
        genero: "",
        duracion: 0.0,
        trailer: "",
        descripcion: "",

    })


    const [errors,setErrors] = useState({
        name: "",
        imagen: "",
        genero: "",
        duracion: "",
        trailer: "",
        descripcion: "",

    })


  




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
        setForm({...form,imagen: res.data.secure_url});

    };

    const BotonCerrar = () => {
        cambiarEstado(false);
        setForm({...form,imagen: "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps" })
        setAvance(0);
        setErrors({...errors,duracion: "",trailer:""})

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
        

         if(property === "trailer") {

            console.log(value)
              
            if(!RegExUrl.test(value) ){
                setErrors({...errors,trailer : "No cumple con el formato de una url"});
            }
            else{
                setErrors({...errors,trailer: ""});
            }
         }

         if(property === "duracion"){
            
            if(Number(value.substring(1,2))>= 4){
                setErrors({...errors,duracion: "La Duracion de la pelicula debe ser menos a 04 horas"})
            }else{
                setErrors({...errors,duracion: ""});
            }
         }


    }


    return (
        <>
        
        {openModal && <form>
            <div className="Overlay">
                <div className="ContenedorModal">
                   <div className="EncabezadoModal">
                       <h2 className="titulo">Movie</h2>
                   </div>
                   <div className="contenedor">
                      
                     <div>      
                     <img src={form.imagen== "" ? "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps": form.imagen} />
                     </div>
                     <div>
                        <progress value={avance} max={100} id="progress-bar" />      
                        <br/> 
                     </div>
                     </div>
                     <div className="inputs">
                     <div>
                        <label>Titulo :  </label>
                        <br/>
                        <input type="text" name="name" onChange={ChangeHandle}/>
                     </div> 
                     <div className="genero">
                        <label>Genero :    </label>
                        <br/>
                        <select name="genero" onChange={ChangeHandle}>
                            <option>Seleccione :</option>
                            <option value="Drama">Drama</option>
                            <option value="Accion">Acción</option>
                            <option value="Comedia">Comedia</option>
                            <option value="Aventura">Aventura</option>  
                        </select> 
                     </div>
                     <div>
                        <label>Duracion :   </label>
                        <br/>
                        <input type="time" name="duracion" onChange={ChangeHandle}></input>
                        <br/>
                        <span className="error">{errors.duracion}</span>
                     </div> 
                     <div>
                        <label>Trailer :   </label>
                        <br/>
                        <input type="url" name="trailer" onChange={ChangeHandle}></input>
                        <br/>
                        <span className="error">{errors.trailer}</span>
                     </div>
                     <br/>
                     <br/>
                     <input type="file" className="file-input" onChange={handleImagenUpload} />
                     <br/>
                     
                     <button type="submit" >
                            Crear Pelicula
                     </button>
                
                        

                     
                <div className="BotonCerrar" onClick={BotonCerrar}>
                            X
                        </div>
                     
                   </div>
                     
                    
                   
                <div className="textArea">
                <label>Descripcion : </label>
                <br/>
                <textarea name="descripcion" onChange={ChangeHandle}></textarea>
                </div>
                   
                </div>
                
                <div className="BotonCerrar" onClick={BotonCerrar}>
                            X
                        </div>


            </div>
            
            
            </form>}
        </>
    )

}


export default ModelCreateMovie;