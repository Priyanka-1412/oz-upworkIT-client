import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/profiles";

function MyProfile ({ match }) {
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

  const { imageUrl, name, skills, title, suburb, postcode, resume, portfolio, linkedIn } = profile;

  return (
    <>
    <h1 style={{fontSize: '4rem', textTransform: 'uppercase'}}>{name}</h1>
    <div style={{marginLeft: '20rem', padding: 'auto'}}>
      <img src={imageUrl} alt="imageUrl"/>
      <p> Title: {title}</p>
      <p> Skills: {skills}</p>
      <p> Suburb: {suburb}</p>
      <p> postcode: {postcode}</p>
      <a> Resume: {resume}</a>
      <a> portfolio: {portfolio}</a>
      <a> LinkedIn: {linkedIn}</a>

      <button id="update" onClick={handleUpdate} >Update Profile</button>
    </div>
    </>
  );
}

export default MyProfile;
