import React, { Component } from "react";
import * as _ from "lodash";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import "./users.css";
import UserData from "../userData";
import { SearchBar } from "../searchBar";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      hoveredRow: -1,
      selectedUser: -1,
      view: "user",
      searchValue: ""
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
  }

  setHoveredRow(index) {
    this.setState({ hoveredRow: index });
  }

  selectUser(userId) {
    this.setState({ view: "post", selectedUser: userId });
  }

  changeView() {
    this.setState({ view: "user" });
  }

  handleSearchTerm(term) {
    this.setState({
      searchValue: term
    });
  }

  searchUsers() {
    const { users } = this.state;

    const searchTerm = this.state.searchValue;

    if (searchTerm === "") return users;

    return _.filter(users, user => {
      if (_.startsWith(_.lowerCase(user.name), _.lowerCase(searchTerm))) {
        return user;
      }
    });
  }

  render() {
    const { hoveredRow, view, selectedUser } = this.state;
    return view === "user" ? (
      <div>
        <SearchBar
          onSearchTermChange={this.handleSearchTerm.bind(this)}
          searchPlaceholder={"Search by Name"}
        ></SearchBar>
        <Table aria-label="simple table" className="table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.searchUsers().map((row, index) => (
              <TableRow
                key={row.id}
                onMouseOver={e => this.setHoveredRow(index)}
                onClick={e => this.selectUser(row.id)}
                className={hoveredRow === index ? "row-hovered" : ""}
              >
                <TableCell
                  className={hoveredRow === index ? "row-hovered" : ""}
                >
                  {row.id}
                </TableCell>
                <TableCell
                  className={hoveredRow === index ? "row-hovered" : ""}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  className={hoveredRow === index ? "row-hovered" : ""}
                >
                  {row.website}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <UserData
        userId={selectedUser}
        changeView={this.changeView.bind(this)}
      ></UserData>
    );
  }
}

export default Users;
