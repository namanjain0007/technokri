import { useContext, useState } from "react";
import Context from "../Context/Context";
import "./CSS/Courses.css";
import { useNavigate } from "react-router-dom";

const Courses = ({ classname }) => {
  const [tempVal, setTempVal] = useState({ course: "", experience: "" });
  const { setCatTechName, courses, experience, setCourseVal } =
    useContext(Context);
  const navigate = useNavigate();
  const handleCourseVal = (e) => {
    setTempVal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSearch() {
    setCourseVal(tempVal);
    setCatTechName(tempVal.course);

    const catIndex = tempVal.course ? courses.indexOf(tempVal.course) + 1 : "";

    const handleClick = () => {
      const value = `category=${catIndex}&experience=${
        tempVal.experience || ""
      }`;
      // console.log(`?${value}`);
      navigate(`/find_job?${value}`);
    };
    // setTempVal({ course: "", experience: "" });

    handleClick();
  }
  return (
    <>
      <div>
        <div className={`${classname}dropbox-container`}>
          <div className={`${classname}courses-div`}>
            <select
              name="course"
              value={tempVal.course}
              onChange={handleCourseVal}
              className="homeform-control"
            >
              <option value="">Choose a Technology</option>
              {courses.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className={`${classname}courses-div`}>
            <select
              name="experience"
              value={tempVal.experience}
              onChange={handleCourseVal}
              className="homeform-control"
            >
              <option value="">Select Experience</option>
              {experience.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={`${classname}courses-div`}>
            <button
              onClick={handleSearch}
              type="button"
              style={{ backgroundColor: "#fb246a" }}
              className="btn btn-danger"
            >
              <i className="fas fa-search"></i> SEARCH
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
