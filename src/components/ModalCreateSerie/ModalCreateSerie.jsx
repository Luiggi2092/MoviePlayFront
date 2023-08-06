import "./ModalCreateSerie.css"
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const url = 'https://api.cloudinary.com/v1_1/dpq8kiocc/image/upload'
const UPLOAD_PRESET = 'Products'

const ModalCreateSerie = ({openModalSerie,cambiarEstadoSerie}) => {
    
    const [avance,setAvance] = useState(0);
    const [actor,setActor] = useState("");
    const [form, setForm] = useState({
        titulo: "",
        image: "",
        genres: [],
        actores:[],
        numEpisodio: 0,
        numTemporada: 0,
        price: 0.0,
        tituloEpisodio:"",
        descripcionEpisodio:"",
        linkVideo:"",
        time:"",
        descripcion: "",
        yearEstreno:""
        
    });

    const [errors,setErrors] = useState({
        linkVideo:"",
        numEpisodio: 0,
        numTemporada: 0,

        

    })

    

    const ChangeHandle = (event) => {
        
        let property = event.target.name;
        let value = event.target.value;

        setForm({
            ...form,
            [property]:value
        })


    }


    
    const ChangeHandleCombo = (event)=> {
        
        let property = event.target.name;
        let value = event.target.value;
        
        if(property == "genres"){
        let array=[];
        array.push(...form.genres,value);
        setForm({...form,genres:[...array]});
        }


    }

    const validate =(value,property)=> {




    }

    const CrearActores =(e)=> {
        e.preventDefault();  
        setActor(event.target.value);
          
    }

    const AgregandoActores = (e)=> {
            e.preventDefault();
            let array=[];
            console.log(actor)
            array.push(...form.actores,actor);
            setForm({...form,actores:[...array]});
            setActor('');
            
    }




    const handleImagenUpload = async(event) => {
       const file = event.target.files && event.target.files[0];

       const formData = new FormData();
       formData.append('file',file);
       formData.append('upload_preset', UPLOAD_PRESET);

       const res = await axios.post(url,formData,{
          headers: {
            'Content-Type' : 'multipart/formData'
          },
          onUploadProgress(e){
            const progress = Math.round((100 * e.loaded || 1) / (e.total || 1));
            setAvance(progress);  
        }
       });
       console.log(res);
       setForm({...form,image: res.data.secure_url})
    };
    
    const BotonCerrar = () => {
        cambiarEstadoSerie(false);
        setForm({...form,image:"https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps"})
        setAvance(0);

    }


    const submitHandler =(event)=> {
        event.preventDefault();
        cambiarEstadoSerie(false)
        Swal.fire({
            title:`La serie se creo con exito`,
            icon:'success',
            confirmButtonText:'Ok'});
        
    }

    return (
        <>
         {openModalSerie && <form>
           <div className="Overlay">
            <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <h2 className="titulo">Serie</h2>
                </div>
                <div className="contenedor">
                <img src={form.image == "" ? "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps":form.image}/>
                <div className="progress">
                    <progress value={avance} max={100} id="progress-bar" />
                    <br/>
                </div>
                </div>
                <div className="inputs">
                 <div>
                    <label>Titulo de Serie : </label>
                    <br/>
                    <input type="text" name="titulo" onChange={ChangeHandle}/>
                 </div> 
                 <div>
                    <label>Año Estreno :</label>
                    <input type="text" name="yearEstreno" onChange={ChangeHandle}/>

                 </div>
                 <div>
                    <label>Genero :</label>
                    <br/>
                    <select name="genres" onChange={ChangeHandleCombo}>
                            <option>Seleccione :</option>
                            <option value="Drama">Drama</option>
                            <option value="Accion">Acción</option>
                            <option value="Comedia">Comedia</option>
                            <option value="Aventura">Aventura</option>  
                    </select>
                 </div>
                 <div>
                    <label>Actores :</label>
                    <br/>
                    <input type="text" name="actores" onChange={CrearActores}/>
                    <button onClick={AgregandoActores}>Crear Actor</button>
                 </div>
                 <div>
                    <label> N° Temporadas :</label>
                    <br/>
                    <input type="number" name="numTemporada" onChange={ChangeHandle} />
                 </div>
                 <br/>
                 <fieldset className="episodio">
                 <legend>Episodio :</legend>
                 <div>
                    <label>N° Episodio :</label>
                    <br/>
                    <input type="text" name="numEpisodio" onChange={ChangeHandle} />
                 </div>
                 <div>
                 <br/>
                    <label>Descripcion de Episodio :</label>
                    <br/>
                    <textarea name="descripcionEpisodio" onChange={ChangeHandle}/>
                 </div>
                 <div>
                    <label>Duracion de Episodio : </label>
                    <br/>
                    <input name="time" onChange={ChangeHandle}/>
                 </div>
                 <br/>
                 <div>
                    <label>Titulo de Episodio :</label>
                    <br/>
                    <input name="tituloEpisodio" onChange={ChangeHandle}/>
                 </div>
                 <br/>
                 <div>
                    <label>Trailer de Episodio</label>
                    <input type="text" name="linkVideo" onChange={ChangeHandle}/>
                 </div>
                 </fieldset>
                 <br/>
                 <div className="textArea">
                     <label>Descripcion de la Serie :</label> 
                     <br/>
                     <textarea name="descripcion" onChange={ChangeHandle}></textarea>     
                 </div>
                 <br/>
                 <div>
                    <label>Precio de Serie $ :</label>
                    <br/>
                    <input type="text" name="price" onChange={ChangeHandle}/>
                 </div>
                 
                 <input type="file" accept="image/*" className="fileinput" onChange={handleImagenUpload} />
                 <button type="submit" className="botonMovie" onClick={submitHandler} >
                            Crear Serie
                     </button>
                     <div className="BotonCerrar" onClick={BotonCerrar}>
                            X
                        </div>
                                      

                 
                </div>

            </div>
            </div> 
         </form>}
       </>
    )
}

export default ModalCreateSerie;