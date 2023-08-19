import React, { useState } from 'react';
import Card from '../../components/CardHome/CardHome'; // Ajusta la ruta a tu ubicación
import allCardsData from './allCardsData'; // Supon

const Favorite = () => {
    const [favoriteCards, setFavoriteCards] = useState([]);

    const handleToggleFavorite = (id) => {
        if (favoriteCards.includes(id)) {
            setFavoriteCards(favoriteCards.filter(cardId => cardId !== id));
        } else {
            setFavoriteCards([...favoriteCards, id]);
        }
};

    const favoriteCardsToShow = allCardsData.filter(card => favoriteCards.includes(card.id));

    return (
        <div>
            {favoriteCardsToShow.map(card => (
                <Card
                    key={card.id}
                    image={card.image}
                    id={card.id}
                    price={card.price}
                    name={card.name}
                    isFavorite={true}
                    onToggleFavorite={() => handleToggleFavorite(card.id)}
                />
            ))}
        </div>
    );
};



export default Favorite
