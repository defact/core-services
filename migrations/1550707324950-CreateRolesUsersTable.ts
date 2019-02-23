import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateRolesUsersTable1550707324950 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user_roles_role',
      columns: [
        {
          name: 'userId',
          type: 'integer',
          isNullable: false,
          isPrimary: true,
        },
        {
          name: 'roleId',
          type: 'integer',
          isNullable: false,
          isPrimary: true,
        },
      ],
    }), true);

    await queryRunner.createForeignKey('user_roles_role', new TableForeignKey({
      columnNames: [ 'roleId' ],
      referencedColumnNames: [ 'id' ],
      referencedTableName: 'role',
      onDelete: 'CASCADE',
    }));

    await queryRunner.createForeignKey('user_roles_role', new TableForeignKey({
      columnNames: [ 'userId' ],
      referencedColumnNames: [ 'id' ],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('user_roles_role');
    await queryRunner.dropForeignKey(table, table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1));
    await queryRunner.dropForeignKey(table, table.foreignKeys.find(fk => fk.columnNames.indexOf('roleId') !== -1));
    await queryRunner.dropTable(table);
  }
}
