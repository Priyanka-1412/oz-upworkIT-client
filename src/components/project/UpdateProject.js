import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

//const SERVER_URL = "http://localhost:3000/projects/user";
 const SERVER_URL = "https://priyankapatel-oz-upwork.herokuapp.com/projects/user";

function UpdateProject ({ match }) {
  const user_id = match.params.userId;

  let { data: project, isLoading, isError, error } =
  useQuery(["Project", user_id], () => axios(`${SERVER_URL}/${user_id}`).then((res) => res.data));

  let data = project;

  // if (! project) project = {};
  let [redirect, setRedirect] = React.useState("")
  let [name, setName] = React.useState(project.project[0].name);
  let [phone, setPhone] = React.useState(project.project[0].phone);
  let [email, setEmail] = React.useState(project.project[0].email);
  let [skills, setSkills] = React.useState(project.project[0].skills);
  let [description, setDescription] = React.useState(project.project[0].description);
  let [paymentType, setPaymentType] = React.useState(project.project[0].paymentType);
  let [estimatedBudget, setEstimatedBudget] = React.useState(project.project[0].estimatedBudget);

  if (redirect) {
    return <Redirect to={redirect} />
  }

  const handleSave = (event) => {

    let data = project;

    console.log(data);
    axios.put(SERVER_URL+"/"+user_id, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setRedirect(`/projects/user/${user_id}`);
  };

  const handleName = (event) => {
    project.project[0].name = event.target.value;
    setName(event.target.value)
    console.log(project.project[0].name);
  }

  const handlePhone = (event) => {
    project.project[0].phone = event.target.value;
    setPhone(event.target.value)
  }

  const handleEmail = (event) => {
    project.project[0].email = event.target.value;
    setEmail(event.target.value)
  }
  const handleSkills = (event) => {
    project.project[0].skills = event.target.value;
    setSkills(event.target.value)
  }
  const handleDescription = (event) => {
    project.project[0].description = event.target.value;
    setDescription(event.target.value)
  }
  const handleBudget = (event) => {
    project.project[0].estimatedBudget = event.target.value;
    setEstimatedBudget(event.target.value)
  }

  const handlePayment = (event) => {
    project.project[0].paymentType = event.target.value;
    setPaymentType(event.target.value)
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <h1>{error}</h1>;

  // const { imageUrl, name, skills, title, suburb, postcode, resume, portfolio, linkedIn } = profile;

  return (
    <>
    <div className="form-group">
      <form>
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
          type="number"
          placeholder="$"
          required
        />
        <h3>Enter your phone number:</h3>
        <input
          className="form-control"
          onChange={handlePhone}
          value={phone}
          type="number"
          id="phone"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="041-002-6781"
          required
        />
        <h3>Email</h3>
        <input
          className="form-control"
          onChange={handleEmail}
          value={email}
          type="email"
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
