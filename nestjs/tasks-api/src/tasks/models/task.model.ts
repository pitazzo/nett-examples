export type Topic = 'compras' | 'casa' | 'trabajo' | 'familia';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export class Task {
  id: number;
  name: string;
  summary: string;
  topic: Topic;
  isCompleted: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}
