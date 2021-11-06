import React from "react";
import PropTypes from "prop-types";

export interface CourseTableProps {
  courses: { [key: string]: string | number | null }[];
  handleCoursePress: (item: { [key: string]: string | number | null }) => void;
  handleAddDelete: (
    event: any,
    item: { [key: string]: string | number | null }
  ) => void;
  action?: string;
}

export default class CourseTable extends React.Component<CourseTableProps> {
  static defaultProps = {
    courses: [],
    handleCoursePress: (item: { [key: string]: string | number | null }) =>
      null,
    handleAddDelete: (
      event: any,
      item: { [key: string]: string | number | null }
    ) => null,
    action: null,
  };

  static propTypes = {
    courses: PropTypes.array,
    handleCoursePress: PropTypes.func,
    handleAddDelete: PropTypes.func,
    action: PropTypes.string || null,
  };

  render() {
    const { courses, action } = this.props;
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
                {"id" in courses[0] &&
                localStorage.getItem("user_id") &&
                (action == "add" || action == "delete") ? (
                  <th scope="col">Add/Delete</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr
                  onClick={(event) => this.props.handleCoursePress(c)}
                  key={c.id || c.code}
                >
                  {Object.entries(c).map((e) =>
                    e[0] != "id" ? <th scope="row">{e[1]}</th> : null
                  )}

                  {"id" in courses[0] &&
                  localStorage.getItem("user_id") &&
                  (action == "add" || action == "delete") ? (
                    <th>
                      {action == "delete" ? (
                        <button
                          className="btn btn-danger"
                          onClick={(event) =>
                            this.props.handleAddDelete(event, c)
                          }
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={(event) =>
                            this.props.handleAddDelete(event, c)
                          }
                        >
                          Add
                        </button>
                      )}
                    </th>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
