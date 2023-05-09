import {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskMenu,
    confirm,
    checkListMenu,
} from "./helpers/inquirer.js";
import colors from "colors";
import { Tasks } from "./models/tasks.js";
import { readFile, saveFile } from "./helpers/fileManagement.js";

console.clear();


const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const savedTasks = readFile();
    if (savedTasks) {
        // Set tasks
        tasks.loadTasksFromArr(savedTasks);
    }
    do {
        // Print menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Description: ');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.listTasks();
                break;
            case '3':
                tasks.listTasksByCompleted(true);
                break;
            case '4':
                tasks.listTasksByCompleted(false);
                break;
            case '5':
                const ids = await checkListMenu(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;
            case '6':
                const id = await deleteTaskMenu(tasks.listArr);
                if (id !== 0) { // Avoids confirmation when user cancels
                    const ok = await confirm('Are you sure?');
                    if (ok) {
                        tasks.deleteTask(id);
                    }
                }
                break;
        }

        saveFile(tasks.listArr);

        if (opt !== '0') await pause();

    } while (opt !== '0');
}

main();