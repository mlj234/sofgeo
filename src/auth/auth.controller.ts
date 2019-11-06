import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';
import { LoginDto } from './model/login.dto';
import { IUserAuthDto } from './model/user-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  public async Auth(@Body() login: LoginDto /*, @Res() res: Response*/) {
    // try {
    const user = await this.userService.getUserByLogin(login);

    const token = this.authService.createToken({
      id: user.id,
      email: user.email,
    });

    return {
      id: user.id,
      email: user.email,
      bearerToken: token,
    } as IUserAuthDto;
  }
}
