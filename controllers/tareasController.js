import inquirer from 'inquirer';
import fs from 'fs/promises';
import { tareas } from '../models/tareas.js'


const RUTA = './data/tareas.json'




export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
  ]);

  const nueva = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false
  };


  tareas.push(nueva)

  try {
    await fs.writeFile(RUTA, JSON.stringify(tareas,null, 4));
    console.log('✅ Tarea agregada.');
  } catch (error) {
      console.error("Error: ",error)
  }
}




export async function listarTareas() {
  if (tareas.length === 0) {
    console.log('📭 No hay tareas registradas.');
    return;
  }

  
  console.log('\n📋 Lista de tareas:');
  tareas.forEach((tarea, i) => {
    const estado = tarea.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${tarea.descripcion}`);
  });
}



export async function editarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
  ]);


  tareas[indice].descripcion = nuevaDescripcion.trim();
  await fs.writeFile(RUTA, JSON.stringify(tareas,null, 4));
  console.log('✏️ Tarea actualizada.');
}




export async function eliminarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para eliminar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  tareas.splice(indice, 1);
  await fs.writeFile(RUTA, JSON.stringify(tareas,null, 4));
  console.log('🗑️ Tarea eliminada.');
}
