const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(cors()); // By doing this, CORS headers are attached to keep the service API accessible from other domain

// connect to db
mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log("connected to db")
);

// import routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");

// middlewares
app.use(express.json()); // for body parser

// route middlewares
app.use("/api/user", authRoutes);
app.use("/api/dashboard", verifyToken, dashboardRoutes);

app.listen(3001, () => console.log("server is running..."));
