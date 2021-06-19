import React, { Component } from "react"; // destructuring
import { Redirect } from "react-router-dom";
import './Home.css';
import Search from "../project/Search"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
}
  render() {
    return (
      <div className="home">

        <div className="homeDiv">
          <div className="div1">
            <h1 class="homeHeading">Hire the best Software Developer for any job, online.</h1>
            <p>How can ozWorkIT help your business?
              The possibilities are endless. We have expert freelancers who work in every technical, professional, and creative field imaginable.</p><br></br>
            <h3>Choose from endless possibilities</h3>
            <p>  Get anything done, exactly how you want it. Turn that spark of an idea into reality.</p>
            <div>
              <div class="headingDiv1">
                <h4>Any sized project</h4>
                <p>Get any job done. From small one-off tasks to large, multi-stage projects.</p>
              </div>

              <div class="headingDiv2">
                <h4>Flexible payment terms</h4>
                <p>Pay your freelancers a fixed price or by the hour. All secured by the Milestone Payments system..</p>
              </div>

              <div class="headingDiv3">
                <h4>Diverse talent</h4>
                <p>Choose from expert freelancers in over 1800 skill sets, from all around the globe.</p>
              </div>

          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
