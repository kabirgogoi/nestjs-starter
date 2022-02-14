import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { User } from '@Users/entities/user.entity';
import { Role } from '@Users/enums/role.enum';
import { Action } from './enums/actions.enum';

type Subjects = typeof User | User | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role === Role.ADMIN) {
      can(Action.MANAGE, 'all');
    } else {
      can(Action.READ, User);
      can(Action.CREATE, User);
      can([Action.UPDATE, Action.DELETE], User, { id: user.id });
    }

    return build({
      detectSubjectType: (type) =>
        type.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
