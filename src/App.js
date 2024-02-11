import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import CreateCourse from './components/CreateCourse';
import ViewCourses from './components/ViewCourses';
import LoginForm from './components/Login';
import Home from './components/navigation';

const App = () => {
  return (
    <div className="page">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<ViewCourses />} />
          <Route path="/createcourse" element={<CreateCourse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
