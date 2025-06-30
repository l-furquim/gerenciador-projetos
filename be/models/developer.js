import { executar } from "../db/database.js";

class Developer {
  static async getAll() {
    const [rows] = await executar("SELECT * FROM developers");
    return rows;
  }

  static async getById(id) {
    const [rows] = await executar("SELECT * FROM developers WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async create({ name, email, seniority, hourlyRate }) {
    const result = await executar(
      "INSERT INTO developers (name, email, seniority, hourly_rate) VALUES (?, ?, ?, ?)",
      [name, email, seniority, hourlyRate]
    );
    return { id: result.insertId, name, email, seniority, hourly_rate: hourlyRate };
  }
}

export default Developer;