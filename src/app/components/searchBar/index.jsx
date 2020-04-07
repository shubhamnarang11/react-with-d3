import React, { Component } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Icon from "@material-ui/core/Icon";
import "./SearchBar.css";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
    this.search = this.search.bind(this);
  }

  search(term) {
    this.setState({ searchTerm: term });
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <TextField
        variant="outlined"
        placeholder={this.props.searchPlaceholder}
        onChange={event => this.search(event.target.value)}
        className="search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className="searchIcon">search</Icon>
            </InputAdornment>
          )
        }}
      />
    );
  }
}
