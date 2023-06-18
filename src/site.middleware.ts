import { Request, Response } from 'express'
import { readFileSync } from 'fs'
import path from 'path'

export function SiteMiddleware(req: Request, res: Response, next: any) {
  if (!req.path.match(/^\/api/)) {
    const content = readFileSync(path.resolve(__dirname, '../../vue_dist/index.html'))
    res.send(content.toString())
  }
  next()
}
