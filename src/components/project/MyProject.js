import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";

const SERVER_URL = "http://localhost:3000/projects/user";

function MyProjectDetails({ match }) {

	// const { project_id } = useParams();
	const user_id = match.params.user_id;
	const { data: project, isLoading, isError, error } =
	useQuery(["Project", user_id], () => axios(`${SERVER_URL}/${user_id}`).then((res) => res.data));

	const [redirect, setRedirect] = React.useState("")

	if (redirect) {
		return <Redirect to={redirect} />
	}

	const handleUpdate = (event) => {
		setRedirect(`/project/${user_id}/update`);
	}

	if (isLoading) return <div className="loading">Loading...</div>;
	if (isError) return <h1>{error}</h1>;

	if (project.project.length === 0) return <p>loading</p>
	console.log("my projects",  project)

	const { name, description, phone, email, skills, paymentType, estimatedBudget, datePosted } = project.project[0];

	return (
		<>
			<div >
				<Link to={`project/${project._id}`} >
							<h1 style={{fontSize: '2rem', textTransform: 'uppercase'}}>{name}</h1>
				</Link>

				<div style={{marginLeft: '20rem', padding: 'auto'}}>
					{project.skills &&
	          <div class="skills">
	            <h4> Professional Skills Required:</h4>
	            {project.skills.map((skill) =>
	              <span>{skill}</span>
	            )}
	          </div>
	        }
					<p>Job Description: {description}</p>
					<p>PaymentType: {paymentType}</p>
					<p>EstimatedBudget $: {estimatedBudget}</p>
					<p><p>Contact me for more details: {phone}</p></p>
					<p>Email me if you are interested $: {email}</p>
					<p><p>Date posted : {datePosted} </p></p>
				</div>

				<div>
					<button id="update" onClick={handleUpdate} >Update Project</button>
				</div>
			</div>
		</>
	);
}

export default MyProjectDetails;
