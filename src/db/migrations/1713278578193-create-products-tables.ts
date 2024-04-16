import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTables1713278578193 implements MigrationInterface {
    name = 'CreateProductsTables1713278578193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_characteristics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "productId" uuid, CONSTRAINT "PK_070b55fb83575ccca7fbdac7fc4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "brand" character varying(50) NOT NULL, "price" integer NOT NULL, "quantityAvlb" integer NOT NULL, "category" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_images" ("id" SERIAL NOT NULL, "url" character varying(100) NOT NULL, "alt" character varying(100) NOT NULL, "productId" uuid, CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cell_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_birthday" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_characteristics" ADD CONSTRAINT "FK_d3944bc62d589d4c834e83f2245" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_b367708bf720c8dd62fc6833161" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_b367708bf720c8dd62fc6833161"`);
        await queryRunner.query(`ALTER TABLE "product_characteristics" DROP CONSTRAINT "FK_d3944bc62d589d4c834e83f2245"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_birthday" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cell_number" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "product_images"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "product_characteristics"`);
    }

}
