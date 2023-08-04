import "./ModalCreateSerie.css"
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const url = 'https://api.cloudinary.com/v1_1/dpq8kiocc/image/upload'
const UPLOAD_PRESET = 'Products'

const ModalCreateSerie = ({openModalSerie,cambiarEstadoSerie}) => {
    
    const [avance,setAvance] = useState(0);

    const [form, setForm] = useState({
        name: "",
        imagen: "",
        genero: "",
        episodio: "",
        temporadas: 1,
        precio: 0.0,
        descripcion: "",
    });

    const [errors,setErrors] = useState({
        name: "",
        imagen: "",
        genero: "",
        episodio: "",
        temporadas: 1,
        precio: 0.0,
        descripcion: "",
    })

    const ChangeHandle = (event) => {
        
        let property = event.target.name;
        let value = event.target.value;

        setForm({
            ...form,
            [property]:value
        })


    }

    const validate =(value,property)=> {




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
       setForm({...form,imagen: res.data.secure_url})
    };
    
    const BotonCerrar = () => {
        cambiarEstadoSerie(false);
        setForm({...form,imagen:"https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps"})
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
                <img src={form.imagen == "" ? "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps":form.imagen}/>
                <div>
                    <progress value={avance} max={100} id="progress-bar" />
                    <br/>
                </div>
                </div>
                <div className="inputs">
                 <div>
                    <label>Titulo : </label>
                    <br/>
                    <input type="text" name="name" onChange={ChangeHandle}/>
                 </div> 
                 <div>
                    <label>Genero :</label>
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
                    <label>Temporadas :</label>
                    <br/>
                    <input type="number" name="temporadas" onChange={ChangeHandle} value={form.temporadas > 1 ? form.temporadas : 1}/>
                 </div>
                 <div>
                    <label>Precio $ :</label>
                    <br/>
                    <input type="text" name="precio" onChange={ChangeHandle}/>
                 </div>
                 <div>
                    <label>Episodio :</label>
                    <br/>
                    <input type="text" name="episodio" onChange={ChangeHandle} />
                 </div>
                 <br/>
                 <div className="textArea">
                     <label className="lades">Descripcion :</label> 
                     <br/>
                     <textarea name="descripcion" onChange={ChangeHandle}></textarea>     
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