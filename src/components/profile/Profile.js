import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import Loading from "./Loading";
import ProfileCard from "./ProfileCard";

const SERVER_URL = process.env.REACT_APP_SERVER_ENDPOINT + "/profiles";

class ProfileDetails extends Component {
  constructor() {
    super();
    this.state = {
      profiles: [
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
          github: '',
          email: '',
          phone: '',
          redirect: null,
          isLoading: 1,
        },
      ],
        tags: []
    };
}

componentDidMount() {

  const fetchProfile = () => {

    axios.get(SERVER_URL).then((results) => {
      console.log(results);
      this.setState({
        profiles: results.data
      });
    })
  .catch((error) => {
        alert(error);
        {
          this.state.isLoading = 0;
        }
    });
  };
fetchProfile();
}

render() {
  return (
    <div>
      <Developers profiles={this.state.profiles} />
    </div>
  )
  };
};

const Developers = (props) => {
  return (
    <div className="mainBlock">
      { props.profiles.map((profile) => (
        <ProfileCard
          className="newsCard"
          key={profile._id}
          name={profile.name}
          title={profile.title}
          skills={profile.skills.map((skill) =>
            <div class="skills" >
              <p class="cardSkills">{skill}</p>
            </div>
          )}
          redirect= {`profile/${profile._id}`}
        >
          <CloudinaryContext cloudName="didtkbpn7">
            <Image publicId={profile.imageUrl}>
              <Transformation
                crop="scale"
                width="300"
                height="300"
                dpr="auto"
                responsive_placeholder="blank"
                />
            </Image>
          </CloudinaryContext>
        </ProfileCard>
      ))}
    </div>
  );
};

export default ProfileDetails;
