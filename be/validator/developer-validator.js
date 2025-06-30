const { z } = require('zod');

const developerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  seniority: z.enum(['junior', 'pleno', 'senior']),
  hourlyRate: z.number().positive("Valor por hora deve ser positivo"),
});

const createDeveloperValidator = (req, res, next) => {
  try {
    developerSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
};

module.exports = { createDeveloperValidator };