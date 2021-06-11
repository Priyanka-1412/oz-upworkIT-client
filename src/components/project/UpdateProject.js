import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/projects/user";

function UpdateProject ({ match }) {
  const user_id = match.params.projectId;

  const { data: project, isLoading, isError, error } =
  useQuery(["Project", user_id], () => axios(`${SERVER_URL}/${user_id}`).then((res) => res.data));

  let data = project;
  console.log("My project", project);
  if (! project) project = {};
  const [redirect, setRedirect] = React.useState("")
  const [name, setName] = React.useState(project.project[0].name);
  const [phone, setPhone] = React.useState(project.project[0].phone);
  const [email, setEmail] = React.useState(project.project[0].email);
  const [skills, setSkills] = React.useState(project.project[0].skills);
  const [description, setDescription] = React.useState(project.project[0].description);
  const [paymentType, setPaymentType] = React.useState(project.project[0].paymentType);
  const [estimatedBudget, setEstimatedBudget] = React.useState(project.project[0].estimatedBudget);

  if (redirect) {
    return <Redirect to={redirect} />
  }

  axios.put(SERVER_URL+"/"+user_id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleSave = (event) => {
    setRedirect(`/profiles/user/${user_id}`);
  }
  const handleName = (event) => {
    setName(event.target.value)
  }

  const handlePhone = (event) => {
    setPhone(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
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

  const handlePayment = (event) => {
    setPaymentType(event.target.value)
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <h1>{error}</h1>;

  // const { imageUrl, name, skills, title, suburb, postcode, resume, portfolio, linkedIn } = profile;

  return (
    <>
    <div className="form-group">
      <form onSubmit={this._handleSubmit}>
        <h1>Update Project</h1>
        <h3>Name for your project</h3>
        <input
          className="form-control"
          onChange={handleName}
          value={name}
          placeholder="name"
          required
        />

        <h3>Tell us more about your project</h3>
        <input
          className="form-control"
          onChange={handleDescription}
          value={description}
          type="text"
          placeholder="description"
          required
        />

        <h3>Skills Required</h3>
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
        <h3>Phone Number</h3>
          <input
            className="form-control"
            onChange={handlePhone}
            value={phone}
            type="text"
            placeholder="Phone"
            required
          />
        <h3>Email</h3>
          <input
            className="form-control"
            onChange={handleEmail}
            value={email}
            type="text"
            placeholder="email"
            required
          />

      </form>
    </div>
    <button id="save" onClick={handleSave} >Save Changes</button>
    </>
  );
}

export default UpdateProject;
