const express = require("express");
const server = express();
const multer = require("multer");

const cors = require("cors");
// const session = require("express-session"); // session import

const connectDb = require("./utils/db");
const router = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const jobApplicationRouter = require("./router/job_application-router");
// const User = require("./models/user-model");

server.use(
  cors({
    origin: "https://technokri-frontend.onrender.com", // Frontend ka URL
    credentials: true, //  allowed Cookies
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });



const PORT = 5012;

server.use("/uploads", express.static("uploads"));

server.use(express.json());

server.use("/", upload.single("file"), router);
server.use("/contactForm", contactRoute);
server.use("/", jobApplicationRouter);

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`server started at PORT : ${PORT}`);
  });
});
