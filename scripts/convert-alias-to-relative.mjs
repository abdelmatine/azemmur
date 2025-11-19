import fs from 'fs'
import path from 'path'

const root = path.resolve(new URL(import.meta.url).pathname, '..', '..')
const srcDir = path.join(root, 'src')

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(js|ts|jsx|tsx)$/.test(entry.name)) processFile(full)
  }
}

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8')
  if (!content.includes("@/")) return
  const updated = content.replace(/(['"])@\/(.*?)\1/g, (m, quote, p1) => {
    const target = path.join(srcDir, p1)
    // remove extension if present in import
    const targetNoExt = target.replace(/(\.tsx?|\.jsx?)$/, '')
    let rel = path.relative(path.dirname(file), targetNoExt)
    if (!rel.startsWith('.')) rel = './' + rel
    // normalize to posix for import paths
    rel = rel.split(path.sep).join('/')
    return quote + rel + quote
  })

  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8')
    console.log('Updated', path.relative(root, file))
  }
}

walk(srcDir)
console.log('Done replacing @/ aliases')
