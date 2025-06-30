import Developer from "../models/Developer.js";

export const getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.getAll();
    res.json(developers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar desenvolvedores" });
  }
};

export const createDeveloper = async (req, res) => {
  try {
    const newDeveloper = await Developer.create(req.body);
    res.status(201).json(newDeveloper);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar desenvolvedor" });
  }
};