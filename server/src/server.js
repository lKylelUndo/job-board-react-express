import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

import routes from "./routes/index.routes.js";
import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(routes);

app.get("/verify", verifyToken, (req, res) => {
  console.table(req.currentUser);
  return res.send({ token: req.cookies.token });
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
