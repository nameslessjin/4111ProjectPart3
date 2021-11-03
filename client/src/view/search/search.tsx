import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./search.css";
import CourseTable from "../../component/courseTable/courseTable";

interface State {
  is_course_only: boolean;
}

export default class Search extends React.Component<RouteChildrenProps, State> {
  constructor(props: any) {
    super(props);

    this.state = { is_course_only: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleCoursePress = this.handleCoursePress.bind(this);
  }

  handleChange(event: any) {
    this.setState((prevState) => ({
      is_course_only: !prevState.is_course_only,
    }));
  }

  handleCoursePress(event: any) {}

  render() {
    const courses = [
      {
        id: "0",
        code: "COMSW4111",
        name: "INTRODUCTION TO DATABASES",
        section: "001",
        time: "Tu Th 1:10PM-2:25PM",
        location: "301 Pupin Laboratories",
        description: null,
        instructor: "Luis Gravano",
        credits: 3,
        type: "ELECTIVE",
      },
      {
        id: "1",
        code: "COMSW4111",
        name: "INTRODUCTION TO DATABASES",
        section: "002",
        time: "F 10:10AM-12:40PM",
        location: "309 Havemeyer Hall",
        description: null,
        instructor: "Donald F Ferguson",
        credits: 3,
        type: "ELECTIVE",
      },
      {
        id: "2",
        code: "COMSW4115",
        name: "PROGRAMMING LANG & TRANSLATORS",
        section: "001",
        time: "M  W 1:10PM-2:25PM",
        location: "451 Computer Science Building",
        description: null,
        instructor: "Baishakhi Ray",
        credits: 3,
        type: "ELECTIVE",
      },
    ];

    return (
      <div className="general-container">
        <div>
          <div className="toggleButtons gap-3">
            <div>
              <a className="btn btn-secondary">Back</a>
            </div>
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-outlined"
              autoComplete="off"
              onClick={this.handleChange}
              checked={this.state.is_course_only}
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="btn-check-outlined"
            >
              Course Only
            </label>
          </div>
          <CourseTable courses={courses} />
        </div>
      </div>
    );
  }
}
