import { createConnection, Connection } from 'typeorm';
import { User } from '../src/database/entities/user.entity';
const addUser = (connection: Connection): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = new User();
      user.email = 'user@wp.pl';
      user.password = '123456';
      const repo = connection.getRepository(User);
      await repo.save(user);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

createConnection('geolocation').then(async (connection: Connection) => {
  await addUser(connection);
});
