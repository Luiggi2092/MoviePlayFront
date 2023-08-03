import "./ModalCreateSerie.css"



const ModalCreateSerie = ({openModalSerie,cambiarEstadoSerie}) => {
    console.log(openModalSerie)
    return (
        <>
         {openModalSerie && <form>
           <div className="Overlay">
            <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <h2 className="titulo">Serie</h2>
                </div>
                <div className="contenedor">
                <img src={"https://res.cloudinary.com/dpq8kiocc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688335705/Products/uqejaqpcos3lp630roqi.jpg?_s=public-apps"}/>
                <div>
                    <progress max={100} />
                    <br/>
                </div>
                </div>
                <div className="inputs">
                 <div>
                    <label>Titulo : </label>
                    <br/>
                    <input type="text" name="name"/>
                 </div> 
                 <div>
                    <label>Genero :</label>
                    <br/>
                    <select name="genero">
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
                    <input type="number"/>
                 </div>
                 <div>
                    
                 </div>
                </div>

            </div>
            </div> 
         </form>}
       </>
    )
}

export default ModalCreateSerie;