const { ZodError } = require('zod')

const errorHandler = (error, req, res, next) => {
  console.error('Error:', error)

  // Erro de validação do Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    })
  }

  // Erro personalizado da aplicação
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      error: error.message
    })
  }

  // Erro interno do servidor
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
  })
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

const AppError = class extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'AppError'
  }
}

module.exports = {
  errorHandler,
  asyncHandler,
  AppError
}