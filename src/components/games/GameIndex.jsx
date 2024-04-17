import {useContext,useEffect} from 'react'
import {Link,useLocation,useNavigate } from "react-router-dom";
import mainContext from '../../context/mainContext';

const GameIndex = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {games,getGames,getTournamentGames,tournament,getTournament}= useContext(mainContext)

    useEffect(() => {
        if(location.state !== null){
        let id = location.state.tournaId;
            getTournamentGames(id);
            getTournament(id)
            //console.log('tournament',tournament.t_image_name)
        }else{
            getGames();
        }
       
    },[]);
    const addGameToTournament= (id)=>{
        navigate('/games/create', {
            state: {
              tournaId: id,
            }
          });
    };
    const tournaStandings= (id)=>{
        navigate('/standings', {
            state: {
              tournaId: id,
            }
          });
    };
    

    

  return (
    <div className='m-2'>


        {(location.state === null)?
        
        <div className="flex justify-center font-bold p-2 m-2 bg-slate-200 text-lg">All Games for All Tournaments</div>:
       
            <div className="flow-root  mb-2">
            <div className="float-left justify-center font-bold p-2 text-xl">{tournament['t_name']}</div>
            <button onClick={()=> tournaStandings(location.state.tournaId)} className='float-right inline-block rounded-r p-3 text-sm font-semibold text-white m-2 mr-0 bg-dark_yellow'>Tournament Standings</button>
            <button onClick={()=> addGameToTournament(location.state.tournaId)} className='float-right inline-block rounded-r p-3 text-sm font-semibold text-white m-2 mr-0 bg-lime_dark'>Add New Game to this Tournament</button>
            </div>
        }


            {/* flowbite table */}
            <div className="relative overflow-x-auto flex">
                {(location.state !== null)?<div><img className="w-96 pr-2" src={tournament['t_image_name']} alt="tournament poster" /></div>:''}
                <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400" >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Player  Alias
                            </th>
                            <th scope="col" className="px-6 py-3">
                                vs
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Player Alias
                            </th>
                            <th colSpan="2" scope="col" className="px-6 py-3">
                                Game Score
                            </th>
                            <th scope="col" className="px-6 py-3">
                                
                            </th>  
                            {/* <th scope="col" className="px-6 py-3">
                                
                            </th>      
                            */}
                        </tr>
                    </thead>
                    <tbody>
                    {games.map((game)=>{
                        return <tr key = {game.id} className="dark:bg-gray-800 odd:bg-white even:bg-slate-50">

                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap  text-lg">
                            {game.player_one['player_alias']}<span className='p-1 text-xs'>({game.player_one['player_name']})</span>
                        </th>
                        <td className="px-6 py-4">
                            vs
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-lg">
                            {game.player_two['player_alias']}<span className='p-1 text-xs'>({game.player_two['player_name']})</span>
                        </th>
                        <td className="px-6 py-4">
                            {game.player_one_score}
                        </td>
                        <td className="px-6 py-4">
                            {game.player_two_score}
                        </td>
                        <td className="px-6 py-4 space-x-2 flex">
                            <Link to={`/games/${game.id}`} className='px-4 my-4 border-lime_dark text-lime_dark hover:text-lime_dark hover:border-b-4 hover:pb-2 border-lime_dark'>Edit</Link>
                            {/* <button onClick={()=> deletePlayer(player.id)} className='p-2 bg-red-500 hover:bg-red-700 text-white rounded-md'>Delete</button> */}
                        </td>
                        {/* <td className="px-6 py-4 space-x-2">
                            <img class="w-12" src={game.url+"/"+game.tournament['t_image_name']} alt="tournament poster" />
                        </td> */}
                    </tr>

                      })}
                    </tbody>
                </table>
            </div>

    </div>
  )
}

export default GameIndex