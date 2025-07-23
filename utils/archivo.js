import lodash from 'lodash'
import { tareas } from '../models/tareas.js'


async function OrderTareas() {
    await tareas.lodash(_.orderBy)
}


OrderTareas()