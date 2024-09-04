import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { SummaryService } from 'src/tasks/summary.service';

@Module({
  imports: [],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService, SummaryService],
})
export class AppModule {}
