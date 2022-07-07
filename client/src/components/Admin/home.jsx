import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactSearchBox from "react-search-box";
import axios from "axios";

const ListNotes = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const [allItems, setItem] = useState();
  const [searchTerm, setSearchTerm] = useState();
  let token = localStorage.getItem("token");
  useEffect(() => {
    const retrieveUsers = async () => {
      try {
        let result = await axios.get(
          "http://localhost:8070/user/type/student",
          {
            headers: {
              token: token,
            },
          }
        );
        setItem(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    retrieveUsers();
  }, []);

  return (
    <div style={{ background: "#9A616D", height: "1000px" }}>
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
                Student List
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
                    <h1 class="jumbotron-heading">NoteScope Members</h1>

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
                          Add Member
                        </a>
                      </Link>
                      <a href="#" class="btn btn-secondary my-2">
                        View Members
                      </a>
                    </p>
                  </div>
                </section>
                <div>
                  <div class="form-outline mb-4">
                    <input
                      onChange={(event) => setSearchTerm(event.target.value)}
                      type="search"
                      class="form-control"
                      id="datatable-search-input"
                      placeholder="Search user"
                    />
                  </div>
                  <table
                    style={{
                      background: "white",
                      padding: "5",
                    }}
                    id="dtBasicExample"
                    class="table table-striped table-bordered table-lg"
                    cellspacing="0"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th class="th-sm">User ID</th>
                        <th class="th-sm">First Name</th>
                        <th class="th-sm">Last Name</th>
                        <th class="th-sm">Bate of Birth</th>

                        <th class="th-sm">Mobile</th>
                        <th class="th-sm">Account Verification</th>
                      </tr>
                    </thead>

                    {allItems ? (
                      allItems
                        .filter((item) => {
                          if (searchTerm == "") {
                            return item;
                          } else if (item.firstName.includes(searchTerm)) {
                            return item;
                          } else if (!searchTerm) {
                            return item;
                          }
                        })
                        .map((item) => {
                          return (
                            <tbody>
                              <tr>
                                <td>{item._id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.dob}</td>
                                <td>{item.mobile}</td>
                                <td>{item.status}</td>
                                <td>{item.accountType}</td>
                              </tr>
                            </tbody>
                          );
                        })
                    ) : (
                      <div class="text-center">
                        <div class="spinner-border m-5" role="status"></div>
                      </div>
                    )}
                  </table>
                </div>
              </main>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListNotes;
