import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./search.css";
import CourseTable from "../../component/courseTable/courseTable";
import { http } from "../../config";

interface State {
  is_course_only: boolean;
  courses: { [key: string]: string | number | null }[];
}

export default class Search extends React.Component<RouteChildrenProps, State> {
  constructor(props: any) {
    super(props);

    this.state = { is_course_only: false, courses: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleCoursePress = this.handleCoursePress.bind(this);
  }

  componentDidMount() {
    this.fetchSearchResult();
  }

  handleChange(event: any) {
    this.setState((prevState) => ({
      is_course_only: !prevState.is_course_only,
    }));
  }

  componentDidUpdate(prevProps: RouteChildrenProps, prevState: State) {
    if (this.state.is_course_only != prevState.is_course_only) {
      const { pathname, search } = this.props.location;
      const new_search =
        search.split("courseOnly=")[0] +
        "courseOnly=" +
        (search.split("courseOnly=")[1] == "0" ? "1" : "0");

      const url = pathname.substr(1, pathname.length) + new_search;

      this.props.history.replace(url);
      this.fetchSearchResult();
    }
  }

  fetchSearchResult() {
    const { pathname, search } = this.props.location;

    const new_search =
      search.split("courseOnly=")[0] +
      "courseOnly=" +
      (this.state.is_course_only ? "1" : "0");

    const url = http + pathname.substr(1, pathname.length) + new_search;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        res.json().then((re) => {
          this.setState({ courses: re });
        });
      })
      .catch((err) => console.log(err));
  }

  handleCoursePress(event: { [key: string]: string | number | null }) {

    if (event.id) {
      this.props.history.push(`/section/${event.id}`);
    } else {
      this.props.history.push(`/course/${event.code}`);
    }
  }

  render() {
    return (
      <div className="general-container">
        <div>
          <div className="toggleButtons gap-3">
            <div>
              <a className="btn btn-secondary" href="/">
                Back
              </a>
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
          <CourseTable
            courses={this.state.courses}
            handleCoursePress={this.handleCoursePress}
          />
        </div>
      </div>
    );
  }
}
