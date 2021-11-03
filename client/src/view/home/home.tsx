import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./home.css";
import Selector from "../../component/selector/selector";

interface State {
  department: string;
  track: string;
  year: string;
  semester: string;
}

class Home extends React.Component<RouteChildrenProps, State> {
  constructor(props: any) {
    super(props);

    this.state = { department: "", track: "", year: "", semester: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  handleSubmit(event: any) {
    event.preventDefault();
    if (this.state.department.length != 0 && this.state.track.length != 0) {
      const new_url: string = `${
        this.props.match?.url
      }search?d=${this.state.department
        .replace(" ", "-")
        .toLocaleLowerCase()}&t=${this.state.track
        .replace(" ", "-")
        .toLowerCase()}&term=${this.state.year}-${this.state.semester}`;

      console.log(new_url);
      this.props.history.push(new_url);
    }
  }

  setValue(type: string, value: string) {
    switch (type) {
      case "Department":
        this.setState({ department: value });
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
    const department = {
      type: "Department",
      selection: [
        "Computer Science",
        "Computer Engineering",
        "Electrical Engieering",
      ],
    };
    const track = {
      type: "Track",
      selection: [
        "Computational Biology",
        "Computer Security",
        "Foundations of Computer Science",
        "Machine Learning",
        "Natural Language Processing",
        "Network Systems",
        "Software Systems",
        "Vision, Graphics, Interaction, and Robotics",
        "MS Personalized",
        "MS Thesis",
      ],
    };

    const year = {
      type: "Year",
      selection: ["2021", "2020", "2019"],
    };

    const semester = {
      type: "Semester",
      selection: ["Fall", "Spring", "Summer"],
    };

    // console.log(this.props)

    return (
      <div className="general-container">
        <form className="search" onSubmit={this.handleSubmit}>
          <Selector
            type={department.type}
            selection={department.selection}
            setValue={this.setValue}
          />
          <Selector
            type={track.type}
            selection={track.selection}
            setValue={this.setValue}
          />
          <Selector
            type={year.type}
            selection={year.selection}
            setValue={this.setValue}
          />
          <Selector
            type={semester.type}
            selection={semester.selection}
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
