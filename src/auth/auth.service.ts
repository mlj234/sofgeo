import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtPayload } from './interfaces/JwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createToken(jwtp: JwtPayload) {
    return this.jwtService.sign(jwtp, { expiresIn: '10h' });
  }

  async validateUser(payload: JwtPayload) {
    return await this.userService.getUserById(payload.id);
  }
}
