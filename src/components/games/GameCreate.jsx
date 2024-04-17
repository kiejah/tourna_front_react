import {useContext,useEffect,useState} from 'react'
import {Link,useLocation,useNavigate } from "react-router-dom";

import mainContext from '../../context/mainContext';

const GameCreate = () => {
  let tournamentId='';
  const location = useLocation();
  const navigate = useNavigate();
    if(location.state !== null){
      tournamentId = location.state.tournaId;
    }


    const [optionDefaultValue, setOptionDefaultValue] = useState('');
    const [playerOnevalue, setPlayerOneValue] = useState(0);
    const [playerTwovalue, setPlayerTwoValue] = useState(0);

    const [playerOneScore, setPlayerOneScore] = useState(undefined);
    const [playerTwoScore, setPlayerTwoScore] = useState(undefined);

    const {players,getPlayers,PostScores,errors,tournament,getTournament}= useContext(mainContext)

    useEffect(() => {
        getPlayers();
        getTournament(tournamentId)
    },[]);


    const playerOneSelectHandler=(event)=>{
      setPlayerOneValue(event.target.value)
    }

    const playerOneScoreHandler=(event)=>{
      setPlayerOneScore(event.target.value)
    }



    const playerTwoSelectHandler=(event)=>{
      setPlayerTwoValue(event.target.value)
    }
    const playerTwoScoreHandler=(event)=>{
      setPlayerTwoScore(event.target.value)
    }
    const tournaGames= (id)=>{
      navigate('/games', {
          state: {
            tournaId: id,
          }
        });
  };

    //post game scores
    const storeGameScores= async (e)=>{
      e.preventDefault();
      const gameScores={
        player_one_id:playerOnevalue,
        player_one_score:playerOneScore,
        player_two_id:playerTwovalue,
        player_two_score:playerTwoScore,
        tournament_id:tournamentId
      }
      if(playerOnevalue===playerTwovalue ){
        alert("Player cannot play against Self")
        return;
      }
      if(playerOneScore ===''|| playerTwoScore===''){
        alert("Score cannot be null for Either Player")
        return;
      }
      console.log(gameScores);
      PostScores(gameScores,tournamentId)
      
  }



    
  return (
    <div className="m-2 flex">
    <div class="w-96 pr-2"><img  src={tournament['t_image_name']} alt="tournament poster" /></div>
    <form onSubmit ={storeGameScores} className="w-full mx-auto p-4 bg-white shadow-md rounded-sm">
      <div className="space-y-6">
      <div className="flex justify-center font-bold p-2 mb-2 bg-white text-lg">{tournament['t_name']}</div>
        <div className="mb-4">
          <label className='block mb-2 text-sm font-medium'>Player One Alias</label>
          <div className='flex'>
          <select className="w-full border border-gray-300 text-gray-900 text-sm p-3"
                onChange={playerOneSelectHandler}
            >   
                <option value={optionDefaultValue}>Select Player One</option>
                {players.map(option => (
                    <option key={option.id} value={option.id}>{option.player_alias}</option>
                ))}
            </select>
          {/* {errors.player_name && <span className='text-sm text-red-400'>{errors.player_name[0]}</span>} */}

          <label htmlFor='player_one_score' className='block mt-1 text-sm font-medium p-2'>Score</label>
          <input name="player_one_score" value={playerOneScore} onChange={playerOneScoreHandler} type="number" className="border border-gray-300 text-gray-900 w-24 text-sm p-2" />
          </div>
          
        </div>
        <div className="mb-4">
          <label className='block mb-2 text-sm font-medium font-weight-bold'>VS </label>
        </div>
        <div className="mb-4">
          <label className='block mb-2 text-sm font-medium'>Player Two Alias </label>
            <div className='flex'>
            <select className="w-full border border-gray-300 text-gray-900 text-sm p-3"
                  onChange={playerTwoSelectHandler}
              >
                  <option value={optionDefaultValue}>Select Player Two</option>
                  {players.map(option => (
                      <option key={option.id} value={option.id}>{option.player_alias}</option>
                  ))}
              </select>
            {/* {errors.player_alias && <span className='text-sm text-red-400'>{errors.player_alias[0]}</span>} */}
            <label htmlFor='player_two_score' className='block mt-1 text-sm font-medium p-2'>Score</label>
            <input name="player_two_score" value={playerTwoScore} onChange={playerTwoScoreHandler} type="number" className="border border-gray-300 text-gray-900 w-24 text-sm p-2" />
            </div>
        </div>
      </div>
    <div className="my-4">
      <button className="mt-2 px-4 py-2 bg-green-500 hover:bg-indigo-700 text-white rounded-md">Submit Scores</button>
      <button onClick={()=> tournaGames(tournamentId)}  className="m-2 px-4 py-2 bg-dark_yellow hover:bg-indigo-700 text-white rounded-md">Back</button>
      {errors.tournament_id && <span className='text-sm text-red-400'><br></br>A game must belong to a Tournament</span>} 

    </div>

    </form>

  </div>
  )
}

export default GameCreate