import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function serveStatic(baseDir: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const normalizedBaseDir = path.resolve(baseDir)
            
            const requestedPath = path.join(normalizedBaseDir, req.path)
            
            const resolvedPath = path.resolve(requestedPath)
            
            if (!resolvedPath.startsWith(normalizedBaseDir + path.sep) && resolvedPath !== normalizedBaseDir) {
                return res.status(403).json({ error: 'Forbidden: Path traversal detected' })
            }

            fs.access(resolvedPath, fs.constants.F_OK, (err) => {
                if (err) {
                    return next()
                }
                
                fs.stat(resolvedPath, (statErr, stats) => {
                    if (statErr || !stats.isFile()) {
                        return next()
                    }
                    
                    return res.sendFile(resolvedPath, (sendErr) => {
                        if (sendErr) {
                            next(sendErr)
                        }
                    })
                })
            })
        } catch (error) {
            return res.status(400).json({ error: 'Invalid path' })
        }
    }
}
