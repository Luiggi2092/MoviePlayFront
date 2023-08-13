import style from './CarShop.module.css'
import {loadStripe} from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { fetchCartContent, addToCart, removeFromCart } from '../../redux/actions';
import CardCar from '../../components/CardCar/CardCar';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51NcsyILBC7BTbazruZpu7lVt2P4tOwBFgdzNBoDIZO511Y1EGaPV4gmr0GTtf8VcOOW3x3ha8gmJ4lAFsSbVbGw600daZvRgAp');

const reload = () => {
    window.location.reload(true);
}

const CheckoutForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    const moviesLocalStorage = useSelector((state) => state.savedProductsMovies)
    const seriesLocalStorage = useSelector((state) => state.savedProductsSeries)
    let allMoviesPrice = null
    let allSeriesPrice = null

    const calculateTotalPrice = (array) => {
        return array.reduce((total, item) => total + item.price, 0);
      };

    if (moviesLocalStorage && Array.isArray(moviesLocalStorage)) {
        allMoviesPrice = calculateTotalPrice(moviesLocalStorage);
      }
      
      if (seriesLocalStorage && Array.isArray(seriesLocalStorage)) {
        allSeriesPrice = calculateTotalPrice(seriesLocalStorage);
      }

      const totalAmount = (allMoviesPrice + allSeriesPrice)*100

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)

        })

        if(!error){

            const {id} = paymentMethod;
            const {data} = await axios.post('http://localhost:3001/api/checkout',{
                  amount: totalAmount, 
                  id: id,
                  description:'pago de prueba'
              });
            console.log(paymentMethod)
            console.log(data)
            localStorage.removeItem('savedProducts');
            localStorage.removeItem('savedSeries');
            localStorage.setItem('cartCount', 0)
            alert('Pago relizado correctament')
            reload()
        }

    }

    return(
        <form className={style.card}>
            <CardElement className={style.formControl}/>
            <button className={style.button} onClick={handleSubmit}>
                Comprar
            </button>
        </form>
    )
}

const Pago = () => {
    return (
        <Elements stripe={stripePromise} >
                <div className={style.container4}>
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


    const [continuePay, setContinuePay] = useState(false)
    const itemsFromDB = useSelector((state) => state.carrito)
    const moviesLocalStorage = useSelector((state) => state.savedProductsMovies)
    const seriesLocalStorage = useSelector((state) => state.savedProductsSeries)
    const contador = useSelector((state) => state.cartCount)
    const carrito = useSelector(state => state.carrito)
    const dispatch = useDispatch()
    const user = 'marcos@gmail.com'
    let allMoviesPrice = null
    let allSeriesPrice = null

    const calculateTotalPrice = (array) => {
        return array.reduce((total, item) => total + item.price, 0);
      };

    if (moviesLocalStorage && Array.isArray(moviesLocalStorage)) {
        allMoviesPrice = calculateTotalPrice(moviesLocalStorage);
      }
      
      if (seriesLocalStorage && Array.isArray(seriesLocalStorage)) {
        allSeriesPrice = calculateTotalPrice(seriesLocalStorage);
      }

      const totalAmount = allMoviesPrice + allSeriesPrice

    const handleclick = (e) => {
        e.preventDefault()
        setContinuePay(true);
    }

    useEffect(() => {
        dispatch(fetchCartContent(user));
      }, [dispatch]);

      


      let series = null;
    if (seriesLocalStorage && Array.isArray(seriesLocalStorage)) {
        series = seriesLocalStorage?.map(serie => {
            const uniqueKey = `${serie.id}_${serie.tipo}`;
            return (
                <CardCar
                    key={uniqueKey}
                    id={serie.id}
                    price={serie.price}
                    name={serie.name}
                    image={serie.image}
                    tipo={'serie'}
                />
            );
        });
    }

    let movies = null;
    if (moviesLocalStorage && Array.isArray(moviesLocalStorage)) {
        movies = moviesLocalStorage?.map(movie => {
            const uniqueKey = `${movie.id}_${movie.tipo}`;
            return (
                <CardCar
                    key={uniqueKey}
                    id={movie.id}
                    price={movie.price}
                    name={movie.name}
                    image={movie.image}
                    tipo={'movie'}
                />
            );
        });
    }

    return(
        <section className={style.maxContainer}>
            <div className={style.contenido}>
                <div className={style.nav}>
                    <p className={style.textNav}>Carrito {`(${contador})`}</p>
                </div>
                {series}
                {movies}
            </div>
            <div className={style.submit}>
                <p className={style.textSubmit}>Total: ${totalAmount}</p>
                {!continuePay && (
                    <button className={style.continuar} onClick={handleclick}>
                     Continuar compra
                    </button>
                    )}
            </div >
            {continuePay && <Pago/>}            
        </section>
                      
    )
}

export default CardShop