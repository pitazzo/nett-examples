import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/models/task.model';
import { SummaryService } from 'src/tasks/services/summary.service';
import { TasksController } from 'src/tasks/controllers/tasks.controller';
import { TasksService } from 'src/tasks/services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, SummaryService],
})
export class TasksModule {}
