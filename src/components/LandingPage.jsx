import React, { Component } from "react";
import ProjectIssueStatus from "./ProjectIssueStatus";
const captured_response = require("../data/captured_response.json");

const formatDate = dateString => {
  const dateObj = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZoneName: "short"
  };
  return Intl.DateTimeFormat("en-US", options).format(dateObj);
};

class LandingPage extends Component {
  state = {
    issues: null
  }
  componentDidMount() {
    fetch("https://api.github.com/repos/facebook/react/issues")
      .then(response => response.json())
      .then(issues =>
        this.setState({
          issues: captured_response.map(response => ({
            ...response,
            created_at: formatDate(response.created_at),
            updated_at: formatDate(response.updated_at)
          }))
        })
      );

    // this.setState({
    //   issues: captured_response.map(response => ({
    //     ...response,
    //     created_at: formatDate(response.created_at),
    //     updated_at: formatDate(response.updated_at)
    //   }))
    // });
  }
  render() {
    return (
      this.state.issues && <>
        <ProjectIssueStatus issues={this.state.issues} />
      </>
    );
  }
}

export default LandingPage;
