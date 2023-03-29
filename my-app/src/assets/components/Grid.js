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
    const [pairs, setPairs] = useState(0)


    const cardImages = [australiaPNG, brazilPNG, canadaPNG, chinaPNG, russiaPNG, usPNG];

    //Shuffle and duplicate all of the cards that will be displayed on the grid
    function newGame() {
        const finalCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((src) => ({ src, id: Math.random(), matched: false }))
        setFirstChoice(null)
        setSecondChoice(null)
        setCards(finalCards)
        setTries(0)
        setPairs(0)
    }
    
    //Check choices
    function clickCallee(card) {
        if (firstChoice && secondChoice && !card.matched) {
            return;
        }
        if (firstChoice !== card && !card.matched) {
          if (firstChoice) {
            setSecondChoice(card);
          } else {
            setFirstChoice(card);
          }
        }
    }
      

    //Card choice comparison
    useEffect(() => {
        if (firstChoice && secondChoice) {
            if(firstChoice.src === secondChoice.src) {
                setCards(previous => {
                    return previous.map(card => {
                        if(card.src === firstChoice.src || card.src === secondChoice.src) {
                            return {...card, matched: true}
                         } 
                        else {
                            return card
                      }
                    })
                  })
                setPairs(pairs+1)                  
                nextTurn()
            }
            else {
                setTimeout(() => nextTurn(), 1000)
            }
        }
        
    }, [firstChoice, secondChoice])

    function nextTurn() {
        cards.forEach(card => {
          card.isFlipped = false; // Reset the "isFlipped" flag for each card
        });
        setFirstChoice(null);
        setSecondChoice(null);
        setTries(tries+1);
    }


    //This useEffect displays the final message
    useEffect( () => {
        if(pairs == 6) {
            setTimeout(() => {
                const finalMessage = `CONGRATULATIONS! You finished my memory game in ${tries} tries.`;
                if (window.confirm(finalMessage)) {
                  newGame();
                }
              }, 500);
        }
    }, [tries, pairs])

      
    //Automatically start a new game
    useEffect( () => {
        newGame()
    }, [])



    return (
        <div>
            <button onClick={newGame}>NEW GAME</button>
            <p><b>Current tries: {tries}</b></p>
            <div className="Grid">
                {cards.map(card =>
                    <Card key={card.id} card={card} clickCallee={clickCallee} flipped={card === firstChoice || card === secondChoice || card.matched}/>
                )}
            </div>

        </div>
    );
}

export default Grid;
