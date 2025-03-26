import express from "express";
import cors from "cors";
import "./models/index.js";
import eventRoutes from "./routes/event.js";
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.use("/api/events", eventRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
