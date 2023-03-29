import { useState } from "react";
import Card from "../components/Card.js";
import australiaPNG from "../img/australia.png";
import brazilPNG from "../img/brazil.png";
import canadaPNG from "../img/canada.png";
import chinaPNG from "../img/china.png";
import russiaPNG from "../img/russia.png";
import usPNG from "../img/us.png";


function Grid() {
    const [cards, setCards] = useState([])
    const [tries, setTries] = useState(0)

    const cardImages = [australiaPNG, brazilPNG, canadaPNG, chinaPNG, russiaPNG, usPNG];

    //Shuffle and duplicate all of the cards that will be displayed on the grid
    function newGame() {
        const finalCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((src) => ({ src, id: Math.random() }))
        setCards(finalCards)
        setTries(0)
    }

    return (
        <div>
            <button onClick={newGame}>NEW GAME</button>
            <div className="Grid">
                {cards.map(card =>
                    <Card key={card.id} card={card} />
                )}
            </div>

        </div>
    );
}

export default Grid;
