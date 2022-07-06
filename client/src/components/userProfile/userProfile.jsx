import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { Component } from 'react';
import styles from "./Userprofile.module.css";


// import { Fragment } from "react/cjs/react.production.min";

const UserProfile = () => {
  const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
  const { id } = useParams();
	const url = `http://localhost:8070/user/${param.id}/${param.token}`;
   

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};
    
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a
            className="navbar-brand"
            style={{
              color: "#9A616D",
              padding: "5px",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
            href="#"
          >
            NoteScope
          </a>
        </div>
      </nav>
      <section className="vh-100" style={{ background: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ border: "1rem;" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://images.unsplash.com/photo-1567168544646-208fa5d408fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHVuaXZlcnNpdHklMjBzdHVkZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      alt="Signup form"
                      className="img-fluid"
                      style={{ border: "1rem", height: "100%" }}
                    />
                  </div>

                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: " #ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Logo</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3">User Profile</h5>

                        <div className="form-outline mb-2">
                          <div class="container">
                            <div class="row">
                              <div class="col-sm">
                                {" "}
                                <input
                                  // type="text"
                                  // placeholder="First Name"
                                  // name="firstName"
                                  // onChange={handleChange}
                                  // value={data.firstName}
                                  // required
                                  id="form2Example17"
                                  className="form-control form-control-lg"
                                />
                                <label
                                  className="form-label"
                                  for="form2Example17"
                                >
                                  First Name
                                </label>
                              </div>
                              <div class="col-sm">
                                <input
                                  // type="text"
                                  // placeholder="Last Name"
                                  // name="lastName"
                                  // onChange={handleChange}
                                  // value={data.lastName}
                                  // required
                                  id="form2Example17"
                                  className="form-control form-control-lg"
                                />
                                <label
                                  className="form-label"
                                  for="form2Example17"
                                >
                                  Last Name
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <input
                          type="date"
                          // placeholder="Last Name"
                          // name="lastName"
                          // onChange={handleChange}
                          // value={data.lastName}
                          // required
                          id="form2Example17"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="form2Example17">
                          Date Of Birth
                        </label>

                        <div className="form-outline mb-2">
                          <input
                            // type="text"
                            // placeholder="Last Name"
                            // name="lastName"
                            // onChange={handleChange}
                            // value={data.lastName}
                            // required
                            id="form2Example17"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="form2Example17">
                            Phone
                          </label>
                        </div>

                        <div className="form-outline mb-2">
                          <input
                            // type="email"
                            // placeholder="Email"
                            // name="email"
                            // onChange={handleChange}
                            // value={data.email}
                            // required
                            id="form2Example17"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="form2Example17">
                            Email address
                          </label>
                        </div>
                        <div className="form-outline mb-2">
                          <input
                            name="password"
                            type="password"
							placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            id="form2Example17"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="form2Example17">
                            Reset password
                          </label>
                        </div>

                        <div className="pt-1 mb-2">
                          {error && (
                            <div className={styles.error_msg}>{error}</div>
                          )}
                          {msg && (
                            <div className={styles.success_msg}>{msg}</div>
                          )}
                          <div className="pt-1 mb-2"></div>
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Update Profile
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default UserProfile;
