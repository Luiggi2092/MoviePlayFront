import style from "./ModalNewEpisodios.module.css"



const AgregarEpisodio = ({openModalEpi,cambiarEstado}) => {

    
    const BotonCerrar = () => {
        cambiarEstado(false);
        
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
                        <select>
                             <option>Breaking Bad</option>
                             <option>One Piece</option>
                             <option>Casa de Papel</option>
                        </select>
                    
                    <fieldset className="episodio"> 
                 <legend>Episodio :</legend>
                 <div>
                    <label>N° Episodio :</label>
                    <br/>
                    <input type="text" name="numEpisodio" /*onChange={ChangeHandle}*/ />
                    <span className="error">{/*errors.numEpisodio*/}</span> 
                 </div>
                 <div>
                    <label>Titulo de Episodio :</label>
                    <br/>
                    <input type="text" name="tituloEpisodio" /*onChange={ChangeHandle}*//>
                 </div>
                 <div>
                 <br/>
                 <br/>
                    <label>Descripcion de Episodio :</label>
                    <br/>
                    <textarea name="descripcionEpisodio" /*onChange={ChangeHandle}*//>
                 </div>
                 
                 <div>
                    <label>Duracion de Episodio : </label>
                    <br/>
                    <input type="text" name="duracion" /*onChange={ChangeHandle}*//>
                    <span className="error">{/*errors.duracion*/}</span>
                 </div>
                 <br/>
                 <br/>
                 <div>
                    <label>Url de Episodio</label>
                    <input type="text" name="linkVideo" /*onChange={ChangeHandle}*//>
                    <span className="error">{/*errors.linkVideo*/}</span>
                 </div>
                 </fieldset>

                 </div>
                 <button type="submit" className="botonMovie" /*onClick={submitHandler}*/ >
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