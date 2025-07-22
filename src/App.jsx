import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import EventBar from "./components/Event/EventBar";
import { CurrentEventContext, EventContext } from "./contexts/EventContext";
import Header from "./components/Header/Header";

function App() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState([]);

  return (
    <div className="App">
      <UserContext.Provider value={{ users, setUsers }}>
        <div className="header">
          <Header />
        </div>
        
        <EventContext.Provider value={{ events, setEvents }}>
          <CurrentEventContext.Provider
            value={{ currentEvent, setCurrentEvent }}
          >
            <div className="content">
              <EventBar />
              <Board />
            </div>
          </CurrentEventContext.Provider>
        </EventContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
