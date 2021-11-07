import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./section.css";
import { http } from "../../config";
import CourseSectionDisplay from '../../component/courseSection/courseSectionDisplay'
//import CommentInput from '../../component/commentInput/commentInput'
import SectionComment from "../../component/sectionComment/sectionComment";
import CommentInput from "../../component/commentInput/commentInput";

interface State {
  course_section: { [key: string]: string | number | null };
  section_comment: {username: string, text: string, date:string}[]
  secid: number;
}

export default class Section extends React.Component<RouteChildrenProps, State> {
  constructor(props: any) {
    super(props);

    this.state = { course_section: {}, section_comment: [], secid: 0};
  }

  componentDidMount() {
    this.fetchSectionResult();
  }

  async fetchSectionResult() {
    const { pathname } = this.props.location;
    const secid = pathname.split('/');
    this.setState({secid: parseInt(secid[secid.length-1])})
    const url1 = http + pathname.substr(1, pathname.length);
    const url2 = http + 'findSectionComment/'+ secid[secid.length-1];
    await Promise.all([fetch(url1), fetch(url2)])
    .then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()])
    })
    .then(([res1, res2]) => {
      console.log(res1, res2)
      this.setState({ course_section: res1 });
      this.setState({ section_comment: res2 });
    })
    .catch((err) => console.log(err));
  }


  render() {
    const { course_section, section_comment, secid} = this.state;

    return (
      <div className="container py-4">
        <CourseSectionDisplay course_section={course_section} is_section={true} />
        <SectionComment section_comment={section_comment} />
        <CommentInput secid={secid} />
      </div>
    );
  }
}
