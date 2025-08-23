import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'

export const validateImageFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next()
    }

    try {
        
        if (req.file.size < 2048) {
            return res.status(400).json({ error: 'Файл слишком маленький (минимум 2KB)' })
        }
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout processing image')), 5000)
        })

        const metadataPromise = sharp(req.file.path).metadata()
        
        const metadata = await Promise.race([metadataPromise, timeoutPromise]) as sharp.Metadata
        
        if (!metadata.width || !metadata.height) {
            return res.status(400).json({ error: 'Невалидное изображение' })
        }

        next()
    } catch (error) {
        return res.status(400).json({ error: 'Ошибка обработки изображения' })
    }
}
