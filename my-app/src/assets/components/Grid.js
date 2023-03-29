import { useState, useEffect } from "react";
import Card from "../components/Card.js";
import "../css/Grid.css"
import australiaPNG from "../img/australia.png";
import brazilPNG from "../img/brazil.png";
import canadaPNG from "../img/canada.png";
import chinaPNG from "../img/china.png";
import russiaPNG from "../img/russia.png";
import usPNG from "../img/us.png";


function Grid() {
    const [cards, setCards] = useState([])
    const [tries, setTries] = useState(0)
    const [firstChoice, setFirstChoice] = useState(null)
    const [secondChoice, setSecondChoice] = useState(null)


    const cardImages = [australiaPNG, brazilPNG, canadaPNG, chinaPNG, russiaPNG, usPNG];

    //Shuffle and duplicate all of the cards that will be displayed on the grid
    function newGame() {
        const finalCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((src) => ({ src, id: Math.random(), matched: false }))
        setCards(finalCards)
        setTries(0)
    }
    
    //Check choices
    function clickCallee(card) {
        if (firstChoice) {
            setSecondChoice(card);
        } else {
            setFirstChoice(card);
        }
        
    }

    //Card choice comparison
    useEffect(() => {
        if (firstChoice && secondChoice) {
            if(firstChoice.src === secondChoice.src) {
                setCards(previous => {
                    return previous.map(card => {
                        if(cards.src === firstChoice.src) {
                            return {...card, matched: true}
                        }
                        else {
                            return card
                        }
                    })
                })
                nextTurn()
            }
            else {
                setTimeout(() => nextTurn(), 1000)
            }
        }
        
    }, [firstChoice, secondChoice])

    function nextTurn() {
        setFirstChoice(null)
        setSecondChoice(null)
        setTries(tries+1)
    }


    return (
        <div>
            <button onClick={newGame}>NEW GAME</button>
            <p><b>It took you {tries} tries to beat the game.</b></p>
            <div className="Grid">
                {cards.map(card =>
                    <Card key={card.id} card={card} clickCallee={clickCallee} flipped={card === firstChoice || card === secondChoice || card.matched} />
                )}
            </div>

        </div>
    );
}

export default Grid;
