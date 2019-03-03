import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateGroupTable1550705480954 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'group',
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
          name: 'parentId',
          type: 'integer',
          isNullable: true,
        },
      ],
    }), true);

    await queryRunner.createIndex('group', new TableIndex({
      name: 'IDX_GROUP_NAME',
      columnNames: [ 'name' ],
      isUnique: true,
    }));

    await queryRunner.createIndex('group', new TableIndex({
      name: 'IDX_GROUP_KEY',
      columnNames: [ 'keyStart', 'keyEnd' ],
    }));

    await queryRunner.createForeignKey('group', new TableForeignKey({
      columnNames: [ 'parentId' ],
      referencedColumnNames: [ 'id' ],
      referencedTableName: 'group',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('group');
    const fk = table.foreignKeys.find(fk => fk.columnNames.indexOf('parentId') !== -1);
    await queryRunner.dropForeignKey(table, fk);
    await queryRunner.dropIndex(table, 'IDX_GROUP_NAME');
    await queryRunner.dropIndex(table, 'IDX_GROUP_KEY');
    await queryRunner.dropTable(table);
  }
}
