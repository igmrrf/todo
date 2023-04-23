import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1682122033764 implements MigrationInterface {
    name = 'migration1682122033764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "todo" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "text" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "todo"
        `);
    }

}
