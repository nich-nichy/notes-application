import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import Notes from "./components/Notes";
import Login from './auth/Login';
import SignUp from './auth/Signup';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
