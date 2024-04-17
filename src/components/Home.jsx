import {useContext,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom";
import mainContext from '../context/mainContext';

const Home = () => {
    const navigate = useNavigate()

    const {tournaments,getTournaments}= useContext(mainContext)
    useEffect(() => {
        getTournaments();
    },[]);

    const handleGames= (id)=>{
        navigate('/games', {
            state: {
              tournaId: id,
            }
          });
    }
    const handleStandings= (id)=>{
      navigate('/standings', {
          state: {
            tournaId: id,
          }
        });
  }
  return (
    <div className='m-2'>
        <div className="flex justify-end p2 mb-2">
            <Link to="/tournaments/create" className="px-4 py-2 bg-lime_dark hover:bg-indigo-700 text-white">New Tournament</Link>
        </div>
            {/* flowbite table */}
            <div className="relative overflow-x-auto flex flex-wrap justify-between">
            {/* <div className="grid grid-cols-3 col-end-7"> */}
                
                    {tournaments.map((tournament)=>{
                        return <div key={tournament.id} className="max-w-sm rounded overflow-hidden shadow-lg mb-6">
                        <img className="w-full" src={tournament.t_image_name} alt="Sunset in the mountains" />
                        <div className="px-6 py-4">
                          <div className="font-bold text-xl mb-2">{tournament.t_name}</div>
                          <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                          </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                         Tournament Prize : <span className='text-xl font-bold px-4'>{tournament.t_prize}</span>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                          <button onClick={()=> handleStandings(tournament.id)} className='inline-block rounded-full px-5 py-2 text-sm font-semibold text-white mr-2 mb-3 bg-dark_yellow'>#Standings</button>
                          <button onClick={()=> handleGames(tournament.id)} className='inline-block rounded-full px-5 py-2 text-sm font-semibold text-white mr-2 mb-3 bg-hash_games'>#Games</button>
                          <span className="inline-block rounded-full px-5 py-2 text-sm font-semibold text-white mr-2 mb-3 bg-lime"> #{tournament.status}</span>
                          
                        </div>
                      </div>

                      })}
            </div>

    </div>
  )
}

export default Home