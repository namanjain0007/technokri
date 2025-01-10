import { useContext } from "react";
import Context from "../../../Context/Context";
import "../../CSS/Technologies.css";
import { useNavigate } from "react-router-dom";
const Technologies = () => {
  const { setCatTechName, jobs } = useContext(Context);
  const navigate = useNavigate();

  function handleNavigate(e, name) {
    e.preventDefault();
    setCatTechName(name);
    const a = name.toLowerCase().replace(" ", "+");
    const value = `category_name=${a}`;
    // console.log(`?${value}`);
    navigate(`/category_jobs?${value}`);
  }

  const abc = jobs.reduce((acc, curr) => {
    if (!acc.some((item) => item.technology === curr.technology)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  function techSearch(item) {
    const stackJobs = jobs.filter((it) => it.technology === item);
    // console.log(stackJobs);
    return stackJobs;
  }

  return (
    <>
      <section>
        <div className="container-technologies">
          <div className="heading-technologies">
            <div>
              <div>
                <h2>Technologies</h2>
              </div>
            </div>
          </div>
          <div className="technologies">
            <div className="tech-container">
              {abc.map((item, i) => (
                <div className="course-div" key={i}>
                  <a
                    onClick={(e) => handleNavigate(e, item.technology)}
                    href=""
                  >
                    <div>
                      <img src={item.url} alt="noPic" />
                    </div>
                    <div>
                      <span>
                        {item.technology}({techSearch(item.technology).length})
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Technologies;
