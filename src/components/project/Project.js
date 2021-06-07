import React, { Component } from "react";
import axios from "axios";
import Link from "@material-ui/core/Link";
// import Form from 'react-bootstrap/Form';
// import ProductDetails from "./ProjectDetails"
const SERVER_URL = "http://localhost:3000/projects";
class Project extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          skills: [],
          name: '',
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
      setTimeout(fetchProject, 4000);
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
  return (
    <div>
      {props.projects.map((project) => (
        <div >
          <Link to={`project/${project.id}`} >
              <p className="project__name">{project.name}</p>
          </Link>
          
        <li className="projects" key={project.id}  >
          Description:{project.description}, Skills:{project.skills}, date:{project.datePosted}, Payment Type:{project.paymentType}, Estimated Budget:{project.estimatedBudget}
        </li>
        </div>
      ))}
    </div>
  );
};

export default Project;