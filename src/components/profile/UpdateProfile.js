import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/profiles";

function UpdateProfile ({ match }) {
  const profile_id = match.params.profileId;

  let { data: profile, isLoading, isError, error } = useQuery(["Profile", profile_id], () => axios(`${SERVER_URL}/${profile_id}`).then((res) => res.data));

  //var data = profile;

  if (! profile) profile = {};

  let [redirect, setRedirect] = React.useState("")
  let [imageUrl, setImageUrl] = React.useState(profile.imageUrl);
  let [name, setName] = React.useState(profile.name);
  let [title, setTitle] = React.useState(profile.title);
  let [skills, setSkills] = React.useState(profile.skills);
  let [suburb, setSuburb] = React.useState(profile.suburb);
  let [postcode, setPostcode] = React.useState(profile.postcode);
  let [resume, setResume] = React.useState(profile.resume);
  let [portfolio, setPortfolio] = React.useState(profile.portfolio);
  let [linkedIn, setLinkedIn] = React.useState(profile.linkedIn);
  let [previewSource, setPreviewSource] = React.useState("");

  if (redirect) {
    return <Redirect to={redirect} />
  }
  const handleSave = (event) => {
    console.log("profile before save:", profile);
    const data = profile;
    console.log("data:", data);
    data.previewSource = {previewSource};
    console.log("data after preview:", data);

    axios.put(SERVER_URL+"/"+profile_id, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setRedirect(`/profile/${profile_id}`);
  }
  const handleName = (event) => {
    profile.name = event.target.value;
    setName(event.target.value);
  }
  const handleImageUrl = (event) => {
    profile.imageUrl = event.target.value;
    const file = event.target.files[0]
    //let result = previewFile(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
      //profile.previewSource = reader.result;
      //result = reader.result;
    };
    //console.log(profile);
    //profile = profile;
    //console.log("result=",result);
    //data.previewSource = profile.previewSource;
    //console.log(profile);
    //setPreviewSource(profile.previewSource);
    setImageUrl(event.target.value)
  }

  const handletitle = (event) => {
    profile.title = event.target.value
    setTitle(event.target.value)
  }
  const handleSkills = (event) => {
    profile.skills = event.target.value
    setSkills(event.target.value)
  }
  const handleSuburb = (event) => {
    profile.suburb = event.target.value
    setSuburb(event.target.value)
  }
  const handlePostcode = (event) => {
    profile.postcode = event.target.value
    setPostcode(event.target.value)
  }
  const handleResume = (event) => {
    profile.resume = event.target.value
    setResume(event.target.value)
  }
  const handlePorfolio = (event) => {
    profile.portfolio = event.target.value
    setPortfolio(event.target.value)
  }
  const handleLinkedIn = (event) => {
    profile.linkedIn = event.target.value
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
        <input
          className="form-control"
          onChange={handleImageUrl}
          type="file"
          name="image"
          alt="imageUrl"
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
