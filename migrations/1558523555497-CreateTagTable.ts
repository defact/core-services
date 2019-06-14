import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTagTable1558523555497 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'tag',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'text',
          type: 'varchar',
          length: '1024',
        },
        {
          name: 'isArchived',
          type: 'boolean',
          default: false,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('tag');
    await queryRunner.dropTable(table);
  }
}
