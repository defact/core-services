import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUserTable1550707307915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'email',
          type: 'varchar',
          length: '128',
        },
        {
          name: 'password',
          type: 'varchar',
          length: '128',
        },
        {
          name: 'verificationCode',
          type: 'varchar',
          length: '128',
          isNullable: true,
        },
        {
          name: 'forceChangePassword',
          type: 'boolean',
          default: false,
        },
        {
          name: 'isLocked',
          type: 'boolean',
          default: false,
        },
        {
          name: 'keyStart',
          type: 'bigint',
          isNullable: false,
        },
        {
          name: 'keyEnd',
          type: 'bigint',
          isNullable: false,
        },
        {
          name: 'isFixed',
          type: 'boolean',
          default: false,
        },
        {
          name: 'isArchived',
          type: 'boolean',
          default: false,
        },
      ],
    }), true);

    await queryRunner.createIndex('user', new TableIndex({
      name: 'IDX_USER_EMAIL',
      columnNames: [ 'email' ],
      isUnique: true,
    }));

    await queryRunner.createIndex('user', new TableIndex({
      name: 'IDX_USER_KEY',
      columnNames: [ 'keyStart', 'keyEnd' ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('user');
    await queryRunner.dropIndex(table, 'IDX_USER_EMAIL');
    await queryRunner.dropIndex(table, 'IDX_USER_KEY');
    await queryRunner.dropTable(table);
  }
}
