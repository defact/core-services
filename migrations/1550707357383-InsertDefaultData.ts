import { MigrationInterface, QueryRunner } from 'typeorm';
import { Hasher } from '../src/common/helpers/hash';

const hash = new Hasher();

export class InsertDefaultData1550707357383 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const systemGroup = await queryRunner.query(`INSERT INTO "group" ("name", "keyStart", "keyEnd") VALUES ('System', 0, 9999999999999999) RETURNING id`);
    const guestGroup = await queryRunner.query(`INSERT INTO "group" ("name", "keyStart", "keyEnd", "parentId") VALUES ('Guest', 0, 99999999999999, $1)`, [ systemGroup[0].id ]);

    const systemRole = await queryRunner.query(`INSERT INTO "role" ("name", "claims") VALUES ('system', '[{"entity":"user","right":15},{"entity":"group","right":15}]') RETURNING id`);
    const guestRole = await queryRunner.query(`INSERT INTO "role" ("name", "claims") VALUES ('guest', '[{"entity":"user","right":3}]') RETURNING id`);

    const systemUser = await queryRunner.query(`INSERT INTO "user" ("email", "password", "keyStart", "keyEnd") VALUES ('system@recipher.co.uk', $1, 0, 9999999999999999) RETURNING id`, [ hash.generate('password').hash ]);
    const guestUser = await queryRunner.query(`INSERT INTO "user" ("email", "password", "keyStart", "keyEnd") VALUES ('guest@recipher.co.uk', $1, 0, 99999999999999) RETURNING id`, [ hash.generate('password').hash ]);

    await queryRunner.query(`INSERT INTO "user_roles_role" ("userId", "roleId") VALUES ($1, $2)`, [ systemUser[0].id, systemRole[0].id ]);
    await queryRunner.query(`INSERT INTO "user_roles_role" ("userId", "roleId") VALUES ($1, $2)`, [ guestUser[0].id, guestRole[0].id ]);

    const systemProfile = await queryRunner.query(`INSERT INTO "profile" ("name", "keyStart", "keyEnd") VALUES ('System', 0, 9999999999999999) RETURNING id`);
    const guestProfile = await queryRunner.query(`INSERT INTO "profile" ("name", "keyStart", "keyEnd") VALUES ('Guest', 0, 99999999999999) RETURNING id`);

    await queryRunner.query(`INSERT INTO "access" ("user", "profile") VALUES ($1, $2)`, [ systemUser[0].id, systemProfile[0].id ]);
    await queryRunner.query(`INSERT INTO "access" ("user", "profile") VALUES ($1, $2)`, [ guestUser[0].id, guestProfile[0].id ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "profile"`);
    await queryRunner.query(`DELETE FROM "access"`);
    await queryRunner.query(`DELETE FROM "user_roles_role"`);
    await queryRunner.query(`DELETE FROM "user"`);
    await queryRunner.query(`DELETE FROM "role"`);
    await queryRunner.query(`DELETE FROM "group"`);
  }
}
