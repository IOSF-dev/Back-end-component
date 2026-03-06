require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./src/router/authRouter.js");
const usersRouter = require("./src/router/userRouter.js")
const meRouter = require("./src/router/meRouter.js");
const appointmentsRouter = require("./src/router/appointmentsRouter.js");
const connectDB = require("./src/DataBase/db.js");
const app = express();
////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
////////////////////////////////////////////////////////////////////////////////////////
connectDB();
////////////////////////////////////////////////////////////////////////////////////////
app.use("/auth", authRouter);
app.use("/users",usersRouter);
app.use("/appointments", appointmentsRouter)
app.use("/me", meRouter);
/////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;////---------------------------------------////////
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
////////////////////////////////////////////////////////////////////////////////////////