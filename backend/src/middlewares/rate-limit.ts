import rateLimit from 'express-rate-limit'


export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    error: 'Слишком много запросов с этого IP, пожалуйста, попробуйте позже.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path.startsWith('/images/') || req.path.startsWith('/public/')
})


export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: 'Слишком много попыток аутентификации, пожалуйста, попробуйте позже.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true
})

export const criticalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: {
    error: 'Слишком много операций изменения данных, пожалуйста, попробуйте позже.'
  },
  standardHeaders: true,
  legacyHeaders: false
})
