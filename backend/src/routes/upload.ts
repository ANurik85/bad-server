import { Router } from 'express'
import { uploadFile } from '../controllers/upload'
import fileMiddleware from '../middlewares/file'
import { validateImageFile } from '../middlewares/validateImageFile'

const uploadRouter = Router()
uploadRouter.post('/', fileMiddleware.single('file'), validateImageFile, uploadFile)

export default uploadRouter
