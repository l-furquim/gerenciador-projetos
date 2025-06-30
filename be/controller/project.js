import Project from "../models/Project.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
};

export const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    await Project.delete(projectId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir projeto" });
  }
};