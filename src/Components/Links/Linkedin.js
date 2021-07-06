import React, { Component } from "react";
class Linkedin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <a rel="noopener noreferrer" href={this.props.link} target="_blank">
        {this.props.author}
      </a>
    );
  }
}

export default Linkedin;
