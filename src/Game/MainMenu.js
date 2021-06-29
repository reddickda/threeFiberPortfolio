import React, { useEffect } from "react";

export function MainMenu( { gameStart, setGameStart } ) {

    useEffect(() => {
     let button = document.getElementById("startButton");
  
      button.onclick = () => {
        setGameStart(false);
      }
    });
      
    //once game is started - disable menu css
      let display = null; 
      if(!gameStart) {
        display = "none";
      }
      return(
      <section style={{position:'absolute', left:'20%', top:'40%', zIndex:999, display:display, opacity:'1', alignContent:'center'}}>
        <h1 style={{color:'white'}}>Help Akkrusky get to the boxes!</h1>
        <p style={{color:'white'}}>Get to each box, careful, they shift every time you get to one!</p>
        <button id="startButton" style={{position:'relative', left:'40'}}>Click to start level</button>
      </section>);
  }