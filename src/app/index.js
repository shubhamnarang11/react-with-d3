import * as React from "react";
import Graph from "./components/graph";
import Users from "./components/users";
import { ButtonGroup, Button } from "@material-ui/core";
import "./app.css";
import { graphData } from "../environments/environment";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: "user"
    };
  }

  selectView(view) {
    this.setState({
      selectedView: view
    });
  }
  render() {
    const { selectedView } = this.state;
    return (
      <div>
        <ButtonGroup color="primary" className="button-group">
          <Button
            className={selectedView === "user" ? "selected" : ""}
            onClick={e => this.selectView("user")}
          >
            Users Data
          </Button>
          <Button
            className={selectedView === "bar" ? "selected" : ""}
            onClick={e => this.selectView("bar")}
          >
            Bar Graph
          </Button>
        </ButtonGroup>
        <div className="container">
          {selectedView === "user" ? (
            <Users></Users>
          ) : (
            <Graph graphData={graphData} />
          )}
        </div>
      </div>
    );
  }
}
