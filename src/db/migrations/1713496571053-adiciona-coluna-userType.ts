import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdicionaColunaUserType1713496571053 implements MigrationInterface {
  name = 'AdicionaColunaUserType1713496571053';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "user_type" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_type"`);
  }
}
