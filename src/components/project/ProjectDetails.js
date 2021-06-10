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

	const { name, description, skills, paymentType, estimatedBudget, date } = project;

	return (
		<>
			<h1 style={{fontSize: '4rem', textTransform: 'uppercase'}}>{name}</h1>
			<div style={{marginLeft: '20rem', padding: 'auto'}}>
				{project.skills &&
          <div>
            <h4> Professional Skills Required:</h4>
            {project.skills.map((skill) =>
              <p><span>{skill}</span></p>
            )}
          </div>
        }
				<p> Description: {description}</p>
				<p>PaymentType: {paymentType}</p>
				<p>EstimatedBudget $: {estimatedBudget}</p>
			</div>

		</>
	);
}

export default ProjectDetails;
