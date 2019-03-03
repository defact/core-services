import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessageTable1550707340662 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'message',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'from',
          type: 'varchar',
          length: '128',
        },
        {
          name: 'to',
          type: 'varchar',
          length: '128',
        },
        {
          name: 'message',
          type: 'varchar',
          length: '512',
        },
        {
          name: 'subject',
          type: 'varchar',
          length: '128',
        },
        {
          name: 'sentAt',
          type: 'timestamp',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('message');
    await queryRunner.dropTable(table);
  }
}
