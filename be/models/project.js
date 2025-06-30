import { executar } from "../db/database.js";

class Project {
  static async getAll() {
    const [rows] = await executar("SELECT * FROM projects");
    return rows;
  }

  static async getById(id) {
    const [rows] = await executar("SELECT * FROM projects WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async create({ name, totalHours, description, cell, client, service }) {
    const result = await executar(
      "INSERT INTO projects (name, total_hours, description, cell, client, service) VALUES (?, ?, ?, ?, ?, ?)",
      [name, totalHours, description, cell, client, service]
    );
    return { 
      id: result.insertId, 
      name, 
      total_hours: totalHours, 
      description, 
      cell, 
      client, 
      service 
    };
  }

  static async delete(id) {
    await executar("DELETE FROM projects WHERE id = ?", [id]);
    return true;
  }
}

export default Project;