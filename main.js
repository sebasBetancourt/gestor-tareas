import mostrarMenu from './helpers/menu.js';
import { listarTareas, agregarTarea, editarTarea, eliminarTarea, buscarTareas } from './controllers/tareasController.js';

async function main() {
  let salir = false;

  while (!salir) {
    const opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
        await agregarTarea();
        break;
      case '2':
        await listarTareas();
        break;
      case '3':
        await editarTarea();
        break;
      case '4':
        await eliminarTarea();
        break;
      case '5':
        await buscarTareas();
        break;
      case '0':
        salir = true;
        console.log('👋 ¡Hasta pronto!');
        break;
    }
  }
}

main();