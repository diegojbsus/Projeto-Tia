import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5174

// Serve images folder
app.use('/images', express.static(path.join(__dirname, '../images')))

// Serve built React frontend
app.use(express.static(path.join(__dirname, '../dist')))

// API: list gallery images
app.get('/api/gallery', (req, res) => {
  const imagesDir = path.join(__dirname, '../images')
  const categories = []

  const folders = fs.readdirSync(imagesDir)
  for (const folder of folders) {
    const fullPath = path.join(imagesDir, folder)
    if (fs.statSync(fullPath).isDirectory()) {
      const imgs = fs
        .readdirSync(fullPath)
        .filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f))
        .map(f => `/images/${folder}/${f}`)

      categories.push({ name: folder, images: imgs })
    }
  }

  res.json(categories)
})

// Fallback: always serve index.html for React router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
