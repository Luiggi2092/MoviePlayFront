import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { todosLosProductosXidUser, ActPerfil } from '../../redux/actions';
import Modal from '../../components/ModalCalificar/ModalCalificar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";
import './profile.css';

const url = 'https://api.cloudinary.com/v1_1/dpq8kiocc/image/upload'
const UPLOAD_PRESET = 'Products'




const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [avance, setAvance] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [idSerie, setIdSerie] = useState();
    const [idMovie, setIdMovie] = useState();
    const [profileImage, setProfileImage] = useState(
        localStorage.getItem('foto') ||
        'https://media.istockphoto.com/id/500620030/es/vector/dibujos-animados-cara-con-entusiasmo-la-expresi%C3%B3n.jpg?s=612x612&w=0&k=20&c=fSHO3HwsT-afQGZb01hSgxGJeKILxXjUWklyTSMwSsc='
    );
    //const [alias, setAlias] = useState(localStorage.getItem('alias') || '');
    //const [name, setName] = useState(localStorage.getItem('name') || '');
    //const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
    //const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
    //const [email, setEmail] = useState(localStorage.getItem('email') || '');
    //const [country, setCountry] = useState(localStorage.getItem('country') || '');
    const dispatch = useDispatch()
    const foto = localStorage.getItem('foto')

    const movieImages = [
        'https://i0.wp.com/elplanetaurbano.com/wp-content/uploads/2023/04/super-mario-planeta-urbano-00.png?resize=1250%2C781&ssl=1',
        'https://quadernillos.com/wp-content/uploads/2023/07/Imagen-destacada-WP-1024x593.png',
        'https://tierragamer.com/wp-content/uploads/2022/12/Peliculas-Marvel-DC-2023-01.jpg',
        'https://i0.wp.com/elplanetaurbano.com/wp-content/uploads/2023/04/super-mario-planeta-urbano-00.png?resize=1250%2C781&ssl=1',
        // Agrega más URLs de imágenes aquí
    ];

    const [form,setForm] = useState({
         image:localStorage.getItem('foto') ||
         'https://media.istockphoto.com/id/500620030/es/vector/dibujos-animados-cara-con-entusiasmo-la-expresi%C3%B3n.jpg?s=612x612&w=0&k=20&c=fSHO3HwsT-afQGZb01hSgxGJeKILxXjUWklyTSMwSsc=',
         nombre:"",
         apellido:"",
         email:"",
         password: ""
    })


    useEffect(() => {
        localStorage.setItem('profileImage', profileImage);
        localStorage.setItem('foto', form.image);
        
    }, [profileImage,form]);

    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setProfileImage(storedImage);
        }

        setForm({...form,
              image: localStorage.getItem('profileImage'),
              nombre: localStorage.getItem('name'),
              apellido: localStorage.getItem('apellido'),
              email: localStorage.getItem('email')

             })
    }, []);


    const idUser = localStorage.getItem('id')

    useEffect(() => {
        dispatch(todosLosProductosXidUser(idUser))
        console.log(idSerie, idMovie, openModal);
    }, [ idSerie, idMovie, openModal])

    const productos = useSelector(state => state.productosComprados)
    // console.log(productos)

    const movies = productos.peliculas || []

    const series = productos.series || []



    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // localStorage.setItem('alias', alias);
        // localStorage.setItem('name', name);
        // localStorage.setItem('lastName', lastName);
        // localStorage.setItem('phone', phone);
        // localStorage.setItem('email', email);
        // localStorage.setItem('country', country);
        if(form.nombre &&
           form.apellido &&
           form.image && 
           form.password){
             dispatch(ActPerfil(idUser,form))

           }else{
            Swal.fire({
                title:`Debes llenar correctamento los campos`,
                 icon:'error',
                 confirmButtonText:'Ok'});
           }
        setIsEditing(false); // Salir del modo de edición

    };

    // const handleImageChange = (e) => {
    //     const newImage = URL.createObjectURL(e.target.files[0]);
    //     setProfileImage(newImage);
    //     localStorage.setItem('profileImage', newImage); 
    // };

    const handleImagenUpload = async (event) => {
        const file = event.target.files && event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const res = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/formData'
            },
            onUploadProgress(e) {
                const progress = Math.round((100 * e.loaded || 1) / (e.total || 1));
                setAvance(progress);
            }
        });
        console.log(res);
        setForm({ ...form, image: res.data.secure_url })
    };



    const handleModal = (id) => {
        setIdSerie(undefined)
        setIdMovie(id)
        
        setOpenModal(!openModal)
        
        console.log(idSerie + " id serie" + "idMovie" + id)
       
    }


    const handleModalSer = (id) => {
        setIdMovie(undefined)
        setIdSerie(id)
       
        setOpenModal(!openModal);
        console.log(idMovie + " id movie" + " id serie" + id)

    }


    const HandleChange = (event) => {

        const property = event.target.name
        const value = event.target.value

        setForm({ ...form, [property]: value })


    }

    return (
        <div>
            <Navbar />
            <div className='profile-container'>
                <h1 className='titlePerf'>Perfil</h1>
                <div className='profile-info'>
                    <label>
                        <img
                            className={`profile-image ${isEditing ? 'editable' : ''}`}
                            src={form.image}
                            alt='Profile'
                            name="image"
                            onChange={HandleChange}
                        //onClick={isEditing ? () => document.getElementById('profile-image-input').click() : null}
                        />
                        {isEditing && (
                            <input
                                type='file'
                                id='profile-image-input'
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={handleImagenUpload}
                            />
                        )}
                    </label>
                    <div className="progress">
                        <progress value={avance} max={100} id="progress-bar" />
                        <br />
                    </div>
                    {isEditing && (
                        <p>Haz clic en tu imagen para cambiarla</p>
                    )}
                    <div className='containerInputs'>
                        {/* <h5>Alias</h5>
                        <input
                            type='text'
                            placeholder='Alias'
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            disabled={!isEditing}
                        /> */}
                        <h5>Nombre</h5>
                        <input
                            type='text'
                            placeholder='Nombre'
                            name="nombre"
                            value={form.nombre}
                            onChange={HandleChange}
                            disabled={!isEditing}
                        />
                        <h5>Apellido</h5>
                        <input
                            type='text'
                            placeholder='Apellido'
                            name="apellido"
                            value={form.apellido}
                            onChange={HandleChange}
                            disabled={!isEditing}
                        />
                        {/* <h5>Telefono</h5>
                        <input
                            type='text'
                            placeholder='Telefono'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                        /> */}
                        <h5>Email</h5>
                        <input
                            type='text'
                            placeholder='Email'
                            value={form.email}
                            //onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />
                        {isEditing && (<>
                        <h5>Contraseña</h5>
                        <input
                            type='password'
                            placeholder='Escribe tu Contraseña'
                            name="password"
                            onChange={HandleChange}
                            disabled={!isEditing}
                        />
                        <h5>Confirmar Contraseña</h5>
                        <input
                            type='password'
                            placeholder='Confirma Contraseña'
                            //value={country}
                            //onChange={(e) => setCountry(e.target.value)}
                            disabled={!isEditing}
                        />
                        </>)}
                    </div>

                    <div className='buttPerf'>
                        {isEditing ? (
                            <>
                                <button className='butguardar' onClick={handleSave}>
                                    Guardar
                                </button>
                                <button className='butCancelar' onClick={() => setIsEditing(false)}>
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <button className='buteditar' onClick={handleEdit}>
                                Editar
                            </button>
                        )}
                    </div>
                    <h1 className='conth1'>Mis Compras</h1>
                    
                    <div className='container-compras'>
                        <div className='purchase-carousel'>
                            {movies.length > 0 && movies.map((purchase) => (
                                <div key={purchase.id} className='purchase-card'>
                                    <Link to={`/moviesdetail/${purchase.id}`}>
                                        <img src={purchase.image} />
                                        <h3 className='h31'>{purchase.name}</h3>
                                    </Link>
                                    <p className='pc'>Costo: ${purchase.price}</p>
                                    <p className='pc'>Pelicula</p>
                                    <div>
                                        {purchase.review === "Sin Calificar" ? <button className='boton' onClick={() => handleModal(purchase.id)}>Calificar</button>: <p>Calificado</p>}
                                    </div>
                                </div>
                            ))}
                            {series.length > 0 && series.map((purchase) => (
                                <div key={purchase.id} className='purchase-card'>
                                    <Link to={`/detailSeries/${purchase.id}`}>
                                        <img src={purchase.image} />
                                        <h3 className='h31'>{purchase.name}</h3>
                                    </Link>
                                    <p className='p'>Costo: ${purchase.price}</p>
                                    <p className='p'>Serie</p>
                                    <div>
                                    {purchase.review === "Sin Calificar" ? <button className='boton' onClick={() => handleModalSer(purchase.id)}>Calificar</button>: <p>Calificado</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Modal openModal={openModal} cambiarEstado={setOpenModal} idUser={idUser} idMov={idMovie} idSer={idSerie} ></Modal>        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;









































