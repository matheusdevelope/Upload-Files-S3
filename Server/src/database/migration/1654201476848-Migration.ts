import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1654201476848 implements MigrationInterface {
    name = 'Migration1654201476848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`log\` (\`id\` varchar(255) NOT NULL, \`requester\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`sector\` varchar(255) NOT NULL, \`data\` varchar(8000) NOT NULL, \`created_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`cnpj\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`expiration_files\` int NOT NULL, \`allow_access\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ftp\` (\`id\` int NOT NULL AUTO_INCREMENT, \`host\` varchar(255) NOT NULL, \`user\` varchar(255) NOT NULL, \`pass\` varchar(255) NOT NULL, \`port\` int NOT NULL, \`path\` varchar(255) NOT NULL, \`deleteFiles\` tinyint NOT NULL, \`order\` int NOT NULL, \`userIdId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`manager\` (\`id\` varchar(255) NOT NULL, \`user\` varchar(255) NOT NULL, \`pass\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`access\` int NOT NULL, UNIQUE INDEX \`IDX_f7fb87203a06eecfb00c90a894\` (\`user\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ftp\` ADD CONSTRAINT \`FK_174ead810b520f514f8823e2de5\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ftp\` DROP FOREIGN KEY \`FK_174ead810b520f514f8823e2de5\``);
        await queryRunner.query(`DROP INDEX \`IDX_f7fb87203a06eecfb00c90a894\` ON \`manager\``);
        await queryRunner.query(`DROP TABLE \`manager\``);
        await queryRunner.query(`DROP TABLE \`ftp\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`log\``);
    }

}
