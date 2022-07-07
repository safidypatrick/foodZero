<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210912131143 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, numero_identite VARCHAR(255) NOT NULL, date_naissance DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE compte (id INT AUTO_INCREMENT NOT NULL, date_creation DATE NOT NULL, client_id INT NOT NULL, numero_compte VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE compte_solde (id INT AUTO_INCREMENT NOT NULL, date_solde DATE NOT NULL, compte_id INT NOT NULL, solde DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transaction (id INT AUTO_INCREMENT NOT NULL, date_transaction DATE NOT NULL, compte_id INT NOT NULL, montant DOUBLE PRECISION NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP TABLE clients');
        $this->addSql('DROP TABLE compte_soldes');
        $this->addSql('DROP TABLE comptes');
        $this->addSql('DROP TABLE transactions');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE clients (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, prenom VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, numero_identite VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, date_naissance DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE compte_soldes (id INT AUTO_INCREMENT NOT NULL, date_solde DATE NOT NULL, compte_id INT NOT NULL, solde DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE comptes (id INT AUTO_INCREMENT NOT NULL, date_creation DATE NOT NULL, client_id INT NOT NULL, numero_compte VARCHAR(15) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, status VARCHAR(10) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE transactions (id INT AUTO_INCREMENT NOT NULL, date_transaction DATE NOT NULL, compte_id INT NOT NULL, montant DOUBLE PRECISION NOT NULL, type VARCHAR(10) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci` COMMENT \'1:virement/2:retrait/3:transfert\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE compte');
        $this->addSql('DROP TABLE compte_solde');
        $this->addSql('DROP TABLE transaction');
    }
}
