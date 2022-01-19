import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Continents from "./screens/Continents";
import Countries from "./screens/Countries";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/country' element={<Countries />} />
        <Route path='/continent' element={<Continents />} />
      </Routes>
    </Router>
  );
};

export default App;
