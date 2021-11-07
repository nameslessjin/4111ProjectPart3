import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./home.css";
import Selector from "../../component/selector/selector";
import { http } from "../../config";

interface State {
  department: string;
  track: string;
  year: string;
  semester: string;
  deparment_selection: string[];
  track_selection: string[];
  year_selection: string[];
  semester_selection: string[];
  td_list: { dname: string; t_list: string[] }[];
}

class Home extends React.Component<RouteChildrenProps, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      department: "",
      track: "",
      year: "",
      semester: "",
      deparment_selection: [],
      track_selection: [],
      year_selection: ["2021", "2020"],
      semester_selection: ["Fall", "Spring"],
      td_list: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
    // this.fetchDepartmentData = this.fetchDepartmentData.bind(this);
  }

  componentDidMount() {
    this.fetchDepartmentData();
  }

  fetchDepartmentData() {
    fetch(http)
      .then((res) => {
        res.json().then((re) => {
          //   console.log(re);
          this.setState({
            deparment_selection: re.map(
              (e: { dname: string; t_list: string[] }) => e.dname
            ),
            td_list: re,
          });
        });
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(event: any) {
    event.preventDefault();
    if (
      this.state.department.length != 0 &&
      this.state.track.length != 0 &&
      this.state.year.length != 0 &&
      this.state.semester.length != 0
    ) {
      const new_url: string = `${
        this.props.match?.url
      }search?d=${this.state.department
        .replaceAll(" ", "-")}&t=${this.state.track
        .replaceAll(" ", "-")}&term=${this.state.year}-${this.state.semester}&courseOnly=0`;
      this.props.history.push(new_url);
    }
  }

  setValue(type: string, value: string) {
    switch (type) {
      case "Department":
        this.setState({
          department: value,
          track: "",
          track_selection: this.state.td_list.filter(
            (td) => td.dname == value
          )[0].t_list,
        });
        break;
      case "Track":
        this.setState({ track: value });
        break;
      case "Year":
        this.setState({ year: value });
        break;
      case "Semester":
        this.setState({ semester: value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="general-container">
        <form className="search" onSubmit={this.handleSubmit}>
          <Selector
            type={"Department"}
            selection={this.state.deparment_selection}
            setValue={this.setValue}
          />
          <Selector
            type={"Track"}
            selection={this.state.track_selection}
            setValue={this.setValue}
          />
          <Selector
            type={"Year"}
            selection={this.state.year_selection}
            setValue={this.setValue}
          />
          <Selector
            type={"Semester"}
            selection={this.state.semester_selection}
            setValue={this.setValue}
          />
          <div id="submit-search">
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
