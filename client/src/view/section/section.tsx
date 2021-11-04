import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./section.css";
import { http } from "../../config";
import CourseSectionDisplay from '../../component/courseSection/courseSectionDisplay'

interface State {
  course_section: { [key: string]: string | number | null };
}

export default class Section extends React.Component<RouteChildrenProps, State> {
  constructor(props: any) {
    super(props);

    this.state = { course_section: {} };
  }

  componentDidMount() {
    this.fetchSectionResult();
  }

  fetchSectionResult() {
    const { pathname } = this.props.location;
    const url = http + pathname.substr(1, pathname.length);

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ course_section: res });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { course_section } = this.state;

    return (
      <div className="container py-4">
        <CourseSectionDisplay course_section={course_section} is_section={true} />
      </div>
    );
  }
}
