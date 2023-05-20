import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [userProfile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
      });
  }, []);

  return (
    <>
      {userProfile ? (
        <div className="mycard">
          <div className="card auth-card input-field">
            <div>
              <Link to={`/edituser/${userProfile.user._id}`}>
                <i className="material-icons" style={{ float: "right" }}>
                  edit
                </i>
              </Link>
            </div>
            <h4>{userProfile.user.name}</h4>
            <h5>{userProfile.user.email}</h5>
            <h5>{userProfile.user.age}</h5>
            <h5>{userProfile.user.mobile}</h5>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default Home;
