import React from "react";
import "../css/Card.css"
import backPNG from "../img/back.png";


export default function Card({ card }) {
    return (
        <div className="card" key={card.id}>
            <div>
                <img className="frontOfCard" src={card.src} alt="front"/>
                <img className="backOfCard" src={backPNG} alt="back"/>
            </div>
        </div>
    );
}
