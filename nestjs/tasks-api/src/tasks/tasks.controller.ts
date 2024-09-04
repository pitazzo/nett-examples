import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Task } from 'src/tasks/tasks.interface';
import { TasksService } from 'src/tasks/tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('tasks')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('task/:id')
  getSingleTasks(@Param('id', ParseIntPipe) id: number) {
    const task = this.tasksService.searchTask(id);

    if (!task) {
      throw new NotFoundException(`Can not find task with id ${id}`);
    }

    return task;
  }

  @Post('tasks')
  createNewTask(@Body() payload: Task) {
    this.tasksService.addTask(payload);
    return payload;
  }

  @Patch('tasks/mark-as-completed/:id')
  markAsCompleted(@Param('id', ParseIntPipe) id: number) {}
}
