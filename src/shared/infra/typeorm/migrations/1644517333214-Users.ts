import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Users1644517333214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'numeric',
            isPrimary: true,
            isNullable: false,            
          },
          {
            name: 'secure_id',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'full_name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'phone',
            type: 'varchar'
          },
          {
            name: 'cpf_number',
            type: 'varchar',            
          },
          {
            name: 'current_balance',
            type: 'float'
          },
          {
            name: 'average_salary',
            type: 'float'
          },
          {
            name: 'status',
            type: 'varchar'
          },          
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
