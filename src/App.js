import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Observation from './pages/Observation'
import Destination from './pages/Destination'
import SiteHeader from './components/SiteHeader';


function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/destination/:id" element={<Destination />} />
          <Route path="/observation/:id" element={<Observation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
