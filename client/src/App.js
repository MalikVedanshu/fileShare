import {Routes, Route} from 'react-router-dom';
import Uploadfile from './Upload.js';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Uploadfile />}></Route>
            <Route></Route>
            
        </Routes>
    )
}
export default App;