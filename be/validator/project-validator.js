const { z } = require('zod');

const projectSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  totalHours: z.number().positive("Total de horas deve ser positivo"),
  description: z.string().min(1, "Descrição é obrigatória"),
  cell: z.number().positive("Célula deve ser um número positivo"),
  client: z.number().positive("Cliente deve ser um número positivo"),
  service: z.number().positive("Serviço deve ser um número positivo"),
});

const createProjectValidator = (req, res, next) => {
  try {
    projectSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
};

module.exports = { createProjectValidator };