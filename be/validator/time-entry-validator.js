const { z } = require('zod');

const timeEntrySchema = z.object({
  projectId: z.number().positive("ID do projeto inválido"),
  developerId: z.number().positive("ID do desenvolvedor inválido"),
  description: z.string().min(1, "Descrição é obrigatória"),
  hours: z.number().positive("Horas devem ser positivas"),
  date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato dd/MM/yyyy"),
});

const createTimeEntryValidator = (req, res, next) => {
  try {
    timeEntrySchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
};

module.exports = { createTimeEntryValidator };