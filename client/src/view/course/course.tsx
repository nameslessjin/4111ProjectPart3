import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./course.css";
import { http } from "../../config";
import CourseSectionDisplay from "../../component/courseSection/courseSectionDisplay";
import CourseTable from "../../component/courseTable/courseTable";

interface State {
  course: { [key: string]: string | number | null };
  section: { [key: string]: string | number | null }[];
}

export default class Course extends React.Component<RouteChildrenProps, State> {
  constructor(props: any) {
    super(props);
    this.state = { course: {}, section: [] };
    this.handleSectionPress = this.handleSectionPress.bind(this);
  }

  componentDidMount() {
    this.fetchCourseResult();
  }

  fetchCourseResult() {
    const { pathname } = this.props.location;
    const url = http + pathname.substr(1, pathname.length);

    fetch(url)
      .then((res) => res.json())
      .then((res: any) => {
        this.setState({ course: res.course, section: res.section });
      })
      .catch((err) => console.log(err));
  }

  handleSectionPress(event: { [key: string]: string | number | null }) {
    this.props.history.push(`/section/${event.id}`);
  }

  render() {
    const { course, section } = this.state;

    return (
      <div className="container py-4">
        <CourseSectionDisplay course_section={course} is_section={false} />
        <div className="sec-container">
          <h1>Sections</h1>
          <CourseTable
            courses={section}
            handleCoursePress={this.handleSectionPress}
          />
        </div>
      </div>
    );
  }
}
