import React, {  useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import "../assests/CSS/CourseDetailsComponent.css"

function CourseDetailsComponents(props) {
  const { course } = props
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);

  const toggleSyllabus = () => {
    setIsSyllabusExpanded(!isSyllabusExpanded);
  };

  return (
    <div className="expand-course">
      <Card style={{ width: '30rem' }}>
        <Card.Header className="card-header">{course.name}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Instructor Name : {course.instructor}</ListGroup.Item>
          <ListGroup.Item>Description : {course.description}</ListGroup.Item>
          <ListGroup.Item>Enrollment status : {course.enrollmentStatus}</ListGroup.Item>
          <ListGroup.Item>Course duration : {course.duration}</ListGroup.Item>
          <ListGroup.Item>Schedule : {course.schedule}</ListGroup.Item>
          <ListGroup.Item>Location : {course.location}</ListGroup.Item>
          <ListGroup.Item>Pre-requisites : {course.prerequisites}</ListGroup.Item>
          <ListGroup.Item>
            <Button
              variant="link"
              onClick={toggleSyllabus}
              aria-controls="syllabus-content"
              aria-expanded={isSyllabusExpanded}
            >
              {isSyllabusExpanded ? 'Collapse Syllabus' : 'Expand Syllabus'}
            </Button></ListGroup.Item>
          {isSyllabusExpanded && (
            <ListGroup.Item id="syllabus-content">
              <strong>Syllabus:</strong>
              <ul>
                {course.syllabus.map((week) => (
                  <li key={week.week}>
                    <strong>Week {week.week}:</strong> {week.topic} - {week.content}
                  </li>
                ))}
              </ul>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>

  )

}
export default CourseDetailsComponents