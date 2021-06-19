import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import phoneImage from "../Images/phoneImage.png"
import emailImage from "../Images/emailImage1.png"

//const SERVER_URL = "http://localhost:3000/projects";
const SERVER_URL = "https://priyankapatel-oz-upwork.herokuapp.com/projects";

function ProjectDetails({ match }) {

	const project_id = match.params.projectId;
	const { data: project, isLoading, isError, error } = useQuery(["Project", project_id], () => axios(`${SERVER_URL}/${project_id}`).then((res) => res.data));

	if (isLoading) return <div className="loading">Loading...</div>;
	if (isError) return <h1>{error}</h1>;

	const { name, description, phone, email, skills, paymentType, estimatedBudget, datePosted } = project;

	return (
		<>
			<h1 class="ProjectHeading" style={{fontSize: '2rem', textTransform: 'uppercase'}}>{name}</h1>
			<div class= "projectShow" style={{marginLeft: '20rem', padding: 'auto'}}>
				{project.skills &&
          <div div class="skills">
            <h4> Professional Skills Required:</h4>
            {project.skills.map((skill) =>
              <span>{skill}</span>
            )}
          </div>
        }
				<h4> Job Description:</h4>
				<p> {description}</p>

				<h5> PaymentType: <span>{paymentType}</span> </h5> <br/>
				<h5> EstimatedBudget $: <span>{estimatedBudget}</span> </h5> <br/>
				<h5> Date posted : <span>{datePosted}</span> </h5> <br/>

				<div>
					<img id= "phoneImage" src={phoneImage} alt={phone}height="20" width="20" />
					<li id= "phone" class="contact">{phone}</li>
				</div>

				<div>
					<img id= "emailImage" src={emailImage} alt={email}height="20" width="20" />
					<li id= "email" class="contact" href={email}>{email}</li>
				</div>
			</div>

		</>
	);
}

export default ProjectDetails;
