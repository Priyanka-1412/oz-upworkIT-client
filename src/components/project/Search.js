import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const SERVER_URL = "http://localhost:3000/projects/search/";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      searchResults: [],
      error: "",
      isLoading: 0,
    };
    this._handleChange = this._handleChange.bind(this);
    this._submitSearch = this._submitSearch.bind(this);
    this.fetchURL = this.fetchURL.bind(this);
  }
  componentDidMount() {
    this.fetchURL();
  }
  fetchURL() {
    let search =
      SERVER_URL +
      this.state.query;

    if (this.state.query !== "") {
      this.setState({ searchResults: [], isLoading: 1 });
      axios(search)
        .then((response) => {
          console.log(response.data);
          this.setState({
            searchResults: response.data,
            isLoading: 0,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: error, isLoading: 0 });
        });
    }
  }

  _submitSearch(event) {
    event.preventDefault();
    this.fetchURL();
  }

  _handleChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this._submitSearch}
          className="searchbox"
          style={{ backgroundColor: "#fffbf8" }}
        >
          <input
            type="search"
            onChange={this._handleChange}
            placeholder="Example: Developer"
            className="searchinput"
          />
          <button id="search" className="searchbutton">Search</button>
        </form>

        <SearchList
          projectList={this.state.searchResults}
          show={this.state.isLoading}
        />

      </div>
    );
  }
}

const SearchList = (props) => {
  console.log(props.projectList);
  return (
    <div>
      {props.projectList && props.projectList.map((project) => (
        <div >
          <Link to={`project/${project._id}`} >
              <p className="project__name">{project.name}</p>
          </Link>

          <li className="projects" key={project._id}  >
            Description:{project.description},
            Skills:{project.skills},
            date:{project.datePosted},
            Contact me:{project.phone},
            email:{project.email},
            Payment Type:{project.paymentType},
            Estimated Budget:{project.estimatedBudget}
          </li>
        </div>
      ))}
    </div>
  );
};

export default Search;
