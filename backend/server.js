import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import app from "../gs-inc-attorneys/src/App.jsx";

dotenv.config();

app.use(express.json());
app.use(rateLimiter);
app.use("/api/transactions", tranasctionsRoute);

initDB();

