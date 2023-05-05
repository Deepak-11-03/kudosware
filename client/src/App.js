import './App.css';
import Header from './Components/HeaderComponent.js/Header';
import { Routes,Route } from 'react-router-dom';
import Home from './Components/Home';
import Form from './Components/FormComponents/Form';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/signup' element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
