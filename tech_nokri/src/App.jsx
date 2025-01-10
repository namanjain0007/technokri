import {
  // BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import FindJob from "./components/pages/FindJob";
import Contact from "./components/pages/Contact";
import NavBar from "./components/NavBar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Footer from "./components/Footer";
import FindJobBySearch from "./components/FindJobBySearch";
import Page404 from "./components/pages/Page404";
import CategoryJobs from "./components/CategoryJobs";
import ProfilePage from "./components/ProfilePage";
import { useContext, useEffect } from "react";
import Context from "./Context/Context";
import Preloader from "./components/Preloader";
import PaymentGateway from "./components/pages/PaymentGateway";
import JobRegistration from "./components/JobRegistration";

import axios from "axios";

const App = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile_page";
  const isViewMore = location.pathname.includes("view_moredetails");

  const {
    isLoggedIn,
    setLoading,
    loading,
    setIsLoggedIn,
    setLogInData,
    setTotalAppliedJobs,
  } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [location.pathname, location.search, setLoading]);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = Cookies.get("jwt");

  //     if (!token) {
  //       setIsLoggedIn(false);
  //       setLogInData({});
  //       return;
  //     }

  //     try {
  //       // JWT ko decode kar rahe hain
  //       const decodedToken = jwtDecode(token);

  //       // Expiry check kar rahe hain
  //       const currentTime = Date.now() / 1000; // Current time in seconds
  //       if (decodedToken.exp < currentTime) {
  //         Cookies.remove("jwt");
  //         setIsLoggedIn(false);
  //         setLogInData({});
  //         console.warn("Token expired, logging out.");
  //         alert("oops session expired");
  //         return;
  //       }

  //       const response = await axios.get("http://localhost:5012/validate", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true,
  //       });

  //       if (response.status === 200) {
  //         setIsLoggedIn(true);
  //         setLogInData(response.data.user);
  //         console.log("authorized");
  //       }
  //     } catch (error) {
  //       console.error("Token validation failed:", error);
  //       Cookies.remove("jwt");
  //       setIsLoggedIn(false);
  //       setLogInData({});
  //     }
  //   };

  //   checkToken();
  // }, []);

  // useEffect(() => {
  //   const loggedInStatus = localStorage.getItem("isLoggedIn");
  //   const storedUser = localStorage.getItem("logInData");

  //   if (loggedInStatus === "true") {
  //     setIsLoggedIn(true);

  //     if (storedUser) {
  //       const userObject = JSON.parse(storedUser);
  //       setLogInData(userObject);
  //       // console.log("abcd", userObject);
  //     }
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [setIsLoggedIn, setLogInData]);

  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem("jwt");
      // console.log("token", token);
      if (!token) {
        // console.log("nothing");
        setIsLoggedIn(false);
        setLogInData({});
        return;
      }

      try {
        const response = await axios.get("http://localhost:5012/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true, //it allows cookies in request
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          setLogInData(response.data.user);
          // console.log("abc", response.data.user);
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
                // console.log("app", response2);
                setTotalAppliedJobs(response2.data.count);

                // console.log("len", response.data.len);
              } catch (error) {
                console.log(error);
              }
            }
            checkApplied();
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        alert("Token validation failed yes:", error);
        navigate("/login");
        // console.log("Token validation failed yes:", error);
        sessionStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setLogInData({});
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    // console.log("isLoggedIn: ", isLoggedIn);
    if (
      (!isLoggedIn && location.pathname === "/profile_page") ||
      (!isLoggedIn && location.pathname.includes("view_moredetails"))
    ) {
      navigate("/login");
    } else if (isLoggedIn && location.pathname === "/login") {
      navigate("/profile_page");
    }
  }, [location.pathname, isLoggedIn, navigate]);

  if (loading) {
    return <Preloader />;
  }
  return (
    <div>
      <>
        {!isProfilePage && !isViewMore && <NavBar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/findajob" element={<FindJob />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration_page" element={<Register />} />
          <Route path="/find_job" element={<FindJobBySearch />} />
          <Route path="/category_jobs" element={<CategoryJobs />} />
          <Route path="/jobregistration" element={<JobRegistration />} />

          {isLoggedIn && <Route path="/profile_page" element=<ProfilePage /> />}
          {isLoggedIn && (
            <Route path="/view_moredetails" element={<ProfilePage />} />
          )}
          <Route path="/payment_gateway" element={<PaymentGateway />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        {!isProfilePage && !isViewMore && <Footer />}
      </>
    </div>
  );
};

export default App;
