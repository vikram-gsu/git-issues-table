import React, { useState, useEffect } from "react";
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

const LandingPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchIssues().then(async ({ status, statusText, data }) => {
      if (status !== 200) {
        setError(new Error(`${status} - ${statusText}`));
      } else {
        const issues = await data;
        setIssues(
          issues.map(
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
          )
        );
        setLoading(false);
      }
    });
  }, []);

  if (error) return <ErrorMessage errorObj={error} />;
  return !loading ? (
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
};


export default LandingPage;
