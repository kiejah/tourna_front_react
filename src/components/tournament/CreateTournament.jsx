import React,{useState} from 'react'
// import mainContext from '../../context/mainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8000/api/v1/";

const CreateTournament = () => {
  const navigate = useNavigate();
  const [t_name, setT_name] = useState("");
  const [t_prize, setT_prize] = useState("");
  const [t_desc, setT_desc] = useState("");

  const [hasSecondLeg, setHasSecondLeg] = useState(0);
  const [t_image_name, setT_image_name] = useState(null);
  const [errors,setErrors]= useState({})

  const handleTournamentTitleChange = (e) => {
    setT_name(e.target.value);
  };
  const handleImageChange = (e) => {
    setT_image_name(e.target.files[0]);
  };

  const handleSelectedValue=(e)=>{
    setHasSecondLeg(e.target.value)
  }
  const handleTournamentPrizeChange= (e)=>{
    setT_prize(e.target.value)
  }
  const handleTournamentDesc= (e)=>{
    setT_desc(e.target.value)
  }

  const saveTournament = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    

    if(t_name===""){
      alert('Tournament Name is Empty!!');
      return;
    }
    if(t_image_name===null){
      alert('Please select a Poster Image!!');
      return;
    }
    if(hasSecondLeg===0){
      alert('Does the Tournament have a second leg?');
      return;
    }
    if(hasSecondLeg===''){
      alert('Set The tournament Prize');
      return;
    }

    formData.append("t_name", t_name);
    formData.append("t_image_name", t_image_name);
    formData.append("has_second_leg", hasSecondLeg);
    formData.append("t_prize", t_prize);
    formData.append("t_desc", t_desc);

    //console.log(formData);

      try {
        const response = await axios.post("tournaments", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/");
      } catch (errors) {
        //setErrors(errors.response.data.errors);
        console.log(errors);
      }
    
  };



  return (
    <div className='m-2'>
    <form onSubmit ={saveTournament} className="w-6/12 mx-auto p-4 bg-white shadow-md rounded-sm" encType="multipart/form-data">
      <div className="space-y-6">
        <div className="mb-4">
          <label htmlFor='t_name' className='block mb-2 text-sm font-medium'>Tournament Name</label>
          <input name="t_name" 
          type="text" 
          value={t_name}
          onChange={handleTournamentTitleChange}  
          className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {/* {errors.t_name && <span className='text-sm text-red-400'>{errors.t_name[0]}</span>} */}
        </div>
        <div className="mb-4">
          <label htmlFor='t_prize' className='block mb-2 text-sm font-medium'>Tournament Prize</label>
          <input name="t_prize" 
          type="text" 
          value={t_prize}
          onChange={handleTournamentPrizeChange}  
          className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor='t_desc' className='block mb-2 text-sm font-medium'>Tournament Description</label>
          <textarea name="t_desc" 
          value={t_desc}
          onChange={handleTournamentDesc}  
          className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor='t_image_name' className='block mb-2 text-sm font-medium'>Tournament Poster Image</label>
          {/* <input name="t_image_name" type="file" value={tournamentFormValues['t_image_name']} onChange={onChangeHandlerTournamentForm} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" /> */}
          <input
          type="file"
          id="t_image_name"
          name="t_image_name"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
        />
          {errors.t_image_name && <span className='text-sm text-red-400'>{errors.t_image_name[0]}</span>}
        </div>  
        <div className="mb-4">
          <label className='block mb-2 text-sm font-medium'>Does the Tournament have a Second Leg?</label>
          <select className="border border-gray-300 text-gray-900 text-sm p-2 w-full"
            onChange={handleSelectedValue} >
              <option value="0">--Select Second leg option--</option>
              <option value="1">Yes</option>
              <option value="2">No</option>       
          </select>
          </div>

      </div>
    <div className="my-4 flex ">
      <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Save Tournament</button>
      <button onClick={()=> navigate('/')} className="px-4 py-2 bg-orange-500 hover:bg-indigo-700 text-white rounded-md">Cancel</button>
    </div>

    </form>

  </div>
  )
}

export default CreateTournament