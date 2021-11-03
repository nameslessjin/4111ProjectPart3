import React from "react";
import PropTypes from "prop-types";

export interface CourseTableProps {
  courses: { [key: string]: string | number | null }[];
}

export default class CourseTable extends React.Component<CourseTableProps> {
  static defaultProps = {
    courses: [],
  };

  static propTypes = {
    courses: PropTypes.array,
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
                  k != "description" && k != "id" ? (
                    <th scope="col">{k}</th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr onClick={() => console.log(c)}>
                  {Object.entries(c).map((e) =>
                    e[0] != "description" && e[0] != "id" ? <th scope="row">{e[1]}</th> : null
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
