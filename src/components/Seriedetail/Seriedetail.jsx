import './seriedetail.css'

const SerieDetail = () => {
    return (
        <section className='sectionDetailSerie'>
             
            <h3 className='nameSeie'>Nombre Serie</h3>
            
            <div className="containerDivDetail">
                
                <img className='imgDetailSerie' src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />

                <div>

                    <p className='nameDescripcion'>Descripcion</p>

                    <p className='descripcionSerie'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid dicta fugit debitis sint voluptas, ex eaque excepturi nam cum obcaecati quas. Ullam ducimus cum eligendi veniam perferendis. Minus, voluptas?</p>

                    <p className='nameRaiting'>Raiting</p>
                    <div className='divEstrellas'>
                        <p>⭐</p>
                        <p>⭐</p>
                        <p>⭐</p>
                        <p>⭐</p>
                        <p>⭐</p>
                    </div>

                    <p className='nameActores'>Actores</p>
                    <p className='actoresSeries'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

                    <p className='nameDirector'>Director</p>
                    <p className='directorSerie'>Lee Byeong-heon</p>
                
                </div>

            </div>
            
            <div className='divButtonCompraSerie'>
                <button className='buttonCompraSerie'>$ 100</button>
            </div>

            <div className='divContainerTC'>
                <div className='divTemp'>
                    <p className='p'>TEMPORADA</p>
                    <select className='selectDetail'>
                        <option>Temporada 1</option>
                    </select>
                </div>
                <div className='divCap'>
                    <p className='p'>CAPITULO</p>
                    <select className='selectDetail'>
                        <option>Catipulo 1</option>
                    </select>
                </div>
            </div>

            <div className='divVideo'>
                <img className="imgSeries" src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
            </div>

        </section>
    )
}

export default SerieDetail