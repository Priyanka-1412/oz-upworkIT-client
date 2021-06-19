import axios from "axios";
import React, {useState} from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

//const SERVER_URL = "http://localhost:3000/user";
const SERVER_URL = "https://priyankapatel-oz-upwork.herokuapp.com/user";

function UpdateProfile ({ match }) {
  const user_id = match.params.userId;

  let { data: profile, isLoading, isError, error } =
  useQuery(["Profile", user_id], () => axios(`${SERVER_URL}/${user_id}`).then((res) => res.data));
  // console.log('profile', profile)
  let data = profile;

  if (! profile) profile = {};

  let [redirect, setRedirect] = useState("")
  let [imageUrl, setImageUrl] = useState(profile.profile[0].imageUrl);
  let [name, setName] = useState(profile.profile[0].name);
  let [title, setTitle] = useState(profile.profile[0].title);
  let [aboutme, setAboutme] = useState(profile.profile[0].aboutme);
  let [phone, setPhone] = useState(profile.profile[0].phone);
  let [email, setEmail] = useState(profile.profile[0].email);
  let [skills, setSkills] = useState(profile.profile[0].skills);
  let [suburb, setSuburb] = useState(profile.profile[0].suburb);
  let [postcode, setPostcode] = useState(profile.profile[0].postcode);
  let [resume, setResume] = useState(profile.profile[0].resume);
  let [portfolio, setPortfolio] = useState(profile.profile[0].portfolio);
  let [linkedIn, setLinkedIn] = useState(profile.profile[0].linkedIn);
  let [github, setGithub] = useState(profile.profile[0].github);
  let [previewSource, setPreviewSource] = useState("");

  if (redirect) {
    return <Redirect to={redirect} />
  }
  const handleSave = (event) => {
    // console.log("profile before save:", profile);
    const data = profile;
    // console.log("data:", data);
    data.previewSource = {previewSource};
    // console.log("data after preview:", data);

    axios.put(SERVER_URL+"/"+user_id, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setRedirect(`/user/${user_id}`);
  }
  const handleName = (event) => {
    profile.profile[0].name = event.target.value;
    setName(event.target.value);
  }
  const handleImageUrl = (event) => {
    profile.profile[0].imageUrl = event.target.value;
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

  const handleTitle = (event) => {
    profile.profile[0].title = event.target.value
    setTitle(event.target.value)
  }
  const handleSkills = (event) => {
    profile.profile[0].skills = event.target.value
    setSkills(event.target.value)
  }
  const handleAboutme = (event) => {
    profile.profile[0].aboutme = event.target.value
    setAboutme(event.target.value)
  }
  const handlePhone = (event) => {
    profile.profile[0].phone = event.target.value
    setPhone(event.target.value)
  }
  const handleEmail = (event) => {
    profile.profile[0].email = event.target.value
    setEmail(event.target.value)
  }
  const handleSuburb = (event) => {
    profile.profile[0].suburb = event.target.value
    setSuburb(event.target.value)
  }
  const handlePostcode = (event) => {
    profile.profile[0].postcode = event.target.value
    setPostcode(event.target.value)
  }
  const handleResume = (event) => {
    profile.profile[0].resume = event.target.value
    setResume(event.target.value)
  }
  const handlePorfolio = (event) => {
    profile.profile[0].portfolio = event.target.value
    setPortfolio(event.target.value)
  }
  const handleLinkedIn = (event) => {
    profile.profile[0].linkedIn = event.target.value
    setLinkedIn(event.target.value)
  };

  const handleGithub = (event) => {
    profile.profile[0].github = event.target.value
    setLinkedIn(event.target.value)
  };

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
          onChange={handleTitle}
          value={title}
          type="text"
          placeholder="title"
          required
        />
        <h3>About Me</h3>
        <input
          className="form-control"
          onChange={handleAboutme}
          value={aboutme}
          type="text"
          placeholder="About me"
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

          <h3>Phone number</h3>
          <input
            className="form-control"
            onChange={handlePhone}
            value={phone}
            type="text"
            placeholder="contact number"
            required
          />

          <h3>Email</h3>
          <input
            className="form-control"
            onChange={handleEmail}
            value={email}
            type="text"
            placeholder="contact number"
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

        <h3>Link to Github</h3>
        <input
          className="form-control"
          onChange={handleGithub}
          value={github}
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
