import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultData1550707357383 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`INSERT INTO "group" ("name") VALUES ('system')`);

    await queryRunner.query(`INSERT INTO "role" ("name", "claims") VALUES ('sys', '[{"entity":"user","right":15},{"entity":"group","right":15}]')`);
    await queryRunner.query(`INSERT INTO "role" ("name", "claims") VALUES ('guest', '[]')`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "group" WHERE "name"='system'`);
    await queryRunner.query(`DELETE FROM "role" WHERE "name"='sys'`);
    await queryRunner.query(`DELETE FROM "role" WHERE "name"='guest'`);
  }
}