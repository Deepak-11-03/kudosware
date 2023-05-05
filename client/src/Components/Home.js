import React from "react";
import "./Home.css";

function Home() {
  return (
      <div className="home-content">
        <div>
          <h1>Welcome to YourHR</h1>
          <h2>Find your Dream Job</h2>
          <p>
            Just signup with your basic details and upload your resume our team
            will automatically find relevent jobs for you
          </p>
        </div>
        <img src="./homepng.png" alt="boy with phone" height="400px" />
      </div>
  );
}

export default Home;
