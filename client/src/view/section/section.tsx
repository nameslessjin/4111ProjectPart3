import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./section.css";
import { http } from "../../config";
import CourseSectionDisplay from "../../component/courseSection/courseSectionDisplay";
import SectionComment from "../../component/sectionComment/sectionComment";
import CommentInput from "../../component/commentInput/commentInput";

interface State {
  course_section: { [key: string]: string | number | null };
  section_comment: { username: string; text: string; date: string }[];
  comment: string;
}

export default class Section extends React.Component<
  RouteChildrenProps,
  State
> {
  constructor(props: any) {
    super(props);

    this.state = { course_section: {}, section_comment: [], comment: "" };
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchSectionResult();
  }

  fetchSectionResult() {
    const { pathname } = this.props.location;
    const url = http + pathname.substr(1, pathname.length);

    fetch(url)
      .then((res) => res.json())
      .then((res: any) => {
        this.setState({ course_section: res });
        this.fetchCommentResult();
      })
      .catch((err) => console.log(err));
  }

  fetchCommentResult() {
    const { pathname } = this.props.location;
    const secid = pathname.split("/section/");

    const url = `${http}findSectionComment/${secid[1]}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ section_comment: res });
      })
      .catch((err) => console.log(err));
  }

  handleCommentUpdate(text: string) {
    this.setState({ comment: text });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const { pathname } = this.props.location;
    const secid = pathname.split("/section/");

    const data = {
      comment_content: this.state.comment,
      secid: secid[1],
      userid: localStorage.getItem("user_id"),
    };

    const url = http + "postcomment";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState((prevState) => ({
          section_comment: [res].concat(prevState.section_comment),
          comment: "",
        }));
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { course_section, section_comment, comment } = this.state;

    return (
      <div className="container py-4">
        <CourseSectionDisplay
          course_section={course_section}
          is_section={true}
        />
        <SectionComment section_comment={section_comment} />
        <CommentInput
          comment={comment}
          handleCommentUpdate={this.handleCommentUpdate}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
