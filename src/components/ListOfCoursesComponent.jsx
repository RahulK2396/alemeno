
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import "../assests/CSS/ListOfCoursesComponent.css"
import { useSelector } from "react-redux";
import CourseDetailsComponents from './CourseDetailsComponent';

function ListOfCoursesComponent() {
  const [courses, setCourses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isCourseExpanded , setIsCourseExpanded] = useState(false)
  const [courseExpanded , setCourseExpanded] = useState([])
  const course = useSelector(state => state.posts)
  
  useEffect(() => {
    getCourse()
  }, []);

  function getCourse(){
  setFilteredData(course)
  setCourses(course)
  }

  function handleSearch(e) {
    setSearchData(e.target.value)
    if (e.target.value) {
      const filteredCourses = courses.filter((item) => {
        return (item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.instructor.toLowerCase().includes(e.target.value.toLowerCase()))
      })
      setFilteredData(filteredCourses)
    }
    else {
      setFilteredData(courses)
    }
  }

  function expandCourse(item){
    setIsCourseExpanded(true)
    setCourseExpanded(item)
  }
  return (
    <div>
      {!isCourseExpanded ? 
    <div className='course-list'>

      <h2 className='heading-two'>Course List</h2>
      <form>
        <div class="input-group search-input">
          <input type="text"
            class="form-control"
            placeholder="Search"
            name="search"
            value={searchData}
            onChange={handleSearch} />
            <i class="material-icons search-icon">search</i>
          <div class="input-group-btn">
          </div>
        </div>
      </form>

      <div className='table-container'>
        <Table responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Course Name</th>
              <th>Instructor Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>

            {filteredData.length ? filteredData.map((item) => {
              return <tr className='trdata' onClick={() =>expandCourse(item)}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.instructor}</td>
                <td>{item.description}</td>
              </tr>
            }) : <div className='no-data'>No data avaialble</div>}

          </tbody>
        </Table>
      </div>

    </div>
    :
      <CourseDetailsComponents course={courseExpanded}/> }
    </div>
  );
}

export default ListOfCoursesComponent;
