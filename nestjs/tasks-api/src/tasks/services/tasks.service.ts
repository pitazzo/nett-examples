import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { Priority, Task, Topic } from 'src/tasks/models/task.model';
import { SummaryService } from 'src/tasks/services/summary.service';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    private readonly summaryService: SummaryService,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  private async retrieveTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  private async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id: id });
  }

  private async insertNewTask(params: {
    name: string;
    priority: Priority;
    topic: Topic;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
  }): Promise<Task> {
    const newTask = this.taskRepository.create({
      name: params.name,
      priority: params.priority,
      topic: params.topic,
      summary: params.summary,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    });
    return this.taskRepository.save(newTask);
  }

  private async updateTask(task: Task): Promise<void> {
    await this.taskRepository.save(task);
  }

  getAllTasks(): Promise<Task[]> {
    return this.retrieveTasks();
  }

  async searchTask(id: number): Promise<Task | undefined> {
    return this.getTaskById(id);
  }

  async addTask(dto: CreateTaskDto): Promise<Task> {
    return this.insertNewTask({
      ...dto,
      summary: await this.summaryService.summarize(dto.name),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async markAsCompleted(id: number): Promise<Task> {
    const task = await this.getTaskById(id);

    console.log(JSON.stringify(task, null, 2));

    if (task.isCompleted) {
      throw new BadRequestException(`Task with id ${id} was already completed`);
    }

    task.isCompleted = true;
    task.updatedAt = new Date();

    await this.updateTask(task);

    return task;
  }
}
