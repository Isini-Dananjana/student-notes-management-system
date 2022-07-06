import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ListNotes = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const [allItems, setItem] = useState();
  useEffect(() => {
    const retrieveNotes = async () => {
      try {
        let result = await axios.get("http://localhost:8070/note/");
        setItem(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    retrieveNotes();
  }, []);

  return (
    <div style={{ background: "#9A616D" }}>
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
                href="#"
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
        <section className="" style={{ background: "#9A616D" }}>
          <div className="container ">
            <div className="row d-flex">
              <main role="main">
                <section class="jumbotron text-center">
                  <div class="container">
                    <h1 class="jumbotron-heading">My Notes</h1>
                    <p class="lead text-muted">
                      Something short and leading about the collection below—its
                      contents, the creator, etc. Make it short and sweet, but
                      not too short so folks don't simply skip over it entirely.
                    </p>
                    <p>
                      {" "}
                      <Link
                        to={"/createNote"}
                        style={{
                          textDecoration: "none",
                          color: "#787b80",
                        }}
                      >
                        <a href="#" class="btn btn-dark my-2">
                          Add Notes
                        </a>
                      </Link>
                      <a href="#" class="btn btn-secondary my-2">
                        View Notes
                      </a>
                    </p>
                  </div>
                </section>
                {allItems ? (
                  allItems.map((item) => {
                    return (
                      <div
                        style={{ width: "30%", float: "left", margin: "5px" }}
                      >
                        <div class="row">
                          <div class="col s12 m7">
                            <div
                              class="card"
                              style={{
                                width: "24rem",
                                padding: "3px",
                              }}
                            >
                              <div
                                className="card p-3 "
                                style={{
                                  width: "23rem",
                                  color: "#9A616D",
                                  borderWidth: "2px",
                                  margin: "1px",
                                  backgroundColor: "#f2f2f2",
                                  padding: "1px",
                                }}
                              >
                                <b>{item.title}</b>
                              </div>
                              <span
                                class="card-title"
                                style={{ color: "black" }}
                              ></span>
                              <div class="card-content">
                                <p>{item.description}</p>
                              </div>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary"
                                  >
                                    <Link
                                      to={"/editNote/" + item._id}
                                      style={{
                                        textDecoration: "none",
                                        color: "#787b80",
                                      }}
                                    >
                                      Edit
                                    </Link>
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary"
                                    onClick={() => {
                                      deleteItem(item._id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                                <small class="text-muted">9 mins</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>Data is loading</div>
                )}
              </main>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

let deleteItem = (id) => {
  axios
    .delete("http://localhost:8070/note/deleteNote/" + id)
    .then((response) => {
      console.log(response.data);
      alert("deleted successfully");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default ListNotes;
