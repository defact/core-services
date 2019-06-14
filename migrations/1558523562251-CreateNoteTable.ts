import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNoteTable1558523562251 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'note',
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
          name: 'date',
          type: 'timestamp',
          isNullable: false,
        },
        {
          name: 'recordedAt',
          type: 'timestamp',
          isNullable: false,
        },
        {
          name: 'recordedById',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'profileId',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'isCancelled',
          type: 'boolean',
          default: false,
        },
        {
          name: 'cancelledById',
          type: 'integer',
          isNullable: true,
        },
        {
          name: 'cancelledAt',
          type: 'timestamp',
          isNullable: true,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('note');
    await queryRunner.dropTable(table);
  }
}
