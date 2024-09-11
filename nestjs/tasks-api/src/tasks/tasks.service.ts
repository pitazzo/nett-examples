import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { Priority, Task, Topic } from 'src/tasks/models/task.model';
import { SummaryService } from 'src/tasks/summary.service';
import * as sqlite3 from 'sqlite3';

@Injectable()
export class TasksService {
  private db: sqlite3.Database;

  constructor(private readonly summaryService: SummaryService) {
    this.db = new sqlite3.Database('tasks.db', (error) => {
      if (error) {
        console.error('There was a problem while openning the DB');
      }
    });
  }

  private async retrieveTasks(): Promise<Task[]> {
    return new Promise<Task[]>((resolve, reject) => {
      this.db.all('SELECT * FROM Tasks;', [], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.map((row) => this.mapRowToTask(row)));
        }
      });
    });
  }

  private async getTaskById(id: number): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      this.db.get('SELECT * FROM Tasks WHERE id = ?', [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(this.mapRowToTask(result));
        }
      });
    });
  }

  private mapRowToTask(row: unknown): Task {
    return {
      id: row['id'],
      name: row['name'],
      summary: row['summary'],
      topic: row['topic'],
      isCompleted: row['isCompleted'] === 1,
      priority: row['priority'],
      createdAt: new Date(row['createdAt']),
      updatedAt: new Date(row['updatedAt']),
    };
  }

  private async insertNewTask(params: {
    name: string;
    priority: Priority;
    topic: Topic;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
  }): Promise<Task> {
    const newId = await new Promise<number>((resolve, reject) => {
      this.db.run(
        'INSERT INTO Tasks (name, topic, priority, summary, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
        [
          params.name,
          params.topic,
          params.priority,
          params.summary,
          params.createdAt.toISOString(),
          params.updatedAt.toISOString(),
        ],
        function (error) {
          if (error) {
            reject(error);
          } else {
            resolve(this.lastID);
          }
        },
      );
    });

    return this.getTaskById(newId);
  }

  private async updateTask(task: Task): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.db.run(
        'UPDATE Tasks SET name = ?, topic = ?, priority = ?, summary = ?, createdAt = ?, updatedAt = ?, isCompleted = ? WHERE id = ?',
        [
          task.name,
          task.topic,
          task.priority,
          task.summary,
          task.createdAt.toISOString(),
          task.updatedAt.toISOString(),
          task.isCompleted,
          task.id,
        ],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
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
