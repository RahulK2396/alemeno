import React from 'react';
import ListOfCoursesComponent from './components/ListOfCoursesComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentDashboard from './components/StudentDashboard';
import LoginComponent from './components/LoginComponent';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ element, ...props }) => {
  const { user } = useAuth();
console.log("user",user);
  return user ? (
    element
  ) : (
    <Navigate to="/" state={{ from: props.location }} replace />
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<StudentDashboard />} />}
          />
          <Route
            path="/courseList"
            element={<PrivateRoute element={<ListOfCoursesComponent />} />}
          />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
