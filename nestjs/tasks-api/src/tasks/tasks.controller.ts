import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('tasks')
  getAllTasks(@Req() req: Request) {
    if (req.headers['authorization'] !== process.env.SUPER_SECRET_TOKEN) {
      throw new UnauthorizedException();
    }

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
  createNewTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.addTask(dto);
  }

  @Patch('tasks/mark-as-completed/:id')
  markAsCompleted(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.markAsCompleted(id);
  }
}
