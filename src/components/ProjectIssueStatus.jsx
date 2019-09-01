import React, { Component } from "react";
import { Table, Menu, Icon, Grid } from "semantic-ui-react";
import "./styles/ProjectIssueStatus.css";

const captured_response = require("../data/captured_response.json");

const Labels = ({ labels }) => (
  <ul>
    {labels.map(({ url, color, name, id }) => (
      <li key={id}>
        <a href={url} style={{ backgroundColor: `#${color}`, color:'black', padding:'0.1em', borderRadius:'1px' }}>
          {name}
        </a>
      </li>
    ))}
  </ul>
);

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
class ProjectIssueStatus extends Component {
  state = {
    issues: null
  };
  componentDidMount() {
    // fetch("https://api.github.com/repos/facebook/react/issues")
    //   .then(response => response.json())
    // .then(issues => this.setState({ issues }));

    this.setState({
      issues: captured_response.map(response => ({
        ...response,
        created_at: formatDate(response.created_at),
        updated_at: formatDate(response.updated_at)
      }))
    });
  }

  render() {
    this.state.issues &&
      this.state.issues.map(({ created_at }) => {
        const createdAtObj = new Date(created_at);
        console.log(createdAtObj.getDate());
      });
    return (
      <div>
        <Grid columns={16}>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            <div className="table">
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Issue Number</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Created At</Table.HeaderCell>
                    <Table.HeaderCell>Updated At</Table.HeaderCell>
                    <Table.HeaderCell>Labels</Table.HeaderCell>
                    <Table.HeaderCell>State</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.issues &&
                    this.state.issues.map(issue => {
                      const {
                        number: IssueNumber,
                        title,
                        created_at,
                        updated_at,
                        labels,
                        state
                      } = issue;
                      return (
                        <Table.Row key={IssueNumber}>
                          <Table.Cell>{IssueNumber}</Table.Cell>
                          <Table.Cell>{title}</Table.Cell>
                          <Table.Cell>{created_at}</Table.Cell>
                          <Table.Cell>{updated_at}</Table.Cell>
                          <Table.Cell>
                            <Labels labels={labels} />
                          </Table.Cell>
                          <Table.Cell>{state}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
            </div>
            <div className="pagination">
              <Menu pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </div>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ProjectIssueStatus;
