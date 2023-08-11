import style from './CarShop.module.css'
import {loadStripe} from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { fetchCartContent } from '../../redux/actions';
// import { getCar } from '../../redux/actions';
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
                id,
                amount: 10000
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
    // const items = useSelector((state) => state.cartItems)
    const dispatch = useDispatch()

    const handleclick = (e) => {
        e.preventDefault()
        setContinuePay(true);
    }

    // useEffect(() => {
    //     dispatch(fetchCartContent('marcos@gmail.com'));
    //   }, [dispatch]);

    //   console.log(items)

    return(
        <section className={style.maxContainer}>
            <div className={style.contenido}>
                <div className={style.nav}>
                    <p className={style.textNav}>Carrito {`(0)`}</p>
                </div>
                <h1>aqui va el contenido</h1>
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