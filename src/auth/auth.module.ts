import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';
import {
  JwtStrategyService,
  jwtConstants,
} from './jwt-strategy/jwt-strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { GuardService } from './guard/service-guard.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GuardService, UserService, JwtStrategyService],
})
export class AuthModule {}
