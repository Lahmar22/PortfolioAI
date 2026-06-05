const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const templateRoutes = require("./routes/templatRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const educationRoutes = require("./routes/educationRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const socialRoutes = require("./routes/socialRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/social-links", socialRoutes);
module.exports = app;