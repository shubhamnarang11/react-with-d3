import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@material-ui/core";
import Users from "../users";
import "./userData.css";

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.props.userId}`
      )
      .then(res => {
        console.log(res.data);

        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <Button
          variant="text"
          className="back-button"
          onClick={() => this.props.changeView()}
        >
          &lt; Back
        </Button>
        <Table aria-label="simple table" className="table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((row, index) => (
              <TableRow
                key={row.id}
                //   onMouseOver={e => this.setHoveredRow(index)}
                //   className={hoveredRow === index ? "row-hovered" : ""}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default UserData;
