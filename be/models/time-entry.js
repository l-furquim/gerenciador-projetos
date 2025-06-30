import { executar } from "../db/database.js";

class TimeEntry {
  static async getAll(developerId = null) {
    let query = "SELECT * FROM time_entries";
    let params = [];
    
    if (developerId) {
      query += " WHERE developer_id = ?";
      params = [developerId];
    }
    
    const [rows] = await executar(query, params);
    return rows;
  }

  static async create({ projectId, developerId, description, hours, date }) {
    const result = await executar(
      "INSERT INTO time_entries (project_id, developer_id, description, hours, date) VALUES (?, ?, ?, ?, ?)",
      [projectId, developerId, description, hours, date]
    );
    return { 
      id: result.insertId, 
      project_id: projectId, 
      developer_id: developerId, 
      description, 
      hours, 
      date 
    };
  }

  static async delete(id) {
    await executar("DELETE FROM time_entries WHERE id = ?", [id]);
    return true;
  }
}

export default TimeEntry;