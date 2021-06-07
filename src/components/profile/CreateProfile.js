import React, { Component } from "react";
import axios from "axios";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/profiles";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      profiles:
        {
          imageUrl: '',
          name: '',
          skills: [],
          title: '',
          suburb: '',
          postcode: '',
          resume: '',
          portfolio: '',
          linkedIn: '',
          redirect: null,
        },
        tags: []
    };
    this._handleName = this._handleName.bind(this)
    this._handleImgeUrl = this._handleImgeUrl.bind(this);
    this._handletitle = this._handletitle.bind(this);
    this._handleSuburb = this._handleSuburb.bind(this);
    this._handleSkills = this._handleSkills.bind(this);
    this._handlePostcode = this._handlePostcode.bind(this);
    this._handleResume = this._handleResume.bind(this);
    this._handlePrtfolio = this._handlePrtfolio.bind(this);
    this._handleLinkedIn = this._handleLinkedIn.bind(this);
    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCreate = this._handleCreate.bind(this);
  }

componentDidMount() {
  const fetchProfile = () => {
    axios.get(SERVER_URL).then((results) => {
      this.setState({
        profiles: results.data
      });
    });
  };
  fetchProfile();
}

  _handleName(event) {
    this.setState({name: event.target.value });
  };
  _handleImgeUrl(event) {
    this.setState({imageUrl: event.target.value});
  };
  _handletitle(event) {
    this.setState({title: event.target.value});
  };
  _handleSkills(tags) {
    this.setState({tags});
  };
  _handleSuburb(event) {
    this.setState({suburb: event.target.value});
  };
  _handlePostcode(event) {
    this.setState({postcode: event.target.value});
  };
  _handleResume(event) {
    this.setState({resume: event.target.value});
  };
  _handlePrtfolio(event) {
    this.setState({portfolio: event.target.value});
  };
  _handleLinkedIn(event) {
    this.setState({linkedIn: event.target.value});
  };
  _handleChange(tags) {
    this.setState({tags});
  };

  _handleSubmit(event) {
    event.preventDefault();
    this.setState({
      skills: [],
      name: '',
      imageUrl: '',
      title: '',
      suburb: '',
      postcode: '',
      resume: '',
      portfolio: '',
      linkedIn: '',
      redirect: "/profiles"
    });
  };

  _handleCreate(event) {
    const data = {
      skills: this.state.tags,
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      title: this.state.title,
      suburb: this.state.suburb,
      postcode: this.state.postcode,
      resume: this.state.resume,
      portfolio: this.state.portfolio,
      linkedIn: this.state.linkedIn
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
        <h1>Profile</h1>

        <h3>Name</h3>
        <input
          className="form-control"
          onChange={this._handleName}
          value={this.state.name}
          placeholder="name"
          required
        />

        <h3>Profile Picture</h3>
        <img
          className="form-control"
          onChange={this._handleImgeUrl}
          value={this.state.imageUrl}
          type="text"
          placeholder="title"
          alt="imageUrl"
          required
        />

        <h3>Title</h3>
        <input
          className="form-control"
          onChange={this._handletitle}
          value={this.state.title}
          type="text"
          placeholder="title"
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

        <h3>Suburb</h3>
        <input
          className="form-control"
          onChange={this._handleSuburb}
          value={this.state.suburb}
          type="text"
          placeholder="Suburb"
        />

        <h3>Postcode</h3>
        <input
          className="form-control"
          onChange={this._handlePostcode}
          value={this.state.postcode}
          type="text"
          placeholder="Postcode"
        />

        <h3>Upload Your Resume</h3>
        <input
          className="form-control"
          onChange={this._handleResume}
          value={this.state.resume}
          type="text"
          placeholder="Resume"
        />

      <h3>Connect with LinkedIn</h3>
        <input
          className="form-control"
          onChange={this._handleLinkedIn}
          value={this.state.linkedIn}
          type="text"
          placeholder="LInkedIn"
        />

        <h3>Link to Portfolio</h3>
        <input
          className="form-control"
          onChange={this._handlePrtfolio}
          value={this.state.portfolio}
          type="text"
          placeholder="Portfolio"
        />

        <input
          className="form-control"
          id="submit"
          onClick={this._handleCreate}
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
  }
}
export default CreateProfile;
