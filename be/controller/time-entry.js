import TimeEntry from "../models/TimeEntry.js";

export const getAllTimeEntries = async (req, res) => {
  try {
    const developerId = req.query.developerId ? parseInt(req.query.developerId) : null;
    const timeEntries = await TimeEntry.getAll(developerId);
    res.json(timeEntries);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar lançamentos" });
  }
};

export const createTimeEntry = async (req, res) => {
  try {
    const newTimeEntry = await TimeEntry.create(req.body);
    res.status(201).json(newTimeEntry);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar lançamento" });
  }
};

export const deleteTimeEntry = async (req, res) => {
  try {
    const entryId = parseInt(req.params.id);
    await TimeEntry.delete(entryId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir lançamento" });
  }
};