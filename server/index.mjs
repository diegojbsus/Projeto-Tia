import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const imagesDir = path.join(__dirname, '../images')

// serve frontend build
app.use(express.static(path.join(__dirname, '../dist')))

// serve images
app.use('/images', express.static(imagesDir))

// API endpoint
app.get('/api/list', (req, res) => {
  const categories = fs.readdirSync(imagesDir).filter(f =>
    fs.statSync(path.join(imagesDir, f)).isDirectory()
  )

  const result = categories.map(cat => {
    const catPath = path.join(imagesDir, cat)
    const files = fs.readdirSync(catPath)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/images/${cat}/${file}`)
    return { name: cat, images: files }
  })

  res.json(result)
})

// fallback to SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(5174, () => console.log('🐱 Server running at http://localhost:5174'))
