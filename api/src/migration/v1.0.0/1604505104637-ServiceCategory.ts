import { MigrationInterface, QueryRunner } from 'typeorm';

export class ServiceCategory1604505104637 implements MigrationInterface {
  name = 'ServiceCategory1604505104637';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `service` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL, `description` text CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL, `price` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL, `category_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'CREATE TABLE `service_category` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL, `description` text CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `service` ADD CONSTRAINT `FK_9d513b39d251063f98f2a7b941d` FOREIGN KEY (`category_id`) REFERENCES `service_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `service` DROP FOREIGN KEY `FK_9d513b39d251063f98f2a7b941d`'
    );
    await queryRunner.query('DROP TABLE `service_category`');
    await queryRunner.query('DROP TABLE `service`');
  }
}
