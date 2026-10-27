import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Users from './components/Users'
import Notes from './components/Notes'

function App() {

  
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">users</Link>
        <Link to="/notes">notes</Link>
      </nav>
      
      <main>
        <Routes>
          <Route path='/'  element={<Home />}/>
          <Route path='/users' element={<Users  />}/>
          <Route path='/notes' element={<Notes  />}/>
        </Routes>
      </main>
      <footer></footer>
    </Router>
  )
}

export default App
