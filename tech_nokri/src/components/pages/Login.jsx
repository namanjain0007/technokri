import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import { useContext, useState } from "react";
import Context from "../../Context/Context";
import axios from "axios";
const Login = () => {
  const { setLogInData, setIsLoggedIn, setTotalAppliedJobs } =
    useContext(Context);
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  function handleData(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(user);

    try {
      const response = await axios.post("http://localhost:5012/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true, // Ye line cookies ko enable karegi
      });
      setSuccessMessage("Login successful");
      setErrorMessage("");

      if (response.status === 200) {
        sessionStorage.setItem("jwt", response.data.token);
        setLogInData(response.data.user);
        try {
          async function checkApplied() {
            try {
              const response2 = await axios.post(
                "http://localhost:5012/checkappliedjobs",
                { _id: response.data.user._id },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              // console.log("loginpage", response2);
              setTotalAppliedJobs(response2.data.count);

              // console.log("len", response.data.len);
            } catch (error) {
              console.log(error);
            }
            setSuccessMessage("Login successful!");
            setTimeout(() => {
              setIsLoggedIn(true);
              navigate("/");
            }, 500);
          }
          checkApplied();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      // console.error(error);
      setErrorMessage(error.response.data.mess);
      setSuccessMessage("");
      // alert("Error login ");
    }
  }
  return (
    <>
      <div className="login-container">
        <div className="text-center mt-3">
          <p>
            <button>
              <b>
                New user?
                <NavLink to="/registration_page" className="register-link">
                  -Register here
                </NavLink>
              </b>
            </button>
          </p>
        </div>

        <div className="form-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={user.email}
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={handleData}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={user.password}
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleData}
                required
              />
            </div>
            <div>
              <button type="submit" name="login" className="btn head-btn1">
                Login
              </button>
            </div>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
