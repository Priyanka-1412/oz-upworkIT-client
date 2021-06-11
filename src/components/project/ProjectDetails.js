import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const SERVER_URL = "http://localhost:3000/projects";

function ProjectDetails({ match }) {

	// const { project_id } = useParams();
	const project_id = match.params.projectId;
	const { data: project, isLoading, isError, error } = useQuery(["Project", project_id], () => axios(`${SERVER_URL}/${project_id}`).then((res) => res.data));

	if (isLoading) return <div className="loading">Loading...</div>;
	if (isError) return <h1>{error}</h1>;

	const { name, description, phone, email, skills, paymentType, estimatedBudget, datePosted } = project;

	return (
		<>
			<h1 class="ProjectHeading" style={{fontSize: '2rem', textTransform: 'uppercase'}}>{name}</h1>
			<div style={{marginLeft: '20rem', padding: 'auto'}}>
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

				<p>PaymentType: {paymentType}</p>

				<p>EstimatedBudget $: {estimatedBudget}</p>
				<p><p>Contact me for more details: {phone}</p></p>
				<p>Email me if you are interested $: {email}</p>
				<p><p>Date posted : {datePosted} </p></p>
			</div>

		</>
	);
}

export default ProjectDetails;
