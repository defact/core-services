import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccessTable1550707333351 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'access',
      columns: [
        {
          name: 'user',
          type: 'integer',
          isNullable: false,
          isPrimary: true,
        },
        {
          name: 'profile',
          type: 'integer',
          isNullable: false,
          isPrimary: true,
        },
        {
          name: 'isPrimary',
          type: 'boolean',
          default: false,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('access');
    await queryRunner.dropTable(table);
  }
}
