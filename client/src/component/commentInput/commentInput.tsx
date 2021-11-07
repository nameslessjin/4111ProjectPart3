import React from "react";
import PropTypes from "prop-types";
import { http } from "../../config";

export interface State {
  comment: string;
  handleCommentUpdate: (text: string) => void;
  handleSubmit: (event: any) => void
}

export default class CommentInput extends React.Component<State> {
  static defaultProps = {
    comment: "",
    handleCommentUpdate: (text: string) => null,
    handleSubmit: (event: any) => null
  };

  static propType = {
    comment: PropTypes.string,
    handleCommentUpdate: PropTypes.func,
    handleSubmit: PropTypes.func
  };


  render() {
    return (
      <div className="card course-card">
        <div className="card-body">
          <div
            className="input-group"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <form style={{ width: "100%" }} onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-10">
                  <textarea
                    onChange={(e) =>
                      this.props.handleCommentUpdate(e.target.value)
                    }
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                      height: "100%",
                      border: "none",
                      padding: 10
                    }}
                    value={this.props.comment}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    id="button-addon2"
                    style={{ width: "100%", height: "100%" }}
                    value="Post"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
