import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch , useSelector} from 'react-redux';
import { todosLosProductosXidUser } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(
        localStorage.getItem('foto') ||
        'https://media.istockphoto.com/id/500620030/es/vector/dibujos-animados-cara-con-entusiasmo-la-expresi%C3%B3n.jpg?s=612x612&w=0&k=20&c=fSHO3HwsT-afQGZb01hSgxGJeKILxXjUWklyTSMwSsc='
    );
    const [alias, setAlias] = useState(localStorage.getItem('alias') || '');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
    const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [country, setCountry] = useState(localStorage.getItem('country') || '');
    const dispatch = useDispatch()
    const foto = localStorage.getItem('foto')

    const movieImages = [
        'https://i0.wp.com/elplanetaurbano.com/wp-content/uploads/2023/04/super-mario-planeta-urbano-00.png?resize=1250%2C781&ssl=1',
        'https://quadernillos.com/wp-content/uploads/2023/07/Imagen-destacada-WP-1024x593.png',
        'https://tierragamer.com/wp-content/uploads/2022/12/Peliculas-Marvel-DC-2023-01.jpg',
        'https://i0.wp.com/elplanetaurbano.com/wp-content/uploads/2023/04/super-mario-planeta-urbano-00.png?resize=1250%2C781&ssl=1',
        // Agrega más URLs de imágenes aquí
    ];

    useEffect(() => {
        localStorage.setItem('profileImage', profileImage);
    }, [profileImage]);

    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setProfileImage(storedImage);
        }
    }, []);

    useEffect(() => {
        dispatch(todosLosProductosXidUser(2))
    }, [])

    const productos = useSelector(state => state.productosComprados)
    console.log(productos)

    const movies = productos.peliculas || []

   const series = productos.series || []



    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        localStorage.setItem('alias', alias);
        localStorage.setItem('name', name);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);
        localStorage.setItem('country', country);

        setIsEditing(false); // Salir del modo de edición
        alert('Datos guardados exitosamente');
    };

    const handleImageChange = (e) => {
        const newImage = URL.createObjectURL(e.target.files[0]);
        setProfileImage(newImage);
    };

    return (
        <div>
            <Navbar />
            <div className='profile-container'>
                <h1 className='titlePerf'>Perfil</h1>
                <div className='profile-info'>
                    <label>
                        <img
                            className={`profile-image ${isEditing ? 'editable' : ''}`}
                            src={foto ? foto : "https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png" }
                            alt='Profile'
                            onClick={isEditing ? () => document.getElementById('profile-image-input').click() : null}
                        />
                        {isEditing && (
                            <input
                                type='file'
                                id='profile-image-input'
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        )}
                    </label>

                    <div className='containerInputs'>
                        <h5>Alias</h5>
                        <input
                            type='text'
                            placeholder='Alias'
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            disabled={!isEditing}
                        />
                        <h5>Nombre</h5>
                        <input
                            type='text'
                            placeholder='Nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                        />
                        <h5>Apellido</h5>
                        <input
                            type='text'
                            placeholder='Apellido'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={!isEditing}
                        />
                        <h5>Telefono</h5>
                        <input
                            type='text'
                            placeholder='Telefono'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                        />
                        <h5>Email</h5>
                        <input
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />
                        <h5>Pais o region</h5>
                        <input
                            type='text'
                            placeholder='Pais o region'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            disabled={!isEditing}
                        />
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
                    <div className='container-compras'>
                        <h1 className='conth1'>Mis Compras</h1>
                        <div className='purchase-carousel'>
                        {movies.length > 0 && movies.map((purchase) => (
                            <div key={purchase.id} className='purchase-card'>
                                <Link to={`/moviesdetail/${purchase.id}`}>
                                    <img src={purchase.image} />
                                    <h3>{purchase.name}</h3>
                                    <p>Costo: ${purchase.price}</p>
                                    <p>Pelicula</p>
                                    </Link>
                                </div>
                            ))}
                        {series.length > 0 &&series.map((purchase) => (
                                <div key={purchase.id} className='purchase-card'>
                                    <Link to={`/detailSeries/${purchase.id}`}>
                                    <img src={purchase.image} />
                                    <h3>{purchase.name}</h3>
                                    <p>Costo: ${purchase.price}</p>
                                    <p>Serie</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;






































