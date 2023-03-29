import React from "react";
import "../css/Card.css"
import backPNG from "../img/back.png";


export default function Card({ card, clickCallee, flipped, disabled }) {
    function clickCaller() {
        clickCallee(card)
    }
    return (
        <div className={`card ${card.matched ? 'flipped' : ''}`} key={card.id}>
            <div className={flipped ? "flipped" : ""}>
                <div>
                    <img className="frontOfCard" src={card.src} alt="front"/>
                    <img className="backOfCard" src={backPNG} onClick={clickCaller} alt="back"/>
                </div>
            </div>
        </div>
    );
}
  
