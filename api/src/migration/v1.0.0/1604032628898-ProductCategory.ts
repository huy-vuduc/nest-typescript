import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCategory1604032628898 implements MigrationInterface {
  name = 'ProductCategory1604032628898';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL, `description` text CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL, `price` float NOT NULL DEFAULT 0, `category_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'CREATE TABLE `product_category` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL, `description` text CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `product` ADD CONSTRAINT `FK_0dce9bc93c2d2c399982d04bef1` FOREIGN KEY (`category_id`) REFERENCES `product_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `product` DROP FOREIGN KEY `FK_0dce9bc93c2d2c399982d04bef1`'
    );
    await queryRunner.query('DROP TABLE `product_category`');
    await queryRunner.query('DROP TABLE `product`');
  }
}
