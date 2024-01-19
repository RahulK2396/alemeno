import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Card, Button } from 'react-bootstrap'
import ProgressBar from './ProgressBarComponent';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "../assests/CSS/StudentDashboard.css"

function StudentDashboard() {
  const navigate = useNavigate();
  const posts = useSelector(state => state.posts)
  const filteredCourses = posts.filter(course => {
    return course.students.some(student => student.email === window.sessionStorage.getItem('email') &&
    student.name === window.sessionStorage.getItem('username'));
  });
  const [enrolledCourses, setEnrolledCourses] = useState(filteredCourses)

  const handleMarkComplete = (course) => {
    setEnrolledCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === course.id ? { ...c, isCompleted: !c.isCompleted } : c
      )
    );
  };
  function exploreCourses(){
    navigate('/courseList');
  }
  return (

    <div className="user-dashboard">
      <Card className='card' >
        <Card.Body className='card-body'>
          <Card.Title>Welcome {window.sessionStorage.getItem('username')}</Card.Title>
          <p className='button-click' onClick={exploreCourses}>Explore courses</p>
        </Card.Body>
        <h6 className='padding'>Your Enrolled Course Details :</h6>
        {enrolledCourses.map((course) => (
        <ListGroup variant="flush">
          <Card.Title className='padding'>{course.name}</Card.Title>
        <ListGroup.Item>Instructor Name : {course.instructor}</ListGroup.Item>
        <ListGroup.Item>Due date : {course.duration}</ListGroup.Item>
        <ListGroup.Item>
        <ProgressBar
                bgcolor="gold"
                progress={course.isCompleted ? "100" : "30"}
                height={20}
            />
        </ListGroup.Item>
              {!course.isCompleted && (
        <ListGroup.Item className='user-dashboard'>
                <Button
                  variant="primary"
                  onClick={() => handleMarkComplete(course)}
                >
                  Mark as Completed
                </Button>
            </ListGroup.Item>
              )}
        
          </ListGroup>
          ))}
      </Card>


    </div>
  );
}

export default StudentDashboard;
