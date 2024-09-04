import { Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/tasks.interface';

@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      id: 1,
      name: 'Ir a comprar comida del gato',
      topic: 'compras',
      isCompleted: false,
      priority: 'HIGH',
    },
    {
      id: 2,
      name: 'Limpiar cocina',
      topic: 'casa',
      isCompleted: true,
      priority: 'MEDIUM',
    },
    {
      id: 3,
      name: 'Preparar clase de NETT',
      topic: 'trabajo',
      isCompleted: false,
      priority: 'HIGH',
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  searchTask(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }
}
