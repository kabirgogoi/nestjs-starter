import { Seeder, Factory } from 'typeorm-seeding';
import { User } from '@Users/entities';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().createMany(10);
  }
}
