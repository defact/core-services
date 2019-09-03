import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreatePhotoTable1567517057099 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'photo',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
        name: 'caption',
        type: 'varchar',
        length: '1024',
        },
        {
        name: 'url',
        type: 'varchar',
        length: '1024',
        },
        {
          name: 'owner',
          type: 'integer',
          isNullable: false,
        },
      ],
    }), true);

    await queryRunner.createIndex('photo', new TableIndex({
      name: 'IDX_PHOTO_OWNER',
      columnNames: [ 'owner' ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('photo');
    await queryRunner.dropIndex(table, 'IDX_PHOTO_OWNER');
    await queryRunner.dropTable(table);
  }
}
