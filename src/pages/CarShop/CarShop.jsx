import style from './CarShop.module.css'
import {loadStripe} from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { fetchCartContent, addToCart, removeFromCart } from '../../redux/actions';
import CardCar from '../../components/CardCar/CardCar';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51NcsyILBC7BTbazruZpu7lVt2P4tOwBFgdzNBoDIZO511Y1EGaPV4gmr0GTtf8VcOOW3x3ha8gmJ4lAFsSbVbGw600daZvRgAp');

const CheckoutForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)

        })

        if(!error){

            const {id} = paymentMethod;
            const {data} = await axios.post('http://localhost:3001/pago',{
                  amount: 10000, 
                  payment_method: id,
                  type:'card'
              });
            console.log(paymentMethod)
            console.log(data)
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

    const handleclick = (e) => {
        e.preventDefault()
        setContinuePay(true);
    }

    useEffect(() => {
        dispatch(fetchCartContent(user));
      }, [dispatch]);

      console.log(carrito)


      let series = null;
    if (carrito.Series) {
        series = carrito.Series.map(serie => {
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
    if (carrito.Multimedia) {
        movies = carrito.Multimedia.map(movie => {
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
                <p className={style.textSubmit}>Total: $precio</p>
                <button className={style.continuar} onClick={handleclick}>Continuar compra</button>
            </div >
            {continuePay && <Pago/>}            
        </section>
                      
    )
}

export default CardShop