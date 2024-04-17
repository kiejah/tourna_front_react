import {useEffect,useContext} from 'react'
import {Link } from "react-router-dom";
import mainContext from '../../context/mainContext';

const Skillindex = () => {
    const {skills,getSkills,deleteSkill}= useContext(mainContext)
    useEffect(() => {
        getSkills();
    },[])
  return (
    <div className='m-2'>
        <div className="flex justify-end p2 mb-2">
            <Link to="/skills/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">New Skill</Link>
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
                                Skill Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                              
                            </th>

                            
                           
                        </tr>
                    </thead>
                    <tbody>
                      {skills.map((skill)=>{
                        return <tr key = {skill.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {skill.id}
                        </th>
                        <td className="px-6 py-4">
                            {skill.skillName}
                        </td>
                        <td className="px-6 py-4">
                            {skill.slug}
                        </td>
                        <td className="px-6 py-4 space-x-2">
                            <Link to={`/skills/${skill.id}/edit`} className='px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md'>Edit</Link>
                            <button onClick={()=> deleteSkill(skill.id)} className='p-2 bg-red-500 hover:bg-red-700 text-white rounded-md'>Delete</button>
                        </td>
                    </tr>

                      })}
                    </tbody>
                </table>
            </div>

    </div>
  )
}

export default Skillindex