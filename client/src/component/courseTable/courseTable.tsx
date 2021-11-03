import React from "react";
import PropTypes from "prop-types";

export interface CourseTableProps {
  courses: { [key: string]: string | number | null }[];
  handleCoursePress: (event: any) => void
}

export default class CourseTable extends React.Component<CourseTableProps> {
  static defaultProps = {
    courses: [],
    handleCoursePress: (event: any) => null
  };

  static propTypes = {
    courses: PropTypes.array,
    handleCoursePress: PropTypes.func
  };

  render() {
    const { courses } = this.props;
    return (
      <div>
        {courses.length == 0 ? (
          <h1>No course found</h1>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                {Object.keys(courses[0]).map((k) =>
                  k != "id" ? (
                    <th scope="col" key={k}>
                      {k}
                    </th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr onClick={() => this.props.handleCoursePress(c)} key={c.id || c.code}>
                  {Object.entries(c).map((e) =>
                    e[0] != "id" ? (
                      <th scope="row">
                        {e[1]}
                      </th>
                    ) : null
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
