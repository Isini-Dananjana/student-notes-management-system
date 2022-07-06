import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

let EditNote = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const intialState = {
    title: " ",
    description: "",
  };
  const [gotData, setTrue] = useState(false);
  const [item, setItem] = useState(intialState);
  useEffect(() => {
    const retriveData = async () => {
      try {
        let result = await axios.get("http://localhost:8070/note/" + id);
        setItem(result.data);
        console.log(result)
        {
          setTrue(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    retriveData();
  },[id]);

  const handletitle = (e) => {
    let newItem = { ...item };

    newItem.title = e.target.value;
    setItem(newItem);
  };

  const handledescription = (e) => {
    let newItem = { ...item };

    newItem.description = e.target.value;
    console.log(newItem)
    setItem(newItem);
  };

  const updateItem = () => {
    let data = {
      title: item.title,
      description: item.description,
    };

    axios
      .put("http://localhost:8070/note/updateNote/" + id, data)
      .then(function () {
        alert("Note edited");
        
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(data);
    console.log(id);
  };

  return item ? (
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
                 href="/allNotes"
              >
                My Notes
              </a>
            </li>
            <form class="form-inline my-2 my-md-0">
              <input
                class="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
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
                    {gotData ? (
                      <form
                        style={{ padding: "120px", alignItems: "center" }}
                        onSubmit={updateItem}
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
                              id="title"
                              name="title"
                              required
                              value={item.title}
                              onChange={handletitle}
                            />
                            <div className="invalid-feedback">
                              Valid Product name is required.
                            </div>
                          </div>
                          <hr
                            className="my-4"
                            style={{ color: "transparent" }}
                          />
                          <div className="col-10">
                            <label for="address" className="form-label">
                              Description
                            </label>
                            <textarea
                              rows="7"
                              type="text"
                              className="form-control"
                              id="description"
                              name="description"
                              required
                              value={item.description}
                              onChange={handledescription}
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
                          Edit Note
                        </button>
                      </form>
                    ) : (
                      <p></p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div>Data is loading</div>
  );
};

export default EditNote;
