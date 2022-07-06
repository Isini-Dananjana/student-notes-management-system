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
    const retrieveUsers = async () => {
      try {
        let result = await axios.get("http://localhost:8070/user/type/student");
        setItem(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    retrieveUsers();
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
                <div>
                <table   style={{
                         
                            background: "white",
                            padding:"5"
                          }}id="dtBasicExample" class="table table-striped table-bordered table-lg" cellspacing="0" width="100%">
                        <thead>
                          <tr>
                            <th class="th-sm">User ID
                      
                            </th>
                            <th class="th-sm">First Name
                      
                            </th>
                            <th class="th-sm">Last Name
                            </th>
                            <th class="th-sm">Bate of Birth</th>
                      
                            <th class="th-sm">Mobile</th>
                            <th class="th-sm">Account Verification</th>
                           
                          </tr>
                        </thead>
                       
                         
                {allItems ? (
                  allItems.map((item) => {
                    return (
                        
                        <tbody>
                          <tr>
                          <td>{item._id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.dob}</td>
                            <td>{item.mobile}</td>
                            <td>{item.status}</td>
                           
                          </tr>
  
                        </tbody>
                      
                    
                    );
                  })
                ) : (
                  <div  class="text-center"><div  class="spinner-border m-5" role="status">
                  
                </div></div>
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
