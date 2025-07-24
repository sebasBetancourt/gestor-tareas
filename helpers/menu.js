import inquirer from 'inquirer';
import chalk from 'chalk';

export default async function mostrarMenu() {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:\n',
      choices: [
        { name: chalk.bgCyanBright('1. Agregar tarea'), value: '1' },
        { name: chalk.bgCyanBright('2. Listar tareas'), value: '2' },
        { name: chalk.bgCyanBright('3. Editar tarea'), value: '3' },
        { name: chalk.bgCyanBright('4. Eliminar tarea'), value: '4' },
        { name: chalk.bgCyanBright('5. Buscar Tarea'), value: '5' },
        { name: chalk.bgRedBright.bold('0. Salir'), value: '0' }
      ]
    }
  ]);
  return opcion;
}