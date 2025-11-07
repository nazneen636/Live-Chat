import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import globalError from "./helpers/globalError.js";
import mainRoute from "./router/index.js";
const app = express();
const server = http.createServer(app);
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/status", (req, res) => res.send("Server is live"));

app.use("/api", mainRoute);
app.use(globalError);
export default server;
