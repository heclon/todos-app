import React, { Component } from 'react';

class Linkedin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render(){
    return (
        <a href="www.linkedin.com/in/hector-longarte" id="linkedin" className="linkedin">
            {this.props.author}</a>
    )};
}

export default Linkedin;