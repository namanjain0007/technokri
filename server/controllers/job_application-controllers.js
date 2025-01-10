const Job_application = require("../models/job_application");

const jobApplication = async (req, res) => {
  try {
    const {
      job_id,
      user_id,
      job_title,
      company_name,
      company_email,
      name,
      email,
      mobile,
      date_of_birth,
      category_id,
      experience,
      type,
      about,
    } = req.body;

    await Job_application.create({
      ...req.body,
      // job_id,
      // user_id,
      // job_title,
      // company_name,
      // company_email,
      // name,
      // email,
      // mobile,
      // date_of_birth,
      // category_id,
      // experience,
      // type,
      // about,
      path: req.file?.path, // Use optional chaining in case `req.file` is undefined
      filename: req.file?.filename,
    });
    return res.status(200).json({ msg: "JOB APPLICATION SUBMITTED" });
  } catch (error) {
    console.error("application not sent:", error);
    return res.status(400).json({ msg: "error sending application", error });
  }
};

module.exports = jobApplication;
