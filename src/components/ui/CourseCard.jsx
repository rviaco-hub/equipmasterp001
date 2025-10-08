import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <h4>{course.title}</h4>
      <p>{course.description}</p>
      <button>Ver Detalles</button>
    </div>
  );
};

export default CourseCard;
