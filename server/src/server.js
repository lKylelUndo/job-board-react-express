import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import routes from "./routes/index.routes.js";
import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOption));

app.get("/test", (req, res) => {
  return res.json("Hello Test");
});

// Routes
app.use("/api", routes);

app.get("/api/verify", verifyToken, (req, res) => {
  console.table(req.currentUser);
  return res
    .status(200)
    .json({ token: req.cookies.token, user: req.currentUser });
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
