import express from "express";
import cors from "cors";
import developerRoutes from "./routes/developerRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import timeEntryRoutes from "./routes/timeEntryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/developers", developerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/time-entries", timeEntryRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});