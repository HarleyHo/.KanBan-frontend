import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import User from "./components/User/User";
import EventBar from "./components/Event/EventBar";
import { CurrentEventIdContext } from "./contexts/EventContext";

function App() {
  const [users, setUsers] = useState([]);
  const [currentEventId, setCurrentEventId] = useState(0);

  return (
    <>
      <UserContext.Provider value={{ users, setUsers }}>
        <User />
        <CurrentEventIdContext.Provider
          value={{ currentEventId, setCurrentEventId }}
        >
          <EventBar />
          <Board />
        </CurrentEventIdContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
