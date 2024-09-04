import { Task } from 'src/tasks/tasks.interface';
import { TasksService } from 'src/tasks/tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): Task[];
    getSingleTasks(id: number): Task;
    createNewTask(payload: Task): Task;
    markAsCompleted(id: number): void;
}
