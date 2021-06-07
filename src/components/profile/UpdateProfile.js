import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/profiles";

function UpdateProfile ({ match }) {
  const profile_id = match.params.profileId;
  const { data: profile, isLoading, isError, error } = useQuery(["Profile", profile_id], () => axios(`${SERVER_URL}/${profile_id}`).then((res) => res.data));

  const [redirect, setRedirect] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState(profile.imageUrl);
  const [name, setName] = React.useState(profile.name);
  const [title, setTitle] = React.useState(profile.title);
  const [skills, setSkills] = React.useState(profile.skills);
  const [suburb, setSuburb] = React.useState(profile.suburb);
  const [postcode, setPostcode] = React.useState(profile.postcode);
  const [resume, setResume] = React.useState(profile.resume);
  const [portfolio, setPortfolio] = React.useState(profile.portfolio);
  const [linkedIn, setLinkedIn] = React.useState(profile.linkedIn);


  if (redirect) {
    return <Redirect to={redirect} />
  }
  const handleSave = (event) => {
    setRedirect(`/profile/${profile_id}`);
  }
  const handleName = (event) => {
    setName(event.target.value)
  }
  const handleImgeUrl = (event) => {
    setImageUrl(event.target.value)
  }
  const handletitle = (event) => {
    setTitle(event.target.value)
  }
  const handleSkills = (event) => {
    setSkills(event.target.value)
  }
  const handleSuburb = (event) => {
    setSuburb(event.target.value)
  }
  const handlePostcode = (event) => {
    setPostcode(event.target.value)
  }
  const handleResume = (event) => {
    setResume(event.target.value)
  }
  const handlePorfolio = (event) => {
    setPortfolio(event.target.value)
  }
  const handleLinkedIn = (event) => {
    setLinkedIn(event.target.value)
  }

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <h1>{error}</h1>;

  // const { imageUrl, name, skills, title, suburb, postcode, resume, portfolio, linkedIn } = profile;

  return (
    <>
    <div className="form-group">
      <form>
        <h1>Profile</h1>
        <h3>Name</h3>
        <input
          className="form-control"
          onChange={handleName}
          value={name}
          placeholder="name"
          required
        />

        <h3>Profile Picture</h3>
        <img
          className="form-control"
          onChange={handleImgeUrl}
          value={imageUrl}
          type="text"
          placeholder="title"
          alt="imageUrl"
          required
        />

        <h3>Title</h3>
        <input
          className="form-control"
          onChange={handletitle}
          value={title}
          type="text"
          placeholder="title"
          required
        />

        <h3>Skills</h3>
        <input
          className="form-control"
          onChange={handleSkills}
          value={skills}
          type="text"
          placeholder="Skills "
          required
        />

        <h3>Suburb</h3>
        <input
          className="form-control"
          onChange={handleSuburb}
          value={suburb}
          type="text"
          placeholder="Suburb"
        />

        <h3>Postcode</h3>
        <input
          className="form-control"
          onChange={handlePostcode}
          value={postcode}
          type="text"
          placeholder="Postcode"
        />

        <h3>Upload Your Resume</h3>
        <input
          className="form-control"
          onChange={handleResume}
          value={resume}
          type="text"
          placeholder="Resume"
        />

      <h3>Connect with LinkedIn</h3>
        <input
          className="form-control"
          onChange={handleLinkedIn}
          value={linkedIn}
          type="text"
          placeholder="LInkedIn"
        />

        <h3>Link to Portfolio</h3>
        <input
          className="form-control"
          onChange={handlePorfolio}
          value={portfolio}
          type="text"
          placeholder="Portfolio"
        />

      </form>
    </div>
      <button id="save" onClick={handleSave} >Save Changes</button>
    </>
  );
}

export default UpdateProfile;
