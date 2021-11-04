import React from "react";
import PropTypes from "prop-types";
// import "./courseSectionDisplay.css"

export interface CourseSectionProps {
  course_section: { [key: string]: string | number | null };
  is_section: boolean;
}

export default class CourseSectionDisplay extends React.Component<CourseSectionProps> {
  static defaultProps = {
    course_section: {},
    is_section: true,
  };

  static propTypes = {
    course_section: PropTypes.object,
    is_section: PropTypes.bool,
  };

  render() {
    const { course_section, is_section } = this.props;

    return (
      <div className="card course-card">
        <div className="card-body">
          <h2 className="course-title">{course_section.name}</h2>

          {is_section ? (
            <h5 className="card-subtitle mb-2 text-muted">
              Instructor: {course_section.instructor}
            </h5>
          ) : null}

          <hr className="infobar"></hr>
          <div className="card course-info-card">
            <div className="card-body">
              {is_section ? (
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h4>Code: {course_section.code}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Section Number: {course_section.section}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Credits: {course_section.credits}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Time: {course_section.time}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Location: {course_section.location}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Description:</h4>
                    <p>{course_section.description}</p>
                  </li>
                </ul>
              ) : (
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h4>Code: {course_section.code}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Credits: {course_section.credits}</h4>
                  </li>

                  <li className="list-group-item">
                    <h4>Num of sections: {course_section.num_of_sec}</h4>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
