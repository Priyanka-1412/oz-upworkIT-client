import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/user";

function MyProfile ({ match }) {
  const user_id = match.params.userId;
  const { data: profile, isLoading, isError, error } = useQuery(["Profile", user_id], () => axios(`${SERVER_URL}/${user_id}`).then((res) => res.data));
  console.log(profile);
  const [redirect, setRedirect] = React.useState("")

  if (redirect) {
    return <Redirect to={redirect} />
  }
  const handleUpdate = (event) => {
    setRedirect(`/profile/${user_id}/update`);
  }

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <h1>{error}</h1>;

  if (profile.profile.length === 0) return <p>loading</p>
    console.log(profile)
    const {  imageUrl, name, skills, email, phone, github, title, aboutme, suburb, postcode, resume, portfolio, linkedIn } = profile.profile[0];

    return (
      <>
      <div class="container">
          <div class="profileHeading">
            <h1>{name}</h1>
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
              <div class="skills" >
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

          <div>
            <button id="update" onClick={handleUpdate} >Update Profile</button>
          </div>
      </div>

      </>
    );
}
export default MyProfile;
