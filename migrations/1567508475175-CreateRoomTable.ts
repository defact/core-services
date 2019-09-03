import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateRoomTable1567508475175 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'room',
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
          name: 'isArchived',
          type: 'boolean',
          default: false,
        },
      ],
    }), true);

    await queryRunner.createIndex('room', new TableIndex({
      name: 'IDX_ROOM_KEY',
      columnNames: [ 'keyStart', 'keyEnd' ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('room');
    await queryRunner.dropIndex(table, 'IDX_ROOM_KEY');
    await queryRunner.dropTable(table);
  }
}
