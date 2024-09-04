export declare class Task {
    id: number;
    name: string;
    topic: 'compras' | 'casa' | 'trabajo' | 'familia';
    isCompleted: boolean;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
}
