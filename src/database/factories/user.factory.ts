import { Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { User } from '@Users/entities';
import { Role } from '@Users/enums/role.enum';

define(User, (faker: Faker) => {
  const user = new User({
    email: faker.internet.email(),
    role: faker.random.arrayElement([Role.USER, Role.ADMIN]),
    hashedPassword: 'some-random-hash-password',
  });

  return user;
});
