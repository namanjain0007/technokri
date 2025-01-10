import { useContext } from "react";
import "./CSS/AvailableJobs.css";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
const AvailableJobs = ({ availJobs, classname }) => {
  const { isLoggedIn, setFeaturedData, jobs } = useContext(Context);
  const navigate = useNavigate();

  function handleClick(item) {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (item.availability === "yes") {
        const job = jobs.find(
          (itemm) =>
            itemm.technology.toLowerCase().trim() ===
              item.technology.toLowerCase().trim() && item.id === itemm.id
        );
        setFeaturedData(job);
        navigate(`/view_moredetails?job_id=${item.id}`);
      } else {
        navigate("/payment_gateway");
      }
    }
  }
  return (
    <>
      {availJobs.map((item, i) => (
        <div key={i} className={`${classname}-row`}>
          <div className="col-md-12">
            <div className={`${classname}-job-post`}>
              <div className={`${classname}-job-info`}>
                <b>
                  <h5 className={`${classname}-job-title`}>
                    <b>{item.title}</b>
                  </h5>
                </b>
                <p className={`${classname}-job-details`}>
                  <strong> {item.technology} </strong>
                </p>
                <p className={`${classname}-job-details`}>
                  <b>{item.posted}</b>
                </p>
                <p className={`${classname}-job-details`}>
                  <b style={{ color: "black" }}>DESCRIPTION:</b>
                  <b>{item.description}</b>
                </p>
                <div className={`${classname}-job-description`}></div>
              </div>
              <div className={`${classname}-btn-container`}>
                <button
                  onClick={() => handleClick(item)}
                  className="btn btn-info btn-sm view-job"
                  // data-job-id="56"
                >
                  <i className="fas fa-eye"></i> View Details $ Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AvailableJobs;
