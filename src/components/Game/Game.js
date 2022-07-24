import React, { useEffect, useState } from 'react'
import './Game.css'
import helmet from '../../images/helmet-1.png'
import potion from '../../images/potion-1.png'
import ring from '../../images/ring-1.png'
import shield from '../../images/shield-1.png'
import scroll from '../../images/scroll-1.png'
import sword from '../../images/sword-1.png'
import Card from './Card/Card'
const cardImages = [
    {"src":helmet,matched:false},
    {"src":potion,matched:false},
    {"src":ring,matched:false},
    {"src":shield,matched:false},
    {"src":scroll,matched:false},
    {"src":sword,matched:false},
]
const Game = () => {
  const [cards , setCards] = useState([])
  const [turns , setTurns] = useState(0)
  const[choiceOne,setChoiceOne] = useState(null)
  const[choiceTwo,setChoiceTwo] = useState(null)
  const[disabled ,setDisabled] = useState(false)
//   Shuffle cards
  const shuffleCards =()=>{
    const shuffledCards =[...cardImages,...cardImages]
    .sort(()=>Math.random - 0.5)
    .map((card)=>({...card,id:Math.random()
    }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
// Handle choice
  const handleChoice = (card)=>{
       choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
//   Compare two cards

useEffect(()=>{
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
        setCards(prevCards =>{
            return prevCards.map((card)=>{
                if(card.src === choiceOne.src){
                    return {...card , matched: true} 
                }
                return card
            })
        })
       setTimeout(()=> resestTurn(),1000)
    }
    else{
   resestTurn()
    }
  }
},[choiceOne,choiceTwo])
//   Reset Choice and increase turns 
const resestTurn =()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
}
useEffect(()=>{
  shuffleCards()
},[])
  return (
    <>
      <div className='parent'>
        <h1>Magic</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className='card-grid'>
            {
                cards.map((card)=>{
                    return(
                     <Card 
                     card={card} 
                     handleChoice={handleChoice}
                     flipped = {card === choiceOne || card === choiceTwo || card.matched}
                     disabled={disabled}
                     key={card.id}/>
                    )
                })
            }
        </div>
      <p style={{color:"#fff",margin:"20px 0"}}>Turns: {turns}</p>
      </div>
     
    </>
  )
}

export default Game

