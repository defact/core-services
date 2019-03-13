import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateRoleTable1550707301079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'role',
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
          name: 'claims',
          type: 'json',
          isNullable: true,
          default: '\'[]\'',
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

    await queryRunner.createIndex('role', new TableIndex({
      name: 'IDX_ROLE_NAME',
      columnNames: [ 'name' ],
      isUnique: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('role');
    await queryRunner.dropIndex(table, 'IDX_ROLE_NAME');
    await queryRunner.dropTable(table);
  }
}
