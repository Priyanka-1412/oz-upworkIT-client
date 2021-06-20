import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";

//const SERVER_URL = "http://localhost:3000/projects/user";
//const SERVER_URL = "https://priyankapatel-oz-upwork.herokuapp.com/projects/user";
const SERVER_URL = process.env.REACT_APP_SERVER_ENDPOINT + "/projects/user";

function MyProjectDetails({ match }) {

	// const { project_id } = useParams();
	const user_id = match.params.userId;

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

	const { name, description, phone, email, skills, paymentType, estimatedBudget, datePosted } = project.project[0];

	return (
		<>
			<h1 class="ProjectHeading" style={{fontSize: '2rem', textTransform: 'uppercase'}}>{name}</h1>
				<div class= "projectShow" style={{marginLeft: '20rem', padding: 'auto'}}>
					{skills &&
            <div class="skills">
              <h4> Professional Skills Required:</h4>
              {skills.map((skill) =>
                <span>{skill}</span>
              )}
            </div>
          }
					<h4> Job Description:</h4>
					<p> {description}</p>
					<h5> PaymentType: <span>{paymentType}</span> </h5> <br/>
					<h5> EstimatedBudget $: <span>{estimatedBudget}</span> </h5> <br/>
					<h5> Phone Number: <span>{phone}</span> </h5> <br/>
					<h5> Contact me for more details: <span>{email}</span> </h5> <br/>
					<h5> Date posted : <span>{datePosted}</span> </h5> <br/>
				</div>
				<div>
					<button id="update" onClick={handleUpdate} >Update Project</button>
				</div>
		</>
	);
}

export default MyProjectDetails;
