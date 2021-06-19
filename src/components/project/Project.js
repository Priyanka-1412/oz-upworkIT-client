import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Search from "./Search"
import phoneImage from "../Images/phoneImage.png"
import emailImage from "../Images/emailImage1.png"

//const SERVER_URL = "http://localhost:3000/projects";
const SERVER_URL = "https://priyankapatel-oz-upwork.herokuapp.com/projects";
class Project extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          skills: [],
          name: '',
          email: '',
          phone: '',
          description: '',
          paymentType: '',
          estimatedBudget: 0
        },
      ],
    };
}
//
// delete(project){
//   const data = this.state.projects.filter(i => i.id !== project._id)
//   this.setState({project})
// }

componentDidMount() {

  const fetchProject = () => {
    axios.get(SERVER_URL).then((results) => {
      console.log(results);
      this.setState({
        projects: results.data
      });
    });
  };
  fetchProject();
}

render() {
  return (
    <div>
      <ProjectList projects={this.state.projects} />
    </div>
    )
  };
};

const ProjectList = (props) => {
  console.log(props.projects);
  return (
    <div class="project1" >
      {props.projects.map((project) => (
        <div>
          <Link to={`project/${project._id}`} >
            <h4>{project.name}</h4>
          </Link>

          <p className="projects" key={project._id}></p>
          <h4> Job Description: </h4>
          <p> {project.description}</p>
            {project.skills &&
              <div class="skills">
                <h4> Professional Skills Required:</h4>
                {project.skills.map((skill) =>
                  <span>{skill}</span>
                )}
              </div>
            }
          <p> Payment Type: {project.paymentType}</p>
          <p>Estimated Budget $ :{project.estimatedBudget}</p>
          <p>Date Posted:{project.datePosted}</p>

          <div>
            <img id= "phoneImage" src={phoneImage} alt={project.phone}height="20" width="20" />
            <li id= "phone" class="contact">{project.phone}</li>
          </div>

          <div>
            <img id= "emailImage" src={emailImage} alt={project.email}height="20" width="20" />
            <li id= "email" class="contact" href={project.email}>{project.email}</li>
          </div>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default Project;
