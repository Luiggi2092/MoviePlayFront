import style from './CarShop.module.css'
import {loadStripe} from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { fetchCartContent } from '../../redux/actions';
import imagen from '../../assets/pngegg.png'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CardCar from '../../components/CardCar/CardCar';
import CardCarSerie from '../../components/CardCarSeries/CardCarSerie';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import Swal from 'sweetalert2'
const user = localStorage.getItem('email')
const stripePromise = loadStripe('pk_test_51NcsyILBC7BTbazruZpu7lVt2P4tOwBFgdzNBoDIZO511Y1EGaPV4gmr0GTtf8VcOOW3x3ha8gmJ4lAFsSbVbGw600daZvRgAp');

const reload = () => {
    window.location.reload(false);
}

const CheckoutForm = () => {
    
    const stripe = useStripe()
    const elements = useElements()
    let allMoviesPrice = null
    let allSeriesPrice = null    
    const carrito = useSelector(state => state.carrito)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    
    
    const calculateTotalPrice = (array) => {
        return array.reduce((total, item) => total + item.price, 0);
    };
    
    if (carrito.Multimedia && Array.isArray(carrito.Multimedia)) {
        allMoviesPrice = calculateTotalPrice(carrito.Multimedia);
    }
      
      if (carrito.Series && Array.isArray(carrito.Series)) {
        allSeriesPrice = calculateTotalPrice(carrito.Series);
      }

      const totalAmount = (allMoviesPrice + allSeriesPrice)*100
      const totalAmountParseado = parseInt(totalAmount)


      const handleSubmit = async (e) => {
          e.preventDefault();
          setIsProcessingPayment(true)
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)

        })

        if(!error){

            const {id} = paymentMethod;
            const {data} = await axios.post('http://localhost:3001/pago',{
                  amount: totalAmountParseado, 
                  id: id,
                  description:'pago de producto',
                  emailUsuario:user
              });
            console.log(paymentMethod)
            console.log(data)
            Swal.fire({
                title:`Compra realizada correctamente`,
                icon:'success'});
                setTimeout(() => {
                    setIsProcessingPayment(false); // Indicar que el pago ha terminado
                    reload();
                  }, 2000); //
        }
    }
    
    return(
        <form className={style.card}>
            <CardElement className={style.formControl} />
            {isProcessingPayment ? (
                <Loading style={{ color: 'black' }}/> // Mostrar Loading mientras se procesa el pago
              ) : (
                <button className={style.button} onClick={handleSubmit}>
                  Comprar
                </button>
            )}
        </form>
    )
}

const Pago = () => {
    return (
        <Elements stripe={stripePromise} className={style.texto}>
                <div className={style.container4}>
                    <h1 className={style.textoTargeta}>Paga en línea sin comisión ✔</h1>
                    <img src={imagen} className={style.imagen}/>
                    <div className={style.row}>
                        <div className={style.element}>
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </Elements>
    )
}


const CardShop = () => {

    

    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
    }


    const [continuePay, setContinuePay] = useState(false)
    const contador = useSelector((state) => state.cartCount)
    const carrito = useSelector(state => state.carrito)
    const dispatch = useDispatch()
    let allMoviesPrice = null
    let allSeriesPrice = null
    
    const calculateTotalPrice = (array) => {
        return array.reduce((total, item) => total + item.price, 0);
    };

    if (carrito.Multimedia && Array.isArray(carrito.Multimedia)) {
        allMoviesPrice = calculateTotalPrice(carrito.Multimedia);
    }
      
    if (carrito.Series && Array.isArray(carrito.Series)) {
        allSeriesPrice = calculateTotalPrice(carrito.Series);
      }

      const totalAmount = allMoviesPrice + allSeriesPrice
      const totalAmountParseado = parseFloat(totalAmount.toFixed(2))

    const handleclick = (e) => {
        e.preventDefault()
        setContinuePay(true);
    }

    useEffect(()=>{
        dispatch(fetchCartContent(user))
      },[dispatch]);
      const contadorDelCarrito = (carrito.Multimedia?.length || 0) + (carrito.Series?.length || 0);

      


    let series = null;
    if (carrito.Series && Array.isArray(carrito.Series)) {
        series = carrito.Series?.map(serie => {
            const uniqueKey = `${serie.seriesXcarro.serieId}_serie`;
            return (
                <CardCarSerie
                    key={uniqueKey}
                    id={serie.seriesXcarro.serieId}
                    price={serie.price}
                    name={serie.titulo}
                    image={serie.image}
                />
            );
        });
    }

    let movies = null;    
    if (carrito.Multimedia && Array.isArray(carrito.Multimedia)) {
        movies = carrito.Multimedia?.map(movie => {
            const uniqueKey = `${movie.peliculasXcarro.multimediaId}_movie`;
            return (
                <CardCar
                    key={uniqueKey}
                    id={movie.peliculasXcarro.multimediaId}
                    price={movie.price}
                    name={movie.name}
                    image={movie.image}
                />
            );
        });
    }

    return(<section>

            <Navbar isScrolled={isScrolled} /> 
    <div className={style.maxContainer}>
        <div className={style.container}>

            <div className={style.contenido}>
                <div className={style.nav}>
                    <p className={style.textNav}>Carrito {`(${contadorDelCarrito})`}</p>
                </div>
                {series}
                {movies}
            </div>
            <div className={style.submit}>
                <p className={style.textSubmit}>Total: ${totalAmountParseado}</p>
                {totalAmountParseado !== 0 && !continuePay && (
                            <button className={style.continuar} onClick={handleclick}>
                                Continuar compra
                            </button>
                        )}
            </div >
            {continuePay && <Pago/>}
        </div>
                       
    </div>
        <Footer /> 
                    </section>
                      
    )
}

export default CardShop