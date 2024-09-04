import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { Task } from 'src/tasks/models/task.model';
import { SummaryService } from 'src/tasks/summary.service';

@Injectable()
export class TasksService {
  constructor(private readonly summaryService: SummaryService) {}

  tasks: Task[] = [
    {
      id: 1,
      name: 'Ir a comprar comida del gato',
      summary:
        'Esta tarea consiste en ir a la tienda de animales a comprar pienso para el gato',
      topic: 'compras',
      isCompleted: false,
      priority: 'HIGH',
      createAt: new Date(),
      updateAt: new Date(),
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  searchTask(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  async addTask(dto: CreateTaskDto): Promise<Task> {
    if (this.tasks.some((task) => task.id === dto.id)) {
      throw new BadRequestException(`ID ${dto.id} does already exist`);
    }

    const task = {
      ...dto,
      isCompleted: false,
      summary: await this.summaryService.summarize(dto.name),
      createAt: new Date(),
      updateAt: new Date(),
    };

    this.tasks.push(task);
    return task;
  }

  markAsCompleted(id: number): Task {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Unable to find task with id ${id}`);
    }

    if (this.tasks[index].isCompleted) {
      throw new BadRequestException(`Task with id ${id} was already completed`);
    }

    this.tasks[index].isCompleted = true;
    this.tasks[index].updateAt = new Date();

    return this.tasks[index];
  }
}
