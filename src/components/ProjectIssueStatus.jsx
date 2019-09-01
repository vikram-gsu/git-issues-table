import React, { Component } from "react";
import { Table, Grid, Search } from "semantic-ui-react";
import "./styles/ProjectIssueStatus.css";


const Labels = ({ labels }) => (
  <ul>
    {labels.map(({ url, color, name, id }) => (
      <li key={id}>
        <a
          href={url}
          style={{
            backgroundColor: `#${color}`,
            color: "black",
            padding: "0.1em",
            borderRadius: "1px"
          }}
        >
          {name}
        </a>
      </li>
    ))}
  </ul>
);

const escape = s => {
  return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

class ProjectIssueStatus extends Component {
  initialState = {
    issues: this.props.issues,
    isLoading: false,
    value: ""
  };
  state = this.initialState;

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // console.log(this.state.issues.filter(issue => isMatch(issue)))
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(this.initialState);

      const re = new RegExp(escape(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        issues: this.props.issues.filter(issue => isMatch(issue))
      });
    }, 300);
  };

  render() {
    return (
      <div>
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={4}>
              <h1>Github Issue Details</h1>
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={4}>
              <div className="search">
                <Search
                  size="huge"
                  width="100%"
                  loading={this.state.isLoading}
                  onSearchChange={this.handleSearchChange}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid.Row>
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
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ProjectIssueStatus;
