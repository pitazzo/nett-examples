import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsIn(['compras', 'casa', 'trabajo', 'familia'])
  topic: 'compras' | 'casa' | 'trabajo' | 'familia';

  @IsString()
  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}
