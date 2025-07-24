import inquirer from 'inquirer';
import fs from 'fs/promises';
import _ from 'lodash';
import { tareas } from '../models/tareas.js';
import chalk from 'chalk'


const RUTA = './data/tareas.json';

export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
  ]);

  if (_.isEmpty(descripcion.trim())) {
    console.log(chalk.red.bold('Error: La descripción no puede estar vacía.'));
    return;
  }

  const nueva = {
    id: _.uniqueId(),
    descripcion: descripcion.trim(),
    completada: false
  };

  

  tareas.push(nueva);

  try {
    await fs.writeFile(RUTA, JSON.stringify(tareas, null, 4));
    console.log(chalk.green.bold('✅ Tarea agregada.'));
  } catch (error) {
    console.error('Error:', error);
  }
}




export async function listarTareas() {
  if (tareas.length === 0) {
    console.log('📭 No hay tareas registradas.');
    return;
  }

  const tareasOrdenadas = _.orderBy(tareas, ['descripcion', 'completada'], ['asc', 'asc']);

  console.log(chalk.magenta.bold('\n📋 Lista de tareas:'));
  tareasOrdenadas.forEach((tarea, i) => {
    const estado = tarea.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${tarea.descripcion}`);
  });
}

export async function buscarTareas() {
  const { palabraClave } = await inquirer.prompt([
    { type: 'input', name: 'palabraClave', message: 'Ingresa palabra clave para buscar:' }
  ]);

  const tareasFiltradas = _.filter(tareas, tarea =>
    _.includes(tarea.descripcion.toLowerCase(), palabraClave.toLowerCase())
  );

  if (tareasFiltradas.length === 0) {
    console.log('🔍 No se encontraron tareas con esa palabra clave.');
    return;
  }

  console.log(chalk.magenta.bold('\n🔍 Tareas encontradas:'));
  tareasFiltradas.forEach((tarea, i) => {
    const estado = tarea.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${tarea.descripcion}`);
  });
}

export async function editarTarea() {
  if (tareas.length === 0) {
    console.log('⚠️ No hay tareas para editar.');
    return;
  }

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((t, i) => ({
        name: `${t.descripcion} (${t.completada ? 'Completada' : 'Pendiente'})`,
        value: i
      }))
    }
  ]);

  const { nuevaDescripcion, completada } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' },
    {
      type: 'confirm',
      name: 'completada',
      message: '¿Esta completada?',
      default: tareas[indice].completada
    }
  ]);

  if (_.isEmpty(nuevaDescripcion.trim())) {
    console.log(chalk.red.bold('Error: La descripción no puede estar vacía.'));
    return;
  }



  tareas[indice].descripcion = nuevaDescripcion.trim();
  tareas[indice].completada = completada;

  try {
    await fs.writeFile(RUTA, JSON.stringify(tareas, null, 4));
    console.log('✏️ Tarea actualizada.');
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function eliminarTarea() {
  if (tareas.length === 0) {
    console.log('No hay tareas para eliminar.');
    return;
  }

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: `${t.descripcion} (${t.completada ? 'Completada' : 'Pendiente'})`,
        value: i
      }))
    }
  ]);

  const { confirmar } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmar',
      message: `¿Estás seguro de eliminar "${tareas[indice].descripcion}"?`,
      default: false
    }
  ]);

  if (!confirmar) {
    console.log(chalk.red.bold('Eliminación cancelada.'));
    return;
  }

  tareas.splice(indice, 1);
  try {
    await fs.writeFile(RUTA, JSON.stringify(tareas, null, 4));
    console.log(chalk.green.bold('🗑️ Tarea eliminada.'));
  } catch (error) {
    console.error('Error:', error);
  }
}