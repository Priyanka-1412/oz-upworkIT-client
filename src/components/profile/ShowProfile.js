import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import './MyProfile.css'
import { Redirect } from "react-router-dom";
// import background from "../Images/background.jpg"
const SERVER_URL = "http://localhost:3000/profiles";

function ShowProfile ({ match }) {
  const profile_id = match.params.profileId;
  const { data: profile, isLoading, isError, error } = useQuery(["Profile", profile_id], () => axios(`${SERVER_URL}/${profile_id}`).then((res) => res.data));

  const [redirect, setRedirect] = React.useState("")

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

        <li class="contact">Phone Number: {phone}</li>
        <li class="contact"><a href={email} > email</a></li>
        <li class="contact"><a href={github} target="_blank"> Github</a></li>

      </div>

      <div class="profileInfo">
        <h1>Hello,</h1>
        <h2>A bit more about me: </h2>
        <h5>{aboutme}</h5>
        <div>
        {profile.skills &&
          <div>
            <h4> Professional Skills:</h4>
            {profile.skills.map((skill) =>
              <p><span>{skill}</span></p>
            )}
          </div>
        }

        <div class="resume">
          <p><a href={resume} target="_blank"></a>Resume</p>
        </div>

        <div class="linkedIn">
          <p><a href={linkedIn} target="_blank"></a>LinkedIn</p>
        </div>

        <div class="portfolio">
          <p><a href={portfolio} target="_blank"></a>Portfolio</p>
        </div>
      </div>

    </div>
    </div>
  );
}

export default ShowProfile;
