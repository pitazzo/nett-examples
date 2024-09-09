import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { Task } from 'src/tasks/models/task.model';
import { SummaryService } from 'src/tasks/summary.service';
import { promises as fs } from 'fs';

@Injectable()
export class TasksService {
  constructor(private readonly summaryService: SummaryService) {}

  FILE_NAME = 'tasks.json';

  private async retrieveTasks(): Promise<Task[]> {
    try {
      await fs.access(this.FILE_NAME);
      const data = await fs.readFile(this.FILE_NAME, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async saveTasks(tasks: Task[]): Promise<void> {
    await fs.writeFile(this.FILE_NAME, JSON.stringify(tasks), 'utf-8');
  }

  getAllTasks(): Promise<Task[]> {
    return this.retrieveTasks();
  }

  async searchTask(id: number): Promise<Task | undefined> {
    return this.retrieveTasks().then((tasks) =>
      tasks.find((task) => task.id === id),
    );
  }

  async addTask(dto: CreateTaskDto): Promise<Task> {
    const tasks = await this.retrieveTasks();

    if (tasks.some((task) => task.id === dto.id)) {
      throw new BadRequestException(`ID ${dto.id} does already exist`);
    }

    const task = {
      ...dto,
      isCompleted: false,
      summary: await this.summaryService.summarize(dto.name),
      createAt: new Date(),
      updateAt: new Date(),
    };

    tasks.push(task);

    await this.saveTasks(tasks);

    return task;
  }

  async markAsCompleted(id: number): Promise<Task> {
    const tasks = await this.retrieveTasks();

    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Unable to find task with id ${id}`);
    }

    if (tasks[index].isCompleted) {
      throw new BadRequestException(`Task with id ${id} was already completed`);
    }

    tasks[index].isCompleted = true;
    tasks[index].updateAt = new Date();

    await this.saveTasks(tasks);

    return tasks[index];
  }
}
