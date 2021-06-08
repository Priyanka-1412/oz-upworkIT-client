import React, { Component } from "react";
import axios from "axios";
import TagsInput from 'react-tagsinput';
import AuthService from "../../services/auth.service";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

import 'react-tagsinput/react-tagsinput.css';

import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/profiles";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      profiles:
        {
          imageUrl: null,
          name: '',
          skills: [],
          title: '',
          suburb: '',
          postcode: '',
          resume: '',
          portfolio: '',
          linkedIn: '',
          redirect: null,
          previewSource: '',
          userReady: false,
          currentUser: { username: "" }
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
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) this.setState({ redirect: "/login" });
  this.setState({ currentUser: currentUser, userReady: true })

  const fetchProfile = () => {
    axios.get(SERVER_URL).then((results) => {
      this.setState({
        profiles: results.data
      });
    });
  };
  fetchProfile();
};
  _handleName(event) {
    this.setState({name: event.target.value });
  };
  _handleImgeUrl(event) {
    this.setState({imageUrl: event.target.files[0]});
    const file = event.target.files[0]
    const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({previewSource: reader.result});
        };
    //previewFile(this.state.imageUrl);
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
      linkedIn: this.state.linkedIn,
      previewSource: this.state.previewSource
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
    };

    const { currentUser } = this.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
    <div>
      {(this.state.userReady) ?

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
            <input
              className="form-control"
              onChange={this._handleImgeUrl}

              type="file"
              name="image"
              alt="imageUrl"
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
              type="file"
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

          {this.state.previewSource && (
            <img
                src={this.state.previewSource}
                alt="chosen"
                style={{ height: '300px' }}
            />
          )}
        </div>: null}
  </div>
  );
  }
}
export default CreateProfile;
