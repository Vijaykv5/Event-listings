import { Routes, Route } from "react-router-dom"
import CreateEvent from "./components/CreateEvent"
import EventListing from "./components/EventListing"
import { EventProvider } from "./context/EventContext"

function App() {
  return (
    <EventProvider>
      <Routes>
        <Route path="/" element={<CreateEvent />} />
        <Route path="/events" element={<EventListing />} />
      </Routes>
    </EventProvider>
  );
}

export default App;
