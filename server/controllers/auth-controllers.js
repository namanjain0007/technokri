const User = require("../models/user-model");
const Job_application = require("../models/job_application");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  try {
    res.status(200).send("Homepage");
  } catch (error) {
    res.status(401).send("Failed");
  }
};

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      mobile,
      password,
      confirmPassword,
      date,
      technology,
      experience,
      type,
      branch,
      courseList,
      // photo,
    } = req.body;
    const file = req.file; // Access file data
    // console.log("abc", file);

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Password validation
    if (password !== confirmPassword) {
      // console.log(password, confirmPassword);

      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const saltRound = 5;
    const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      mobile,
      password: hash_password,
      date,
      technology,
      experience,
      type,
      branch,
      courseList,
      path: file.path, // Save file path
      filename: file.filename, // Save file name
    });

    console.log(userCreated);
    res.status(200).json({
      message: userCreated,
      // token: (await userCreated.generateToken()) || "no data",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ mess: "User not found" });
    }

    const user = await bcrypt.compare(password, userExist.password); //true or false

    if (user) {
      const token = await userExist.generateToken();

      // res.cookie("jwt", token, {
      //   expires: new Date(Date.now() + 25892000000), // 30 days ka time set kiya gaya hai
      //   httpOnly: false, // if true then Token ko client-side JavaScript access nahi kar sakta
      // });

      // console.log(res.getHeaders());

      res.status(200).json({
        msg: "Login sucessfull",
        user: userExist,
        token: token,
      });
    } else {
      // console.log(user);
      return res.status(400).json({ mess: "Wrong password" });
    }
  } catch (error) {
    console.error("Error logging user:", error);
    res.status(400).json({ msg: "Internal server error" });
  }
};

// const getProfile = async (req, res) => {
//   try {
//     const { user } = req;
//     console.log("ayush", user);
//     return res.status(200).json({ user });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ msg: "Error fetching profile", error: err.message });
//   }
// };

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); //provide data or null
    // console.log("user", user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error in getProfile:", err.message);
    return res
      .status(500)
      .json({ msg: "Error fetching profile", error: err.message });
  }
};

const checkAppliedJobs = async (req, res) => {
  try {
    const { _id } = req.body;
    const totalAppliedJobs = await Job_application.countDocuments({
      user_id: _id,
    });
    return res.status(200).json({ count: totalAppliedJobs });
  } catch (error) {
    return res.status(401).json({ msg: "not recieved user_id" });
  }
};
const checkJobId = async (req, res) => {
  try {
    const { id, _id } = req.body;
    const isDataExists = !!(await Job_application.findOne({
      user_id: _id,
      job_id: id.toString(),
    }));

    return res.status(200).json({ isDataExists });
  } catch (error) {
    return res.status(401).json({ msg: "not recieved id" });
  }
};

const allAppliedJobs = async (req, res) => {
  try {
    const { user_id } = req.body;
    const data = await Job_application.find({ user_id });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(401).json({ msg: "no data" });
  }
};
module.exports = {
  home,
  register,
  login,
  getProfile,
  checkJobId,
  checkAppliedJobs,
  allAppliedJobs,
};
