import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import './Search.css';
//const SERVER_URL = "http://localhost:3000/projects/search/";
const SERVER_URL = "https://priyankapatel-oz-upwork.herokuapp.com/projects/search/";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      searchResults: [],
      error: "",
      isLoading: 0,
      redirect: null,
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
      this.setState({ searchResults: [], isLoading: 1});
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
        >
          <input
            type="search"
            onChange={this._handleChange}
            placeholder="Example: Developer"
            className="searchinput"
            style={{ width: 300, padding: 4, borderRadius: "0.5em"}}
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
    <div class="searchResult">
      {props.projectList && props.projectList.map((project) => (
        <div class="searchResult">
          <h1 class="ProjectHeading" style={{fontSize: '2rem', textTransform: 'uppercase'}}>{project.name}</h1>
    			<div class= "projectShow" style={{marginLeft: '20rem', padding: 'auto'}}>
    				{project.skills &&
              <div div class="skills">
                <h4> Professional Skills Required:</h4>
                {project.skills.map((skill) =>
                  <span>{skill}</span>
                )}
              </div>
            }
    				<h4> Job Description:</h4>
    				<p> {project.description}</p>

    				<h5> PaymentType: <span>{project.paymentType}</span> </h5> <br/>
    				<h5> EstimatedBudget $: <span>{project.estimatedBudget}</span> </h5> <br/>
    				<h5> Contact me for more details: <span>{project.email}</span> </h5> <br/>
    				<h5> Date posted : <span>{project.datePosted}</span> </h5> <br/>
    			</div>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default Search;
