import React, { Component } from "react";
import { Button } from "reactstrap";

export default class MyCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleCollapse = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const collapseStyle = {
      width: "500px",
      backgroundColor: "grey",
      margin: "0 auto",
      padding: "1rem",
    };

    const buttonStyle = {
      backgroundColor: "lightblue",
      color: "white",
    };

    const largerButtonStyle = {
      ...buttonStyle,
      marginBottom: "0.5rem",
      fontSize: "1.5rem",
    };

    const largerCollapseStyle = {
      ...collapseStyle,
      height: "400px",
      overflow: "auto",
    };

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <Button style={buttonStyle} onClick={this.toggleCollapse}>
            MENU
          </Button>
        </div>

        {this.state.isOpen && (
          <div style={largerCollapseStyle}>
            <Button block style={largerButtonStyle}>
              Main Courses
            </Button>
            <Button block style={largerButtonStyle}>
              beverages
            </Button>
            <Button block style={largerButtonStyle}>
              desserts
            </Button>
          </div>
        )}
      </div>
    );
  }
}
