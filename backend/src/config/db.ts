import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  user: process.env.DB_USER,       // ej: "postgres"
  password: process.env.DB_PASS,   // ej: "tu_password"
  host: process.env.DB_HOST,       // ej: "localhost"
  port: Number(process.env.DB_PORT), // ej: 5432
  database: process.env.DB_NAME    // ej: "notasdb"
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a PostgreSQL");
  } catch (error) {
    console.error("❌ Error al conectar a la BD:", error);
  }
}
