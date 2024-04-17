import {useContext,useEffect} from 'react'
import mainContext from '../../context/mainContext';
import {useLocation,useNavigate } from "react-router-dom";


const TableStandingsIndex = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const {standings,getStandings,getTournamentStandings,tournament,getTournament}= useContext(mainContext)
    useEffect(() => {
        if(location.state !== null){
            let id = location.state.tournaId;
                getTournamentStandings(id);
                getTournament(id)
            }else{
                getStandings();
            }
    },[]);

    const addGameToTournament= (id)=>{
        navigate('/games/create', {
            state: {
              tournaId: id,
            }
          });
    };
    const tournaGames= (id)=>{
        navigate('/games', {
            state: {
              tournaId: id,
            }
          });
    };
    const handleEndTournament = (standings,tourna_id)=>{

        navigate('/tournament_winner', {
            state: {
              winner: standings[0],
              tournament:tournament,
            }
          });
          
    }
  return (
            <div className='m-2'>

        {/*  */}

            {(location.state === null)?
                    "":
                    <div className="flow-root  mb-2">
                        <div className="float-left justify-center font-bold p-2 text-xl">{tournament['t_name']}</div>
                        <button onClick={()=> tournaGames(location.state.tournaId)} className='float-right inline-block rounded-r p-3 text-sm font-semibold text-white m-2 mr-0 bg-dark_yellow'>Tournament Games</button>
                        <button onClick={()=> addGameToTournament(location.state.tournaId)} className='float-right inline-block rounded-r p-3 text-sm font-semibold text-white m-2 mr-0 bg-lime_dark'>Add New Game to this Tournament</button>
                        {/* <button onClick={()=> tournaGames(location.state.tournaId,standings)} className='float-right inline-block rounded-r p-3 text-sm font-semibold text-white m-2 mr-0 bg-purple-600'>End Tournament</button> */}

                    </div>
            }


            {/* flowbite table */}
                <div className="relative overflow-x-auto flex">
                <div>
                    <img className="w-96 " src={tournament['t_image_name']} alt="tournament poster" />
                    <button onClick={()=> handleEndTournament(standings,tournament['id'])} className='block w-full p-3 text-sm font-semibold text-white ml-0 bg-purple-400'>End Tournament</button>
                    </div>
                    <table className="ml-2 w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-lime_dark dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-bold text-lg">
                                   Players
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Points
                                </th> 
                                <th scope="col" className="px-6 py-3">
                                    Games Played
                                </th> 
                                <th scope="col" className="px-6 py-3">
                                    Wins
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Losses
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Draws
                                </th> 
                                <th scope="col" className="px-6 py-3">
                                    GD
                                </th> 

                            
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((standing)=>{
                                return <tr key = {standing.id} className="odd:bg-white even:bg-slate-50">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-lime_dark dark:text-white">
                                    <span className='text-lg'>{standing.player['player_alias']}</span><span className='text-sm p-1'>({standing.player['player_name']})</span>
                                </th>
                                <td className="px-6 py-4">
                                    {standing.points}
                                </td>
                                <td className="px-6 py-4">
                                    {standing.games_played}
                                </td>
                                <td className="px-6 py-4">
                                    {standing.win}
                                </td>
                                <td className="px-6 py-4">
                                    {standing.loss}
                                </td>
                                <td className="px-6 py-4">
                                    {standing.draw}
                                </td>
                                <td className="px-6 py-4">
                                    {standing.gd}
                                </td>
                                
                            </tr>

                            })}
                        </tbody>
                    </table>
                </div>

        </div>
  )
}

export default TableStandingsIndex