import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import './MyProfile.css'
import phoneImage from "../Images/phoneImage.png"
import emailImage from "../Images/emailImage1.png"
import gitImage from "../Images/gitImage.png"
import { Redirect } from "react-router-dom";

//const SERVER_URL = "http://localhost:3000/profiles";
const SERVER_URL = "https://priyankapatel-oz-upwork.herokuapp.com/profiles";

function ShowProfile ({ match }) {
  const profile_id = match.params.profileId;
  const { data: profile, isLoading, isError, error } = useQuery(["Profile", profile_id], () => axios(`${SERVER_URL}/${profile_id}`).then((res) => res.data));

  const [redirect,
     setRedirect] = React.useState("")

  if (redirect) {
    return <Redirect to={redirect} />
  }
  const handleUpdate = (event) => {
    setRedirect(`/profile/${profile_id}/update`);
  }

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <h1>{error}</h1>;

  const { imageUrl, name, skills, email, phone, github, title, aboutme, suburb, postcode, resume, portfolio, linkedIn } = profile;

  return (
    <div class="container">
      <div>
        <h1 style={{fontSize: '2rem', textTransform: 'uppercase'}}>{name}</h1>
        <h3>{title}</h3>
      </div>

      <hr/>
      <div class="aboutMe">
      <CloudinaryContext cloudName="didtkbpn7">
        <Image class="headshot" publicId={imageUrl}>
          <Transformation
            crop="scale"
            width="300"
            height="200"
            dpr="auto"
            responsive_placeholder="blank" />
      </Image>
      </CloudinaryContext>
        <div>
          <img id= "phoneImage" src={phoneImage} alt={ phone } height="20" width="20" />
          <li id= "phone" class="contact">{phone}</li>
        </div>

        <div>
          <img id= "emailImage" src={emailImage} alt={ email } height="20" width="20" />
          <a id= "email" class="contact" href= {email} >{email}</a>
        </div>

        <div>
          <img id= "gitImage" src={gitImage} alt={ github } height="20" width="20" />
          <a id= "git" class="contact" target="_blank" href={github}>{github}</a>
        </div>
      </div>

      <div class="profileInfo">
        <h1>Hello,</h1>
        <h2>A bit more about me: </h2>
        <h5>{aboutme}</h5>
        <div>
          {profile.skills &&
            <div class="skills">
              <h4> Professional Skills:</h4>
              {profile.skills.map((skill) =>
                <span>{skill}</span>
              )}
            </div>
          }

          <div class="resume">
            <p><a href={resume} target="_blank"></a>Resume</p>
          </div>

          <div class="linkedIn">
            <p><a href={linkedIn} target="_blank">LinkedIn</a></p>
          </div>

          <div class="portfolio">
            <p><a href={portfolio} target="_blank">Portfolio</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProfile;
