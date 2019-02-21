import { MigrationInterface, QueryRunner } from 'typeorm';
import { Hasher } from '../src/common/helpers/hash';

const hash = new Hasher();

export class InsertDefaultData1550707357383 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`INSERT INTO "group" ("name") VALUES ('system')`);

    const systemRole = await queryRunner.query(`INSERT INTO "role" ("name", "claims") VALUES ('system', '[{"entity":"user","right":15},{"entity":"group","right":15}]') RETURNING id`);
    const guestRole = await queryRunner.query(`INSERT INTO "role" ("name", "claims") VALUES ('guest', '[]') RETURNING id`);

    const systemUser = await queryRunner.query(`INSERT INTO "user" ("email", "password") VALUES ('system@recipher.co.uk', $1) RETURNING id`, [ hash.generate('password').hash ]);
    const guestUser = await queryRunner.query(`INSERT INTO "user" ("email", "password") VALUES ('guest@recipher.co.uk', $1) RETURNING id`, [ hash.generate('password').hash ]);
    
    await queryRunner.query(`INSERT INTO "user_roles_role" ("userId", "roleId") VALUES ($1, $2)`, [ systemUser[0].id, systemRole[0].id ]);
    await queryRunner.query(`INSERT INTO "user_roles_role" ("userId", "roleId") VALUES ($1, $2)`, [ guestUser[0].id, guestRole[0].id ]);

    const systemProfile = await queryRunner.query(`INSERT INTO "profile" ("name") VALUES ('System') RETURNING id`);
    const guestProfile = await queryRunner.query(`INSERT INTO "profile" ("name") VALUES ('Guest') RETURNING id`);
    
    await queryRunner.query(`INSERT INTO "access" ("user", "profile") VALUES ($1, $2)`, [ systemUser[0].id, systemProfile[0].id ]);
    await queryRunner.query(`INSERT INTO "access" ("user", "profile") VALUES ($1, $2)`, [ guestUser[0].id, guestProfile[0].id ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "user_roles_role"`);
    await queryRunner.query(`DELETE FROM "user"`);
    await queryRunner.query(`DELETE FROM "role"`);
    await queryRunner.query(`DELETE FROM "group"`);
  }
}