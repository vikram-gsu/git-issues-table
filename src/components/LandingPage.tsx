import React, { Component } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import formatDate from "../lib/formatDate";
import ProjectIssueStatus from "./ProjectIssueStatus";
import ErrorMessage from "./ErrorMessage";
import { fetchIssues } from "../api/issues";
// const captured_response = require("../data/captured_response.json");

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
  error?: any;
}

class LandingPage extends Component<{}, LandingPageState> {
  state = {
    issues: [],
    loading: true,
    error: undefined
  };
  componentDidMount() {
    this.setState({ loading: true });

    fetchIssues().then(async ({ status, statusText, data }) => {
      if (status !== 200) {
        this.setState({
          error: new Error(`${status} - ${statusText}`)
        });
      } else {
        const issues = await data;
        this.setState({
          issues: issues.map(
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
        });
      }
    });

    // this.setState({
    //   issues: captured_response.map(response => ({
    //     ...response,
    //     created_at: formatDate(response.created_at),
    //     updated_at: formatDate(response.updated_at)
    //   }))
    // });
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }
  render() {
    const { loading, issues, error } = this.state;
    if (error) return <ErrorMessage errorObj={error} />;
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
