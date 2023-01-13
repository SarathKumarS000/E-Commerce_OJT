import './App.css';
import Welcome from './Components/Welcome'
import MyProfile from './Components/MyProfile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Welcome/>
      <Router>
        <Routes>
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;