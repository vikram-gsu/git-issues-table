import React, { Component } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import formatDate from '../lib/formatDate';
import ProjectIssueStatus from "./ProjectIssueStatus";
const captured_response = require("../data/captured_response.json");

export type label = {
  url: string;
  id: number;
  name: string;
  color: string;
};
export type GitlabIssue = {
  number: number;
  title: string;
  created_at: string;
  updated_at: string;
  labels: [label?];
  state: string;
};

interface LandingPageState {
  issues: Array<GitlabIssue>;
  loading: Boolean;
}

class LandingPage extends Component<{}, LandingPageState> {
  state = {
    issues: [],
    loading: true
  };
  componentDidMount() {
    this.setState({ loading: true });

    fetch("https://api.github.com/repos/facebook/react/issues")
      .then(response => response.json())
      .then(issues =>
        this.setState({
          issues: captured_response.map(
            ({
              number,
              title,
              created_at,
              updated_at,
              labels,
              state
            }: GitlabIssue) => ({
              number,
              title,
              labels,
              state,
              created_at: formatDate(created_at),
              updated_at: formatDate(updated_at)
            })
          ),
          loading: false
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
    const { loading, issues } = this.state;
    return !this.state.loading ? (
      <>
        <ProjectIssueStatus issues={issues} />
      </>
    ) : (
      <Dimmer.Dimmable as={Segment} dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader active={loading}>Loading</Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    );
  }
}

export default LandingPage;
