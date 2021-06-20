import React, { Component } from "react";
import axios from "axios";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import AuthService from "../../services/auth.service";
import { Redirect } from "react-router-dom";

//const SERVER_URL = "http://localhost:3000/projects";
//const SERVER_URL = "https://priyankapatel-oz-upwork.herokuapp.com/projects";
const SERVER_URL = process.env.REACT_APP_SERVER_ENDPOINT + "/projects";

class CreateProject extends Component {
  constructor() {
    super();

    this.state = {
      projects:
        {
          skills: [],
          name: '',
          phone: '',
          email: '',
          description: '',
          paymentType: '',
          estimatedBudget: 0,
          redirect: null,
          userReady: false,
        },
        currentUser: {},
        tags: []
    };

    this._handleChange = this._handleChange.bind(this)
    this._handleName = this._handleName.bind(this);
    this._handleDescription = this._handleDescription.bind(this);
    this._handleSkills = this._handleSkills.bind(this);
    this._handlePhone = this._handlePhone.bind(this);
    this._handleEmail = this._handleEmail.bind(this);
    this._handlePayment = this._handlePayment.bind(this);
    this._handleBudget = this._handleBudget.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCreate = this._handleCreate.bind(this);
  }

componentDidMount() {

  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) this.setState({ redirect: "/login" });
  this.setState({ currentUser: currentUser, userReady: true })

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
  _handlePhone(event) {
    this.setState({phone: event.target.value});
  };
  _handleEmail(event) {
    this.setState({email: event.target.value});
  };
  _handlePayment(event) {
    this.setState({paymentType: event.target.value})
  };
  _handleBudget(event) {
    this.setState({estimatedBudget: event.target.value})
  };
  _handleSubmit(event) {
    event.preventDefault();
    this.setState({
      skills: [],
      name: '',
      description: '',
      paymentType: '',
      phone: '',
      email: '',
      estimatedBudget: '',
      redirect: "/projects",
    });
  };
  _handleCreate(event) {
    const data = {
      skills: this.state.tags,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      description: this.state.description,
      paymentType: this.state.paymentType,
      estimatedBudget: this.state.estimatedBudget,
      user: this.state.currentUser.id
    };

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
    const { currentUser } = this.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div>
      {(this.state.userReady) ?
        <div className="form-group">
          <form onSubmit={this._handleSubmit}>
            <h1>New Project</h1>
            <h3>Name for your project</h3>
            <input
              className="form-control"
              onChange={this._handleName}
              value={this.state.name}
              placeholder="name"
              required
            />

            <h3>Tell us more about your project</h3>
            <textarea
              className="form-control"
              onChange={this._handleDescription}
              value={this.state.description}
              type="text"
              placeholder="project description"
              required
            />

            <h3>Skills Required</h3>
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
              type="number"
              placeholder="$"
              required
            />

            <h3>Phone Number</h3>
            <input
              className="form-control"
              onChange={this._handlePhone}
              value={this.state.phone}
              type="number"
              placeholder="Phone"
              required
            />

            <h3>Email</h3>
            <input
              className="form-control"
              onChange={this._handleEmail}
              value={this.state.email}
              type="email"
              placeholder="email"
              required
            />

          <button id="submit" onClick={this._handleCreate} >Post Project</button>
          </form>
        </div>: null}
      </div>
  );
  }
}
export default CreateProject;
