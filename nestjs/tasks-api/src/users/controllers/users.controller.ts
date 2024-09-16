import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/users/decorators/is-public.decorator';
import { UserSignInDto } from 'src/users/dtos/user-signin.dto';
import { UserSignUpDto } from 'src/users/dtos/user-sigup.dto';
import { UsersService } from 'src/users/services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post('signup')
  async signUp(@Body() dto: UserSignUpDto) {
    await this.usersService.signUp(dto);
  }

  @IsPublic()
  @Post('signin')
  async signIn(@Body() dto: UserSignInDto) {
    return this.usersService.signIn(dto);
  }
}
