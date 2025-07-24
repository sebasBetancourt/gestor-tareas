import inquirer from 'inquirer';
import _ from 'lodash';
import chalk from 'chalk'
import { connection } from '../persistence/db.js';


const RUTA = './data/tareas.json';

export async function agregarTarea() {
  const db = await connection();
  const coleccion = db.collection("tareas");
  const { descripcion } = await inquirer.prompt([
    { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
  ]);

  if (_.isEmpty(descripcion.trim())) {
    console.log(chalk.red.bold('Error: La descripción no puede estar vacía.'));
    return;
  }

  const nueva = {
    descripcion: descripcion.trim(),
    completada: false
  };

  

  await coleccion.insertOne(nueva);
  console.log(chalk.green.bold('✅ Tarea agregada.'));
}




export async function listarTareas() {
  const db = await connection();
  const coleccion = db.collection("tareas");
  const tareas = await coleccion.find().toArray()
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
  const db = await connection();
  const coleccion = db.collection("tareas");
  const tareas = await coleccion.find().toArray()
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
  const db = await connection();
  const coleccion = db.collection("tareas");
  const tareas = await coleccion.find().toArray()
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

  const descripcion = tareas[indice].descripcion
  await coleccion.updateOne({descripcion: descripcion}, {$set: {descripcion: nuevaDescripcion.trim(), completada: completada}});
  console.log('✏️ Tarea actualizada.');
}




export async function eliminarTarea() {
  const db = await connection();
  const coleccion = db.collection("tareas");
  const tareas = await coleccion.find().toArray()
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

  await coleccion.deleteOne( {descripcion: tareas[indice].descripcion} )
  console.log(chalk.green.bold('🗑️ Tarea eliminada.'));
}