import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class Task {
  @IsNumber()
  @Min(0)
  id: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsIn(['compras', 'casa', 'trabajo', 'familia'])
  topic: 'compras' | 'casa' | 'trabajo' | 'familia';

  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}
