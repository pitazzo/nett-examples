import { Task } from 'src/tasks/tasks.interface';
export declare class TasksService {
    tasks: Task[];
    getAllTasks(): Task[];
    searchTask(id: number): Task | undefined;
    addTask(task: Task): void;
}
