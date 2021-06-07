import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/projects";

function UpdateProject ({ match }) {
  const project_id = match.params.projectId;
  const { data: project, isLoading, isError, error } = useQuery(["Project", project_id], () => axios(`${SERVER_URL}/${project_id}`).then((res) => res.data));

  const [redirect, setRedirect] = React.useState("")
  const [name, setName] = React.useState(project.name);
  const [skills, setSkills] = React.useState(project.skills);
  const [description, setDescription] = React.useState(project.description);
  const [paymentType, setPaymentType] = React.useState(project.paymentType);
  const [estimatedBudget, setEstimatedBudget] = React.useState(project.estimatedBudget);

  if (redirect) {
    return <Redirect to={redirect} />
  }
  const handleSave = (event) => {
    setRedirect(`/profile/${profile_id}`);
  }
  const handleName = (event) => {
    setName(event.target.value)
  }
  const handleSkills = (event) => {
    setSkills(event.target.value)
  }
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleBudget = (event) => {
    setEstimatedBudget(event.target.value)
  }

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <h1>{error}</h1>;

  // const { imageUrl, name, skills, title, suburb, postcode, resume, portfolio, linkedIn } = profile;

  return (
    <>
    <div className="form-group">
      <form onSubmit={this._handleSubmit}>
        <h1>Update Project</h1>
        <h3>Project name</h3>
        <input
          className="form-control"
          onChange={handleName}
          value={name}
          placeholder="name"
          required
        />

        <h3>Description</h3>
        <input
          className="form-control"
          onChange={handleDescription}
          value={description}
          type="text"
          placeholder="description"
          required
        />

        <h3>Skills</h3>
        <input
          className="form-control"
          onChange={handleSkills}
          value={skills}
          type="text"
          placeholder="Skills "
          required
        />

        <h3>Payment Type</h3>
        <select className="form-control"
                onChange={handlePayment}
                value={paymentType}
                type="text"
                placeholder="payment"
                required>
          <option value="" >Select paymentType</option>
          <option value="Fixed-Price">Fixed Price</option>
          <option value="Hourly-Rate">Hourly Rate</option>
        </select>

        <h3>Estimated Budget</h3>
        <input
          className="form-control"
          onChange={handleBudget}
          value={estimatedBudget}
          type="text"
          placeholder="estimatedBudget"
          required
        />

      </form>
    </div>
    <button id="save" onClick={handleSave} >Save Changes</button>
    </>
  );
}

export default UpdateProfile;
