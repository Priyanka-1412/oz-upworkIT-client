import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
// import Link from "@material-ui/core/Link";

const SERVER_URL = "http://localhost:3000/profiles";

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
          redirect: null,
        },
      ],
        tags: []
    };
}
//
// delete(project){
//   const data = this.state.projects.filter(i => i.id !== project._id)
//   this.setState({project})
// }

componentDidMount() {

  const fetchProfile = () => {
    axios.get(SERVER_URL).then((results) => {
      console.log(results);
      this.setState({
        profiles: results.data
      });
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
    <div>
      {props.profiles.map((profile) => (
        <div >
        <Link to={`profile/${profile._id}`} >
            <p className="project__name">{profile.name}</p>
        </Link>
        <li className="profiles" key={profile.id} >
          title:{profile.title},
          Skills:{profile.skills},
          suburb:{profile.suburb},
          postcode:{profile.postcode},
          resume:{profile.postcode},
          portfolio:{profile.portfolio},
          linkedIn:{profile.linkedIn}
        </li>
        </div>
      ))}
    </div>
  );
};

export default ProfileDetails;
