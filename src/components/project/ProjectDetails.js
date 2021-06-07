import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const SERVER_URL = "http://localhost:3000/projects";

function ProjectDetails({ match }) {

	// @ts-ignore
	const { project_id } = useParams();
	const { data: project, isLoading, isError, error } = useQuery(["Project", project_id], () => axios(`${SERVER_URL}/${project_id}`).then((res) => res.data));

	if (isLoading) return <div className="loading">Loading...</div>;
	if (isError) return <h1>{error}</h1>;

	// @ts-ignore
	const { name, description, skills, paymentType, estimatedBudget } = project;

	return (
		<>
			<h1 style={{fontSize: '4rem', textTransform: 'uppercase'}}>{name}</h1>
			<div style={{marginLeft: '10rem', padding: 'auto'}}>
				<p  style={{fontSize: '3rem'}}>${skills}</p>
				<p> Description: {description}</p>
				<p>PaymentType: {paymentType}</p>
				<ul>EstimatedBudget: {estimatedBudget}</ul>
			</div>

		</>
	);
}

export default ProjectDetails;
