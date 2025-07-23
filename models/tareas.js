import fs from 'fs/promises';

const RUTA = './data/tareas.json'
let tareas = []

try {
  const data = await fs.readFile(RUTA);
  tareas = JSON.parse(data);
} catch (error) {
  console.error("Error: ",error)
}

export { tareas };