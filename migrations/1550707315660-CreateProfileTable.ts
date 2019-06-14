import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateProfileTable1550707315660 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'profile',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '32',
        },
        {
          name: 'dob',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'classifier',
          type: 'varchar',
          length: '32',
          isNullable: true,
        },
        {
          name: 'data',
          type: 'json',
          isNullable: true,
          default: '\'{}\'',
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

    await queryRunner.createIndex('profile', new TableIndex({
      name: 'IDX_PROFILE_KEY',
      columnNames: [ 'keyStart', 'keyEnd' ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('profile');
    await queryRunner.dropIndex(table, 'IDX_PROFILE_KEY');
    await queryRunner.dropTable(table);
  }
}
