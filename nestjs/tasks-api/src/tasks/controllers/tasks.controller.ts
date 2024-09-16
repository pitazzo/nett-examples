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
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { TasksService } from 'src/tasks/services/tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('tasks')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('task/:id')
  async getSingleTasks(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.searchTask(id);

    if (!task) {
      throw new NotFoundException(`Can not find task with id ${id}`);
    }

    return task;
  }

  @Post('tasks')
  createNewTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.addTask(dto);
  }

  @Patch('tasks/mark-as-completed/:id')
  markAsCompleted(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.markAsCompleted(id);
  }
}
