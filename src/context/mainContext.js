import {createContext,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


axios.defaults.baseURL = "http://localhost:8000/api/v1/";

const mainContext = createContext();


export const MainProvider=({children})=>{
    
    const navigate = useNavigate();
    const initialFormValues = {
        name:"",
        slug:""
      }

      const initialFormValuesPlayers = {
        player_name:"",
        player_alias:""
      }



     const [formvalues,setFormvalues]= useState(initialFormValues);
     const [playerformvalues,setPlayerFormvalues]= useState(initialFormValuesPlayers);

      const [skills,setSkills]= useState([])
      const [players,setPlayers]= useState([])
      const[winnerHistory,setWinnerHistory]= useState([])

      const [games,setGames]= useState([])
      const [standings,setStandings]= useState([])
      const [tournaments,setTournaments]= useState([])


      const [skill,setSkill]= useState([])
      const [player,setPlayer]= useState([])
      const [tournament,setTournament]= useState([])
      //const [gameScores,setGameScores]= useState({})

      const initialGameValues = {
        gameId:"",
        player_one_id:"",
        player_one_score:"",
        player_two_id:"",
        player_two_score:"",
        player_one_alias:"",
        player_two_alias:"",
        tournament_id:"",

      }
      const [game,setGame]= useState(initialGameValues)


      
      const [errors,setErrors]= useState({})

        const getSkills = async ()=>{
        const apiSkills = await axios.get('skills');
        setSkills(apiSkills.data.data)
        }
        const getPlayers = async ()=>{
        const apiPlayers = await axios.get('players');
        setPlayers(apiPlayers.data.data)
        }
        const getGames = async ()=>{
            const apiGames = await axios.get('games');
            setGames(apiGames.data.data)
        }
        const getTournamentGames = async (id)=>{
            const apiGames = await axios.get('tournament_games/'+id);
            setGames(apiGames.data.data)
        }

        const getStandings = async ()=>{
            const apiStandings = await axios.get('standings');
            setStandings(apiStandings.data.data)
        }
        const getTournamentStandings = async (id)=>{
            const apiGames = await axios.get('tournament_standings/'+id);
            setStandings(apiGames.data.data)
        }

        const getTournaments = async ()=>{
            const apiTournaments = await axios.get('tournaments');
            setTournaments(apiTournaments.data.data)
        }




        const getSkill = async (id)=>{
            const response = await axios.get('skills/'+ id);
            const apiSkill= response.data.data
            setSkill(apiSkill)
            setFormvalues({
                name : apiSkill.skillName,
                slug : apiSkill.slug
            })

        }

        const getGame = async (id)=>{
            const response = await axios.get('games/'+ id);
            const apiGame= await response.data.data
            //console.log(apiGame);
            setGame({
                gameId:id,
                player_one_id:apiGame.player_one['id'],
                player_one_score:apiGame.player_one_score,
                player_two_id:apiGame.player_two['id'],
                player_two_score:apiGame.player_two_score,
                player_one_alias:apiGame.player_one['player_alias'],
                player_two_alias:apiGame.player_two['player_alias'],
                tournament_id:apiGame.tournament['id'],
            })

        }

        const getPlayer = async (id)=>{
            const response = await axios.get('players/'+ id);
            const apiPlayer= response.data.data
            setPlayer(apiPlayer)
            setPlayerFormvalues({
                player_name : apiPlayer.player_name,
                player_alias : apiPlayer.player_alias
            })

        }
        const getWinnerHistory = async (player_id,tourna_id)=>{
            const response = await axios.get('player-history/'+ player_id +'/'+ tourna_id);
            const apiPlayer = response.data.data
            console.log('getwinner',apiPlayer);

            setWinnerHistory(apiPlayer)
            console.log('getwinner',apiPlayer);
        }
        const getTournament = async (id)=>{
            const response = await axios.get('tournaments/'+ id);
            const apiTournament= response.data.data
            setTournament(apiTournament)
        }

        const onChangeHandler= (e)=>{
            const {name,value} = e.target;
            setFormvalues({...formvalues,[name]:value})
            }
        const onChangeHandlerPlayerForm= (e)=>{
            const {name,value} = e.target;
            setPlayerFormvalues({...playerformvalues,[name]:value})
            }

        const storeSkill= async (e)=>{
            e.preventDefault();
            try {
                await axios.post('skills',formvalues)
                setFormvalues(initialFormValues);
                navigate("/skills");
            } catch (error) {
                if(error.response.status===422){
                    setErrors(error.response.data.errors);
                }
            }
        }
        const storePlayer= async (e)=>{
            e.preventDefault();
            try {
                await axios.post('players',playerformvalues)
                setPlayerFormvalues(initialFormValuesPlayers);
                navigate("/players");
            } catch (error) {
                if(error.response.status===422){
                    setErrors(error.response.data.errors);
                }
            }
        }


        const updateSkill = async(e)=>{
            e.preventDefault();
            try {
                await axios.put('skills/'+ skill.id,formvalues);
                setFormvalues(initialFormValues);
                navigate("/skills");
                
            } catch (error) {
                if(error.response.status===422){
                    setErrors(error.response.data.errors);
                }
            }
        }
        const updatePlayer = async(e)=>{
            e.preventDefault();
            try {
                await axios.put('players/'+ player.id,playerformvalues);
                setPlayerFormvalues(initialFormValuesPlayers);
                navigate("/players");
                
            } catch (error) {
                if(error.response.status===422){
                    setErrors(error.response.data.errors);
                }
            }
        }

        const updateGame = async (gameScores)=>{
           
            //console.log('my game scores',gameScores.game_id)

            try {
                await axios.put('games/'+ gameScores.game_id,gameScores);
                navigate('/games', {
                    state: {
                      tournaId: gameScores.tournament_id,
                    }
                  });
                
            } catch (error) {
                if(error.response.status===422){
                    setErrors(error.response.data.errors);
                   // console.log(errors)
                }
            }
        }


        const deleteSkill = async (id)=>{
            if(!window.confirm("Are You Sure?")){
                return;
            }
            await axios.delete("skills/"+ id);
            getSkills();
        }
        const deletePlayer = async (id)=>{
            if(!window.confirm("Are You Sure?")){
                return;
            }
            await axios.delete("players/"+ id);
            getPlayers();
        }
        const PostScores = async (scores,tid)=>{

        
            try {
                const response = await axios.post('games',scores)

                console.log(response.data.data);
                navigate('/games', {
                    state: {
                      tournaId: tid,
                    }
                  });
            } catch (error) {
                if(error.response.status===422){
                    setErrors(error.response.data.errors);
                }
            }

        }

        

    return <mainContext.Provider value={{ 
        skill,
        skills,
        getSkill,
        getSkills, 
        onChangeHandler,
        formvalues,
        playerformvalues,
        storeSkill,
        storePlayer,
        errors,
        setErrors,
        updateSkill,
        updatePlayer,
        deleteSkill,
        players,
        player,
        getPlayers,
        getPlayer,
        deletePlayer,
        onChangeHandlerPlayerForm,
        PostScores,
        games,
        getGames,
        standings,
        getStandings,
        tournaments,
        getTournaments,
        getTournamentGames,
        getTournamentStandings,
        tournament,
        getTournament,
        game,
        getGame,
        setGame,
        updateGame,
        getWinnerHistory,
        winnerHistory,
        setWinnerHistory
        }}>{children}</mainContext.Provider>
}

export default mainContext