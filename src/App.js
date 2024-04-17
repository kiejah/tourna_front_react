import {useRef, useEffect} from 'react';
import { Route, Routes,Link } from "react-router-dom";
//Tournaments
import Home from "./components/Home";
import CreateTournament from "./components/tournament/CreateTournament";
import EditTournament from "./components/tournament/EditTournament";

import { MainProvider } from "./context/mainContext";

//players
import PlayerCreate from "./components/players/PlayerCreate";
import PlayerIndex from "./components/players/PlayerIndex";
import PlayerEdit from "./components/players/PlayerEdit";

//games
import GameIndex from "./components/games/GameIndex";
import GameEdit from "./components/games/GameEdit";
import GameCreate from "./components/games/GameCreate";
//standings
import TableStandingsIndex from "./components/standings/TableStandingsIndex";
import TableStandingsWinner from './components/standings/TableStandingsWinner';

import Footer from './components/Footer/Footer';




function App() {
  const ref = useRef(null);

  useEffect(() => {
    
    window.onclick = (event) => {
      if (event.target.contains(ref.current)
        && event.target !== ref.current) {
        console.log(event)
      } 
    }
  }, []);

 

  return (
    <MainProvider>
      <div className="bg-slate-200 ">
      <div className="max-w-full mx-auto min-h-screen">
        <nav>
          <ul className="flex p-2 mb-4 bg-slate-700">
            <li  className=" m-2 p-2 hover:border-b-4 border-dark_yellow text-white">
              <Link ref={ref} to="/">Home</Link>
            </li>
            {/* <li className="m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white ">
              <Link to="/skills">Skills</Link>
            </li> */}
            <li className="m-2 p-2 hover:border-b-4 border-dark_yellow text-white ">
              <Link ref={ref} to="/players">Players</Link>
            </li>
            <li ref={ref} className="m-2 p-2 hover:border-b-4 border-dark_yellow text-white ">
              <Link ref={ref} to="/games">Games</Link>
            </li>
            <li className="m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white ">
              <Link to="/tournament_winner">Standings Winner</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* Tournaments */}
          <Route path="/" element={<Home />} />
          <Route path="/tournaments/create" element={<CreateTournament />} />
          <Route path="/tournaments/:id/edit" element={<EditTournament />} />

          {/* players */}
          <Route path="/players" element={<PlayerIndex />} />
          <Route path="/players/create" element={<PlayerCreate />} />
          <Route path="/players/:id/edit" element={<PlayerEdit />} />
          {/* Games */}
          <Route path="/games" element={<GameIndex />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/games/:id" element={<GameEdit />} />
          {/* Standings */}
          <Route path="/standings" element={<TableStandingsIndex />} />
          <Route path="/tournament_winner" element={<TableStandingsWinner />} />
        </Routes>
      </div> 
      <Footer/>
           
    </div>

    </MainProvider>
    
  );
}

export default App;
