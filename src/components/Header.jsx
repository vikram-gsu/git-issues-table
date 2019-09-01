import React from "react";
import "./styles/Header.css";
import { Grid, Search } from "semantic-ui-react";

const HeaderStyles = {
  background: "grey",
};
const Header = () => {
  return (
    <div style={HeaderStyles}>
      <Grid centered={true} textAlign='right' verticalAlign='middle' columns={16}>

        <Grid.Column width={2}></Grid.Column>
        <Grid.Column floated="left"  width={6}>
          <h1>Git Issues</h1>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column floated="right" width={6}>
          <div className="search">
            <Search size='huge' />
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Header;
