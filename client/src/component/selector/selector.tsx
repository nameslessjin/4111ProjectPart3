import React from "react";
import PropTypes from "prop-types";
import "./selector.css";

export interface SelectorProps {
  type: string;
  selection?: string[];
  inSelectorTitle?: boolean;
  setValue: (type: string, value: string) => void;
}

class Selector extends React.Component<SelectorProps> {

  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  static defaultProps = {
    type: "",
    selection: [],
    inSelectorTitle: false,
    setValue: (type: string, value: string) => null
  };

  static propTypes = {
    type: PropTypes.string,
    selection: PropTypes.array,
    inSelectorTitle: PropTypes.bool,
    setValue: PropTypes.func,
  };

  handleChange(event: any) {
    this.props.setValue(this.props.type, event.target.value);
  }

  render() {
    return (
      <div>
        <h3>{this.props.type}</h3>
        <select
          className="form-select form-select-lg mb-3 select"
          aria-label=".form-select-lg example"
          onChange={this.handleChange}
        >
          <option selected value="">
            {"Select a " + this.props.type}
          </option>

          {this.props.selection?.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Selector;
