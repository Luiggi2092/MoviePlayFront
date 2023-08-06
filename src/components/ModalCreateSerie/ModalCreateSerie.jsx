import "./ModalCreateSerie.css"
import { useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux"
import {getGeneros,postSerie,getSeries} from "../../redux/actions"
import axios from "axios";
import Swal from 'sweetalert2'

const url = 'https://api.cloudinary.com/v1_1/dpq8kiocc/image/upload'
const UPLOAD_PRESET = 'Products'

const ModalCreateSerie = ({openModalSerie,cambiarEstadoSerie}) => {
    
    const [avance,setAvance] = useState(0);
    const [actor,setActor] = useState("");
    const listaGenero = useSelector(state=> state.Generos);
    const series = useSelector(state => state.Series)

    const dispatch = useDispatch();
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
        duracion:"",
        descripcion: "",
        yearEstreno:""
        
    });

    const [errors,setErrors] = useState({
        linkVideo:"",
        numEpisodio: 0,
        numTemporada: 0,

        

    })

    useEffect(()=> {
        
         dispatch(getGeneros());
         dispatch(getSeries());
    },[])

    

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
        if(form.titulo,
           form.descripcion,
           form.image,
           form.genres,
           form.actores,
           form.numEpisodio,
           form.numTemporada,
           form.price,
           form.tituloEpisodio,
           form.descripcionEpisodio,
           form.linkVideo,
           form.duracion,
           form.descripcion,
           form.yearEstreno ){
            dispatch(postSerie(form));

        cambiarEstadoSerie(false)
        Swal.fire({
            title:`La serie se creo con exito`,
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
         {openModalSerie && <form>
           <div className="Overlay">
            <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <h2 className="titulo">Serie</h2>
                </div>
                <div className="contenedor">
                <img src={form.image == "" ? "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps":form.image}/>
                      <input type="file" accept="image/*" className="fileinput" onChange={handleImagenUpload} />
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
                    {listaGenero?.map((gen,index)=>{
                                  return <option key={index}>{gen.name}</option>
                            })}   
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
                 <fieldset>
                    <legend>Existe Serie</legend>
                    <select>
                        <option>Seleccione :</option>
                         {series?.map((ser,index)=> {
                            return <option key={index} className="serexi">{ser.name}</option>
                         })}
                    </select>
                 </fieldset>
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
                    <input name="duracion" onChange={ChangeHandle}/>
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