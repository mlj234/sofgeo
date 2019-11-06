import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { Repository, Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { LoginDto } from '../model/login.dto';

@Injectable()
export class UserService {
  private repo: Repository<User>;

  constructor(
    @InjectConnection('geolocation')
    private readonly connection: Connection,
  ) {
    this.repo = this.connection.getRepository(User);
  }

  public getUserById(userId: number): Promise<User | undefined> {
    return this.repo.findOne({
      select: ['id', 'email'],
      where: { id: userId },
    });
  }

  public getUserByLogin(login: LoginDto): Promise<User | undefined> {
    return this.repo.findOne({
      select: ['id', 'email', 'password'],
      where: { email: login.email },
    });
  }
}
