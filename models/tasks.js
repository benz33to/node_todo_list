import colors from "colors";
import { Task } from "./task.js";


class Tasks {
    _list = {};

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });
        return list;
    };

    constructor() {
        this._list = {};
    };

    loadTasksFromArr(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    };

    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    };

    listTasks() {

        const tasks = this.listArr;
        console.log();

        tasks.forEach((task, index) => {
            const { desc, completedIn } = task;
            const status = completedIn !== null ? 'Completed'.green : 'Pending'.red;
            console.log(`${colors.green((index + 1) + '.')} ${desc} :: ${status}`);
        });
    };

    listTasksByCompleted(completed = true) {
        const tasks = this.listArr.filter(({ completedIn }) => completed ? completedIn !== null : completedIn === null);
        console.log();

        tasks.forEach((task, index) => {
            const { desc, completedIn } = task;
            console.log(`${colors.green((index + 1) + '.')} ${desc} :: ${completedIn.blue}`);
        });
    };

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        };
    };

    toggleCompleted(ids = []) {

        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completedIn) {
                task.completedIn = new Date().toISOString();
            };
        });

        this.listArr.forEach( task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedIn = null;
            };
        });
    };
};

export { Tasks };