import {useContext,useEffect} from 'react'
import {Link} from "react-router-dom";
import mainContext from '../../context/mainContext';


const PlayerIndex = () => {
    const {players,getPlayers,deletePlayer}= useContext(mainContext)
    useEffect(() => {
        getPlayers();
    },[])
  return (
    <div className='m-2'>
        <div className="flex justify-end p2 mb-2">
            <Link to="/players/create" className="px-4 py-2 bg-lime_dark hover:bg-indigo-700 text-white">New Player</Link>
        </div>
            {/* flowbite table */}
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Player Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Player Alias
                            </th>
                            <th scope="col" className="px-6 py-3">
                              
                            </th>                           
                           
                        </tr>
                    </thead>
                    <tbody>
                    {players.map((player)=>{
                        return <tr key = {player.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {player.id}
                        </th>
                        <td className="px-6 py-4">
                            {player.player_name}
                        </td>
                        <td className="px-6 py-4">
                            {player.player_alias}
                        </td>
                        <td className="px-6 py-4 space-x-2">
                            <Link to={`/players/${player.id}/edit`} className='px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md'>Edit</Link>
                            <button onClick={()=> deletePlayer(player.id)} className='p-2 bg-red-500 hover:bg-red-700 text-white rounded-md'>Delete</button>
                        </td>
                    </tr>

                      })}
                    </tbody>
                </table>
            </div>

    </div>
  )
}

export default PlayerIndex