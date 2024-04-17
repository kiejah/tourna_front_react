import {useContext,useEffect} from 'react'
import mainContext from '../../context/mainContext';


const SkillCreate = () => {
  const {formvalues,onChangeHandler,storeSkill,errors,setErrors}= useContext(mainContext);
  useEffect(()=>{
    setErrors({});
  },[])
  return (
    <div className='m-2'>
      <form onSubmit ={storeSkill} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
        <div className="space-y-6">
          <div className="mb-4">
            <label htmlFor='name' className='block mb-2 text-sm font-medium'>Skill Name</label>
            <input name="name" value={formvalues['name']} onChange={onChangeHandler} type="text" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
            {errors.name && <span className='text-sm text-red-400'>{errors.name[0]}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor='slug' className='block mb-2 text-sm font-medium'>Skill Slug</label>
            <input name="slug" value={formvalues['slug']} onChange={onChangeHandler} type="text" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
            {errors.slug && <span className='text-sm text-red-400'>{errors.slug[0]}</span>}

          </div>
        </div>
      <div className="my-4">
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Store</button>
      </div>

      </form>

    </div>
  )
}

export default SkillCreate