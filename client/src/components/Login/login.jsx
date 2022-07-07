import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8070/user/signin";
      axios.post(url, data).then((response) => {
        console.log(response.data);

        let status = response.data.status;
        let accountType = response.data.accountType;
        let token = response.data.accessToken;
        let id = response.data.id;
        localStorage.setItem("token", response.data.accessToken);
        console.log(status);
        console.log(token);
        if (token) {
          if (status === false) {
            window.location.href = "/profile/" + id;
            // this.props.history.push('/adminHome');
          } else {
            if (accountType === "student") {
              window.location.href = "/allNotes";
            } else if (accountType === "admin") {
              window.location.href = "/admin";
            } else setError("Invalid User");
          }
        }
      });
    } catch (error) {
      // if (
      //   error.response &&
      //   error.response.status >= 400 &&
      //   error.response.status <= 500
      // ) {
      if (error) {
        setError("Invalid Username Or Password");
      }
    }
  };
  return (
    <div>
      <section className="vh-100" style={{ background: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ border: "1rem;" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://images.unsplash.com/photo-1567168544646-208fa5d408fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHVuaXZlcnNpdHklMjBzdHVkZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      alt="login form"
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
                          <span className="h1 fw-bold mb-0">Login</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3">
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            id="form2Example17"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="form2Example17">
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            id="form2Example27"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          {error && (
                            <div className={styles.error_msg}>{error}</div>
                          )}
                          <div className="pt-1 mb-2"></div>
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?
                          <Link to="/signup">
                            <a href="#!" style={{ color: "#393f81" }}>
                              Register here
                            </a>
                          </Link>{" "}
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
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

export default Login;
