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
    const { imageUrl, name, phone, email, github, skills, title, aboutme, suburb, postcode, resume, portfolio, linkedIn } = profile.profile[0];

    return (
      <>
      <h1 style={{fontSize: '4rem', textTransform: 'uppercase'}}>{name}</h1>
      <div style={{marginLeft: '20rem', padding: 'auto'}}>
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

        <p> Title: {title}</p>
        {profile.skills &&
          <div>
            <p> Skills:</p>
            {profile.skills.map((skill) =>
              <p>{skill}</p>
            )}
          </div>
        }

        <p> Suburb: {suburb}</p>
        <p> Suburb: {aboutme}</p>
        <p> postcode: {postcode}</p>
        <a> Resume: {resume}</a>
        <a> portfolio: {portfolio}</a>
        <a href={linkedIn} target="_blank" rel="noopener">
          LinkedIn
        </a>

        <button id="update" onClick={handleUpdate} >Update Profile</button>
      </div>
      </>
    );
}

export default MyProfile;
