import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./loginPage";
import Dashboard from './Dashboard';
import SignupPage from './signUpPage';
import { GlobalStyle } from "./styleComponent";
import AddUser from './components/addUser';
import PrivateRoute from "./protectedRoute";
import Course from "./components/courses/coursesDashboard";
import CourseList from "./components/coursesList";
import AddCourse from "./components/courses/addCourse";

function App() {

  return (
    <Router>
      <GlobalStyle />
      <div className="app">
        {/* <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/coursesList" element={<CourseList />} />
          <Route path="/addCourse" element={<AddCourse />} />
          {/* <PrivateRoute path="/dashboard" component={<Dashboard />} /> */}
          {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute role="admin">
              <Dashboard />
            </PrivateRoute>
          }
        /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>

      </div>

    </Router>
  );
}

export default App;
