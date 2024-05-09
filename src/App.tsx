import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import './App.css';
import HomePage from './HomePage/HomePage';
import QuestionnairePage from './QuestionnairePage/QuestionnairePage';
import PrivateRouter from './PrivateRouter';
import { Fragment } from 'react/jsx-runtime';


function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}/>
          <Route path='/quest' element={<QuestionnairePage></QuestionnairePage>}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
