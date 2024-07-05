import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import './App.scss'
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import Content from './Components/Content/Content';
import Cheat from './Components/Cheat/Cheat';

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const NotFound = () => <div>404 Not Found</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:letters" element={<Cheat />}>
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
