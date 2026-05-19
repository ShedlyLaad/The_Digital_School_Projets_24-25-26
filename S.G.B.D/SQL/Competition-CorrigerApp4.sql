-- 1)
-- Création De Base De Données
CREATE DATABASE Comptetion;
-- Création Des Tables
CREATE Table equipe(
codeE int(3) Primary key,
nomE varchar(20)
);
-- 
CREATE TABLE pays (
codeP int(3) primary key,
nomP varchar(25)
);
-- 
CREATE TABLE coureur (
numC int(3) primary key,
nomC varchar(25),
codeP_C int(3),
codeE_C int(3),
CONSTRAINT fg1 FOREIGN KEY (codeP_C) REFERENCES pays (codeP),
CONSTRAINT fg2 FOREIGN KEY (codeE_C ) REFERENCES equipe (codeE)
);
-- 
CREATE TABLE etape(
numET int(3) primary key,
dateE date,
villeDep varchar(20),
villeArr varchar(20),
nbKm int (3) INT NOT NULL DEFAULT 30
);
-- 
CREATE TABLE participer(
numC_P int(3),
numET_P int(3),
tempRealiser varchar(10),
PRIMARY key (numC_P, numET_P),
CONSTRAINT fg3 FOREIGN KEY (numC_P) REFERENCES coureur (numC),
CONSTRAINT fg4 FOREIGN KEY (numET_P) REFERENCES etape (numET)
);
--Insertion
--2
INSERT INTO equipe ('codeE', 'nomE') VALUES 
(0, 'liverpool'), 
(1, 'ac milan'),
(2, 'real madrid');
-- 3
INSERT INTO pays ('codeP', 'nomP') VALUES 
(0, 'angleterre'), 
(1, 'italie'),
(2, 'espagne');
-- 4
INSERT INTO etape ('numET', 'dateE', 'villeDep', 'villeArr', 'nbKm') VALUES 
(0, 2023-11-07, 'paris', 'marseille', 774), 
(1, 2023-11-08, 'tunis', 'nabeul', 60),
(2, 2023-11-09, 'cotonu', 'ibadan', 253);
-- 5
INSERT INTO coureur ('numC', 'nomC', 'codeP_C', 'codeE_C') VALUES  
(0, 'jhon', 0, 0), 
(1, 'akrem', 1, 0),
(2, 'ali', 2, 1), 
(3, 'brad', 1, 1),
(4, 'chris', 2, 2), 
(5, 'james', 0, 2);
-- 6
INSERT INTO participer ('numC_P', 'numET_P', 'tempRealiser') VALUES
(0, 0, 10),
(1, 0, 20),
(2, 1, 30),
(3, 1, 40),
(4, 2, 50),
(5, 2, 60);
-- 7
SELECT coureur.nomC FROM coureur JOIN participer
ON coureur.numC = participer.numC_P
WHERE participer.tempRealiser>30;
-- 8
SELECT * FROM coureur 
WHERE nomC LIKE 'a%';
-- 9
SELECT COUNT(*) FROM coureur JOIN participer 
ON coureur.numC = participer.numC_P 
WHERE participer.numET_P = 2;
-- 10
Alter table equipe 
add COLUMN couleurEq varchar(6), 
ADD CONSTRAINT coul_1 CHECK (couleurEq IN ("rouge", "bleu", "verte"));

