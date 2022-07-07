import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function AddNote() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function sentData(e) {
    e.preventDefault();

    const newNote = {
      title,
      description,
    };

    let token = localStorage.getItem("token");
    console.log(newNote);
    axios
      .post(
        "http://localhost:8070/note/",

        newNote,
        {
          headers: {
            token: token,
          },
        }
      )
      .then(() => {
        alert("Note added");
        navigate("/allNotes");
      })
      .catch((err) => {
        alert(err);
        console.log(newNote);
      });
  }

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
            href="/createNote"
          >
            NoteScope
          </a>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
                href="/allNotes"
              >
                Add Notes
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
                href="#"
              >
                My Notes
              </a>
            </li>

            <li className="nav-item">
              <a
                className="btn pull-right"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  float: "right",
                }}
                onClick={handleLogout}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="row">
        <section className="vh-100" style={{ background: "#9A616D" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div class="card bg-transparent">
                <img
                  class="card-img"
                  style={{ height: "700px" }}
                  src="https://www.clipartmax.com/png/full/15-156344_clipart-white-sticky-note-transparent-background.png"
                  alt="Card image"
                />
                <div class="card-img-overlay">
                  <h5 class="card-title">Add Your Note</h5>
                  <p class="card-text">
                    <form
                      style={{ padding: "120px", alignItems: "center" }}
                      onSubmit={sentData}
                      className="needs-validation"
                      novalidate
                    >
                      <div className="row g-6">
                        <div className="col-sm-10">
                          <label
                            for="firstName"
                            className="form-label"
                            style={{ color: "black" }}
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder=""
                            required
                            onChange={(e) => {
                              settitle(e.target.value);
                            }}
                          />
                          <div className="invalid-feedback">
                            Valid Product name is required.
                          </div>
                        </div>
                        <hr className="my-4" style={{ color: "transparent" }} />
                        <div className="col-10">
                          <label for="address" className="form-label">
                            Description
                          </label>
                          <textarea
                            rows="7"
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Enter product description"
                            required
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                          <div className="invalid-feedback">
                            Please enter product Description.
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" style={{ color: "transparent" }} />

                      <button
                        style={{ background: "#9A616D", float: "left" }}
                        className="btn btn-primary"
                        type="submit"
                      >
                        Add Note
                      </button>
                    </form>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
