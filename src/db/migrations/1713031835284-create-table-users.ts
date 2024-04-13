import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1713031835284 implements MigrationInterface {
  name = 'CreateTableUsers1713031835284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "cell_number" character varying(15) NOT NULL, "address" character varying(100) NOT NULL, "date_birthday" character varying(10) NOT NULL, "gender" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
