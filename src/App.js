import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard'
import AddTrash from './components/AddTrash';
import Cluster from './components/Cluster';
import ClearTrash from './components/ClearTrash';

function App() {
  return (
     <BrowserRouter>
        <Routes>
           <Route element={<Dashboard/>} path="/"/>
           <Route element={<AddTrash/>} path="/addtrash"/>
           <Route element={<ClearTrash/>} path="/cleartrash"/>
           <Route element={<Cluster/>} path="/cluster"/>
            
        </Routes>
     </BrowserRouter>
  );
}

export default App;
