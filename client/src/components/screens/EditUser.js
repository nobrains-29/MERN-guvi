import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import M from "materialize-css";

const EditUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const { userId } = useParams();

  const uploadFields = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return M.toast({
        html: "Invalid Email",
        classes: "#d32f2f red darken-2",
      });
    }
    fetch(`/edituser/${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        password,
        email,
        age,
        mobile,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({
            html: data.message,
            classes: "#689f38 light-green darken-2",
          });
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    uploadFields();
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h3>Edit User</h3>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #2196f3 blue"
          onClick={() => PostData()}
        >
          Edit
        </button>
        <h5>
          <Link to="/home">Go Back</Link>
        </h5>
      </div>
    </div>
  );
};

export default EditUser;
