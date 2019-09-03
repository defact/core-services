import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTemplateTable1567422079986 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'template',
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
          length: '32',
        },
        {
          name: 'tags',
          type: 'varchar',
          length: '1024',
        },
        {
          name: 'recordedById',
          type: 'integer',
          isNullable: false,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('template');
    await queryRunner.dropTable(table);
  }
}

