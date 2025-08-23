import { Router } from 'express'
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from '../controllers/products'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import {
    validateObjId,
    validateProductBody,
    validateProductUpdateBody,
} from '../middlewares/validations'
import { Role } from '../models/user'
import { criticalLimiter } from '../middlewares/rate-limit'

const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.post(
    '/',
    auth,
    roleGuardMiddleware(Role.Admin),
    criticalLimiter,
    validateProductBody,
    createProduct
)
productRouter.delete(
    '/:productId',
    auth,
    roleGuardMiddleware(Role.Admin),
    criticalLimiter,
    validateObjId,
    deleteProduct
)
productRouter.patch(
    '/:productId',
    auth,
    roleGuardMiddleware(Role.Admin),
    criticalLimiter,
    validateObjId,
    validateProductUpdateBody,
    updateProduct
)

export default productRouter
