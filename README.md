# Sistema de Gestión de Tareas CLI

## Descripción

Este proyecto es un sistema de gestión de tareas por consola, cumple con los requerimientos necesarios. El sistema permite crear, listar, editar, eliminar y buscar tareas, con persistencia de datos en un archivo JSON y mejoras implementadas usando la librería Lodash. La interfaz utiliza inquirer para una interacción amigable y chalk para mensajes coloreados, mejorando la experiencia del usuario.


## Características
- Persistencia: Las tareas se guardan en data/tareas.json y        persisten entre ejecuciones.

- Interfaz CLI: Usa inquirer para un menú interactivo y fácil de usar.

- Validaciones: Evita tareas vacías, confirma eliminaciones y previene duplicados.
- Mejoras con Lodash:
- - Validación de descripciones vacías con _.isEmpty.
### Mejoras con Lodash:

- Generación de IDs únicos con _.uniqueId.
- Ordenación de tareas por descripción y estado con _.orderBy.
- Búsqueda de tareas por palabra clave con _.filter y _.includes.
- UX Mejorada: Mensajes claros con emojis y colores gracias a chalk.


## Instalación

### 1. Clona el repositorio:

```
git clone https://github.com/sebasBetancourt/gestor-tareas.git
cd gestor-tareas
```


### 2. Instala las dependencias:

```
npm install chalk
npm install lodash
npm install inquirer
npm install chalk
```


## Uso

#### Ejecuta el programa:

```
node main.js
```

### Sigue las opciones del menú interactivo:
1. Agregar tarea: Ingresa una descripción para crear una nueva tarea.
2. Listar tareas: Muestra todas las tareas ordenadas alfabéticamente.
3. Editar tarea: Modifica la descripción o el estado (completada/pendiente) de una tarea.
4. Eliminar tarea: Elimina una tarea tras confirmación.
5. Buscar tarea: Busca tareas por palabra clave.
0. Salir: Cierra el programa.
