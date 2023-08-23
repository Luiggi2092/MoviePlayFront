import "./ModalCreateSerie.css"
import { useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux"
import {getGeneros,postSerie,getSeries} from "../../redux/actions"
import axios from "axios";
import Swal from 'sweetalert2'

const url = 'https://api.cloudinary.com/v1_1/dpq8kiocc/image/upload'
const UPLOAD_PRESET = 'Products'

const ModalCreateSerie = ({openModalSerie,cambiarEstadoSerie,page}) => {
    
    const [avance,setAvance] = useState(0);
    const [actor,setActor] = useState("");
    const listaGenero = useSelector(state=> state.Generos);
    const series = useSelector(state => state.Series)
    const busquedaSer = useSelector((state) => state.SearchAdminSerieCreate);


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
        numEpisodio: "",
        numTemporada: "",
        yearEstreno:"",
        duracion:"",
        price: ""
        

    })

    useEffect(()=> {
        
         dispatch(getGeneros());
         dispatch(getSeries());
    },[])


    useEffect(()=> {
        
         if(busquedaSer){
           for(let dat of busquedaSer){
               console.log(dat.price)
         setForm({...form,image: dat.image,price: dat.price})
        
           }
         }
    },[busquedaSer])
    

    const ChangeHandle = (event) => {
        
        let property = event.target.name;
        let value = event.target.value;

        setForm({
            ...form,
            [property]:value
        })


        validate(value,property);

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
      var RegExUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
      var RegExUrlPrecio = /^\d*\.?\d*$/;
      
      if(property == "yearEstreno"){

         
          
         if(!RegExUrlPrecio.test(value)){
         
            setErrors({...errors,yearEstreno : "El Año solo puede contener numeros"})

         }else{
            setErrors({...errors,yearEstreno : ""})
         }

      }

      if(property == "numTemporada"){

         if(!RegExUrlPrecio.test(value)){
            setErrors({...errors,numTemporada: "El numero de la temporada solo puede contener numeros"})
         }else{ 
            setErrors({...errors,numTemporada : ""})
         }

      }

      if(property == "numEpisodio"){
         if(!RegExUrlPrecio.test(value)){
            setErrors({...errors,numEpisodio: "El numero de episodio solo puede contener numeros"})
         }else{ 
            setErrors({...errors,numEpisodio : ""})
         }
      } 

      if(property == "duracion") {

         if(Number(value)> 120){
            setErrors({...errors,duracion: "La Duracion debe ser menos de 120 minutos"});
         }
         else if(!RegExUrlPrecio.test(value)){
            setErrors({...errors,duracion: "La Duracion solo puede contener numeros"});
         }else{
         setErrors({...errors,duracion: ""});
      }
   }

     if(property == "linkVideo"){

       if(!RegExUrl.test(value)){
         if(value == ""){
            setErrors({...errors,linkVideo: "La url no puede estar vacia"});  
        }else{
        setErrors({...errors,linkVideo : "No cumple con el formato de una url"});
        }
           
       }else{
         setErrors({...errors,linkVideo: ""});  
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
            dispatch(postSerie(form,page));
        cambiarEstadoSerie(false)
        setForm({...form,image: "https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps" })
        setAvance(0);
        setErrors({...errors,duracion: "",linkVideo:"",price:"",numEpisodio:"",numTemporada: "",yearEstreno:""})
            }else{
                Swal.fire({
                    title:`Debes llenar correctamento los campos`,
                     icon:'error',
                     confirmButtonText:'Ok'});
            }
    }


    const remover = (e) => {
       e.preventDefault();
       setForm({...form,genres:[]})
    }

    const remover2 = (e)=> {
       e.preventDefault();
       setForm({...form,actores:[]})
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
                    <br/>
                    <input type="text" name="yearEstreno" onChange={ChangeHandle}/>
                    <span className="error">{errors.yearEstreno}</span>
                 </div>
                 <div>
                    <label>Genero :
                    {form.genres.map((e,index) => <p key={index}>{e}</p>)}
                    </label>
                    <br/>
                    <select name="genres" onChange={ChangeHandleCombo}>
                    {listaGenero?.map((gen,index)=>{
                                  return <option key={index}>{gen.name}</option>
                            })}   
                    </select>
                    <button onClick={remover}>Remover Generos</button>
                 </div>
                 <div>
                    <label>Actores :
                      
                    {form.actores.map((e,index) => <p key={index}>{e}</p>)}
                    </label>
                    <br/>
                    <input type="text" name="actores" onChange={CrearActores}/>
                    <button onClick={AgregandoActores}>Crear Actor</button>
                    <button onClick={remover2}>Remover Actores</button>
                 </div>
                 
                 <br/>
                 {/* <fieldset>
                    <legend>Existe Serie</legend>
                    <select>
                        <option>Seleccione :</option>
                         {series?.map((ser,index)=> {
                            return <option key={index} className="serexi">{ser.name}</option>
                         })}
                    </select>
                 </fieldset>*/}
                 <fieldset className="episodio"> 
                 
                 <legend>Episodio :</legend>
                 <div>
                    <label> N° Temporada :</label>
                    <br/>
                    <input type="text" name="numTemporada" onChange={ChangeHandle} />
                    <span className="error">{errors.numTemporada}</span> 
                 </div>
                 <div>
                    <label>N° Episodio :</label>
                    <br/>
                    <input type="text" name="numEpisodio" onChange={ChangeHandle} />
                    <span className="error">{errors.numEpisodio}</span> 
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
                    <textarea name="descripcionEpisodio" onChange={ChangeHandle}/>
                 </div>
                 
                 <div>
                    <label>Duracion de Episodio : (minutos) </label>
                    <br/>
                    <input type="text" name="duracion" onChange={ChangeHandle}/>
                    <span className="error">{errors.duracion}</span>
                 </div>
                 <br/>
                 <br/>
                 <div>
                    <label>Url de Episodio</label>
                    <input type="text" name="linkVideo" onChange={ChangeHandle}/>
                    <span className="error">{errors.linkVideo}</span>
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
                    <input type="text" name="price" onChange={ChangeHandle} value={form.price}/>
                    <span className="error">{errors.price}</span>
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