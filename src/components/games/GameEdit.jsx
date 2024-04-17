import {useContext,useEffect,useState} from 'react'
import mainContext from '../../context/mainContext';
import {Link,useLocation,useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const GameEdit = () => {
  const navigate = useNavigate();
  //let tournamentId='';
  const location = useLocation();
  // if(location.state !== null){
  //   tournamentId = location.state.tournaId;
  // }

  const {game,getGame,games,getGames,updateGame,setErrors}= useContext(mainContext);
  const {id} = useParams();


const [playerOneId, setPlayerOneId] = useState(0);
const [playerTwoId, setPlayerTwoId] = useState(0);
const [players,setPlayers]=useState('');

const [playerOneScore, setPlayerOneScore] = useState('');
const [playerTwoScore, setPlayerTwoScore] = useState('');

  useEffect(()=>{
    getGame(id);
    getGames()
  },[players])


  const playerOneSelectHandler=(event)=>{
    setPlayerOneId(event.target.value)
  }

  const playerOneScoreHandler=(event)=>{
    setPlayerOneScore(event.target.value)

  }

  const playerTwoSelectHandler=(event)=>{
    setPlayerTwoId(event.target.value)
  }
  const playerTwoScoreHandler=(event)=>{
    setPlayerTwoScore(event.target.value)
  }

  const updateGameScores = (e)=>{
    e.preventDefault();
    getGame(id);

    const gameScores={
      game_id:id,
      player_one_id:(playerOneId===0)?game.player_one_id:playerOneId,
      player_one_score:parseInt((playerOneScore==='')?game.player_one_score:playerOneScore),
      player_two_id:(playerTwoId===0)?game.player_two_id:playerTwoId,
      player_two_score:parseInt((playerTwoScore==='')?game.player_two_score:playerTwoScore),
      tournament_id:game.tournament_id
    }
    //console.log(gameScores);
    updateGame(gameScores);
    

  }

    
  return (
    <div className="m-2 flex">
    <div className="w-96 pr-2"><img  alt="tournament poster" /></div>
    <form onSubmit={updateGameScores} className="w-full mx-auto p-4 bg-white shadow-md rounded-sm">
      <div className="space-y-6">
      <div className="flex justify-center font-bold p-2 mb-2 bg-white text-lg"></div>
        <div className="mb-4">
          <label className='block mb-2 text-sm font-medium'>Player One Alias</label>

          <div className='flex'>
          <select 
            className="w-full border border-gray-300 text-gray-900 text-sm p-3" 
            onChange={playerOneSelectHandler}  
            >
              <option value={game.player_one_id}>{game.player_one_alias}</option>
            </select>

          <label htmlFor='player_one_score' className='block mt-1 text-sm font-medium p-2'>Score</label>
          <input name="player_one_score" 
                  placeholder={game.player_one_score}
                  value={playerOneScore}
                  type="number" 
                  className="border border-gray-300 text-gray-900 w-24 text-sm p-2" 
                  onChange={playerOneScoreHandler} />
          </div>
          
        </div>
        <div className="mb-4">
          <label className='block mb-2 text-sm font-medium font-weight-bold'>VS </label>
        </div>
        <div className="mb-4">
          <label className='block mb-2 text-sm font-medium'>Player Two Alias </label>
            <div className='flex'>
            <select 
            className="w-full border border-gray-300 text-gray-900 text-sm p-3"
            onChange={playerTwoSelectHandler}
              >
              <option value={game.player_two_id}>{game.player_two_alias}</option> 
              </select>
            {/* {errors.player_alias && <span className='text-sm text-red-400'>{errors.player_alias[0]}</span>} */}
            <label htmlFor='player_two_score' className='block mt-1 text-sm font-medium p-2'>Score</label>
            <input name="player_two_score" 
                  value={playerTwoScore}
                  placeholder={game.player_two_score}
                  type="number" 
                  className="border border-gray-300 text-gray-900 w-24 text-sm p-2" 
                  onChange={playerTwoScoreHandler}/>
            </div>
        </div>
      </div>
    <div className="my-4">
      <button className="mt-2 px-4 py-2 bg-green-500 hover:bg-indigo-700 text-white rounded-md">Update Score</button>
      <button className="m-2 px-4 py-2 bg-dark_yellow hover:bg-indigo-700 text-white rounded-md">Back</button>

    </div>

    </form>

  </div>
  )
}

export default GameEdit