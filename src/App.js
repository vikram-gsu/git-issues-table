import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import ProjectIssueStatus from "./components/ProjectIssueStatus";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <ProjectIssueStatus />
    </>
  );
}

export default App;
