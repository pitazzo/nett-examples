"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [
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
    }
    getAllTasks() {
        return this.tasks;
    }
    searchTask(id) {
        return this.tasks.find((task) => task.id === id);
    }
    addTask(task) {
        this.tasks.push(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map