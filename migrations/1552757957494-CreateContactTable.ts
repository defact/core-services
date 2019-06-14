import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateContactTable1552757957494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'contact',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'classifier',
          type: 'varchar',
          length: '32',
        },
        {
          name: 'value',
          type: 'json',
          isNullable: true,
          default: '\'{}\'',
        },
        {
          name: 'profileId',
          type: 'integer',
        },
      ],
    }), true);

    await queryRunner.createForeignKey('contact', new TableForeignKey({
      columnNames: [ 'profileId' ],
      referencedColumnNames: [ 'id' ],
      referencedTableName: 'profile',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('contact');
    await queryRunner.dropForeignKey(table, table.foreignKeys.find(fk => fk.columnNames.indexOf('profileId') !== -1));
    await queryRunner.dropTable(table);
  }
}
