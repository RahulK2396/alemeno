
import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../useAuth.js';
import { useNavigate } from 'react-router-dom';
import { courseListApi } from '../Constant';
import "../assests/CSS/LoginComponent.css";
import {  useDispatch } from 'react-redux'
import {postAdded} from "../features/posts/PostsSlice.js"
function LoginComponent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [invalid, setInvalid] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(courseListApi)
      .then((res) => res.json())
      .then((data) => {
        console.log("data",data);
        dispatch(postAdded(data))
        const allStudents = data.flatMap(course => course.students);
        setStudentList(allStudents);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundStudent = studentList.find(student => student.name === username && student.email === email);

    if (foundStudent) {
      login(foundStudent);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('email', email);
      navigate('/dashboard');
    } else {
      setInvalid(true);
    }

    setEmail('');
    setUsername('');
  };

  return (
    <div className="container mt-5">
      <Card className='card-login'>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            {invalid && <p className='error'>Either username or email is incorrect</p>}
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            
            <div className='card-button'>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginComponent;
