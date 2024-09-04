export class Task {
  id: number;
  name: string;
  summary: string;
  topic: 'compras' | 'casa' | 'trabajo' | 'familia';
  isCompleted: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createAt: Date;
  updateAt: Date;
}
