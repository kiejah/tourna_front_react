import React, {useContext,useEffect} from 'react'
import {useLocation} from "react-router-dom";
import mainContext from '../../context/mainContext';


function TableStandingsWinner() {
    const location = useLocation();
    const {games,getGames}= useContext(mainContext);
    //const winnerGames = games.filter(game => game.)
    useEffect(() => {
          getGames();  
  },[]);
  const winnerGames = games.map(game=> game).filter(winner => (winner.player_one['id']=== location.state.winner.player['id'] || winner.player_two['id']===location.state.winner.player['id']));
  return (
    <div className="container mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">{ (location.state!=null)?
        <>

        <h3>Winner!!!</h3>

        <label>Name: <span className="font-bold"> {location.state.winner.player['player_name']} </span></label><br/>
        <label>Alias: <span className="font-bold"> {location.state.winner.player['player_alias']} </span></label><br/>
        <ul>
        <li>Points: <span className="font-bold"> {location.state.winner.points} </span></li>
        <li>Games Won: <span className="font-bold"> {location.state.winner.win} </span></li>
        <li>Games Lost: <span className="font-bold"> {location.state.winner.loss} </span></li>
        <li>Games drawn: <span className="font-bold"> {location.state.winner.draw} </span></li>
        <li>Goal Difference: <span className="font-bold"> {location.state.winner.gd} </span></li>
        <li>Number of Games Played: <span className="font-bold"> {location.state.winner.games_played} </span></li>
        </ul>

        <h2 className="font-bold">{location.state.winner.player['player_name']} Tournament History</h2>
        <div>
          {winnerGames.map((winner)=>{
            return <ul className='flex'>
              <li className='p-2 mr-2'>{winner.player_one['player_name']}</li>
              <li className='p-2 mr-2'>{winner.player_one_score}</li>
              <li className='p-2 mr-2'>{winner.player_two['player_name']}</li>
              <li className='p-2 mr-2'>{winner.player_two_score}</li>
            </ul>
          })}
          </div>
          

          
      

        </>

        :""}</div>
  )
}

export default TableStandingsWinner