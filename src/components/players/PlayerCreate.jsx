import {useContext,useEffect} from 'react'
import mainContext from '../../context/mainContext';


const PlayerCreate = () => {
  const {playerformvalues,onChangeHandlerPlayerForm,storePlayer,errors,setErrors}= useContext(mainContext);
  useEffect(()=>{
    setErrors({});
  },[])

  return (
    <div className='m-2'>
    <form onSubmit ={storePlayer} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
      <div className="space-y-6">
        <div className="mb-4">
          <label htmlFor='player_name' className='block mb-2 text-sm font-medium'>Player Name</label>
          <input name="player_name" value={playerformvalues['player_name']} onChange={onChangeHandlerPlayerForm} type="text" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.player_name && <span className='text-sm text-red-400'>{errors.player_name[0]}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor='player_alias' className='block mb-2 text-sm font-medium'>Player Alias</label>
          <input name="player_alias" value={playerformvalues['player_alias']} onChange={onChangeHandlerPlayerForm} type="text" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.player_alias && <span className='text-sm text-red-400'>{errors.player_alias[0]}</span>}

        </div>
      </div>
    <div className="my-4">
      <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Save Player</button>
    </div>

    </form>

  </div>
  )
}

export default PlayerCreate