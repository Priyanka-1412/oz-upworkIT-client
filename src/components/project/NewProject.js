import React, { Component } from "react";
import axios from "axios";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
// import { WithContext as ReactTags } from 'react-tag-input';
// import Form from 'react-bootstrap/Form';
import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/projects";

class CreateProject extends Component {
  constructor() {
    super();

    this.state = {
      projects:
        {
          skills: [],
          name: '',
          description: '',
          paymentType: '',
          estimatedBudget: 0,
          redirect: null
        },
        tags: []
    };

    this._handleChange = this._handleChange.bind(this)
    this._handleName = this._handleName.bind(this);
    this._handleDescription = this._handleDescription.bind(this);
    this._handleSkills = this._handleSkills.bind(this);
    this._handlePayment = this._handlePayment.bind(this);
    this._handleBudget = this._handleBudget.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCreate = this._handleCreate.bind(this);
  }

componentDidMount() {

  const fetchProject = () => {
    axios.get(SERVER_URL).then((results) => {
      this.setState({
        projects: results.data
      });
    });
  };
  fetchProject();
}

  _handleChange(tags) {
    this.setState({tags});
    //this.setState({tags})
  }
  _handleName(event) {
    this.setState((state) => ({ ...state, name: event.target.value }));
  };
  _handleDescription(event) {
    this.setState({description: event.target.value})
  };
  _handleSkills(tags) {
    this.setState({tags});
  };
  // _handleSkills(event) {
  //   this.setState({skills: event.target.value})
  // };

  _handlePayment(event) {
    this.setState({paymentType: event.target.value})
  };

  _handleBudget(event) {
    this.setState({estimatedBudget: event.target.value})
  };

  _handleSubmit(event) {
    event.preventDefault();
    this.setState({
      skills: this.state.tags,
      name: this.state.name,
      description: this.state.description,
      paymentType: this.state.paymentType,
      estimatedBudget: this.state.estimatedBudget,
      redirect: "/projects"
    });
  };

  _handleCreate(event) {
    const data = {
      skills: this.state.tags,
      name: this.state.name,
      description: this.state.description,
      paymentType: this.state.paymentType,
      estimatedBudget: this.state.estimatedBudget,
    };
    console.log(data);

    axios.post(SERVER_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
    <div className="form-group">
      <form onSubmit={this._handleSubmit}>
        <h1>New Project</h1>
        <h3>Project name</h3>
        <input
          className="form-control"
          onChange={this._handleName}
          value={this.state.name}
          placeholder="name"
          required
        />

        <h3>Description</h3>
        <input
          className="form-control"
          onChange={this._handleDescription}
          value={this.state.description}
          type="text"
          placeholder="description"
          required
        />

        <h3>Skills</h3>
        <TagsInput
          className="form-control"
          onChange={this._handleChange}
          value={this.state.tags}
          type="text"
          placeholder="Skills "
          required
        />

        <h3>Payment Type</h3>
        <select className="form-control"
                onChange={this._handlePayment}
                value={this.state.paymentType}
                type="text"
                placeholder="payment"
                required>
          <option value="" >Select paymentType</option>
          <option value="Fixed-Price">Fixed Price</option>
          <option value="Hourly-Rate">Hourly Rate</option>
        </select>

        <h3>Estimated Budget</h3>
        <input
          className="form-control"
          onChange={this._handleBudget}
          value={this.state.estimatedBudget}
          type="text"
          placeholder="estimatedBudget"
          required
        />

        <input
          className="form-control"
          id="submit"
          onClick={this._handleCreate}
          type="submit"
          value="Save"
        />
      </form>
    </div>
  );
  }
}
export default CreateProject;
