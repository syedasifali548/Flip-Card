import React from "react";
import "./Card.css";
import cover from '../../../images/cover.png'

const Card = ({card,handleChoice,flipped,disabled}) => {
   
   const handleClick=()=>{
    if(!disabled){
      handleChoice(card)
    }

   }
    return (
    <>
      <div className="card" >
        <div className={flipped ? "flipped" : ""}>
          <img className="front" 
          src={card.src}
          alt="back" />
          <img className="back" 
          src={cover} alt="front" 
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
