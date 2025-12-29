import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notes.routes";
import { connectDB } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", notesRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
