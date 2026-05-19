-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Dec 03, 2023 at 12:55 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comptetion`
--

-- --------------------------------------------------------

--
-- Table structure for table `coureur`
--

CREATE TABLE `coureur` (
  `numC` int(3) NOT NULL,
  `nomC` varchar(25) DEFAULT NULL,
  `codeP_C` int(3) DEFAULT NULL,
  `codeE_C` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coureur`
--

INSERT INTO `coureur` (`numC`, `nomC`, `codeP_C`, `codeE_C`) VALUES
(0, 'jhon', 0, 0),
(1, 'akrem', 1, 0),
(2, 'ali', 2, 1),
(3, 'brad', 1, 1),
(4, 'chris', 2, 2),
(5, 'james', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `equipe`
--

CREATE TABLE `equipe` (
  `codeE` int(3) NOT NULL,
  `nomE` varchar(20) DEFAULT NULL,
  `couleurEq` varchar(6) DEFAULT NULL
) ;

--
-- Dumping data for table `equipe`
--

INSERT INTO `equipe` (`codeE`, `nomE`, `couleurEq`) VALUES
(0, 'liverpool', NULL),
(1, 'ac milan', NULL),
(2, 'real madrid', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `etape`
--

CREATE TABLE `etape` (
  `numET` int(3) NOT NULL,
  `dateE` date DEFAULT NULL,
  `villeDep` varchar(20) DEFAULT NULL,
  `villeArr` varchar(20) DEFAULT NULL,
  `nbKm` int(11) NOT NULL DEFAULT 30
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `etape`
--

INSERT INTO `etape` (`numET`, `dateE`, `villeDep`, `villeArr`, `nbKm`) VALUES
(0, '2023-11-07', 'paris', 'marseille', 774),
(1, '2023-11-08', 'tunis', 'nabeul', 60),
(2, '0000-00-00', 'cotonu', 'ibadan', 253);

-- --------------------------------------------------------

--
-- Table structure for table `participer`
--

CREATE TABLE `participer` (
  `numC_P` int(3) NOT NULL,
  `numET_P` int(3) NOT NULL,
  `tempRealiser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `participer`
--

INSERT INTO `participer` (`numC_P`, `numET_P`, `tempRealiser`) VALUES
(0, 0, 10),
(1, 0, 20),
(2, 1, 30),
(3, 1, 40),
(4, 2, 50),
(5, 2, 60);

-- --------------------------------------------------------

--
-- Table structure for table `pays`
--

CREATE TABLE `pays` (
  `codeP` int(3) NOT NULL,
  `nomP` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pays`
--

INSERT INTO `pays` (`codeP`, `nomP`) VALUES
(0, 'angleterre'),
(1, 'italie'),
(2, 'espagne');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coureur`
--
ALTER TABLE `coureur`
  ADD PRIMARY KEY (`numC`),
  ADD KEY `fg1` (`codeP_C`),
  ADD KEY `fg2` (`codeE_C`);

--
-- Indexes for table `equipe`
--
ALTER TABLE `equipe`
  ADD PRIMARY KEY (`codeE`);

--
-- Indexes for table `etape`
--
ALTER TABLE `etape`
  ADD PRIMARY KEY (`numET`);

--
-- Indexes for table `participer`
--
ALTER TABLE `participer`
  ADD PRIMARY KEY (`numC_P`,`numET_P`),
  ADD KEY `fg4` (`numET_P`);

--
-- Indexes for table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`codeP`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coureur`
--
ALTER TABLE `coureur`
  ADD CONSTRAINT `fg1` FOREIGN KEY (`codeP_C`) REFERENCES `pays` (`codeP`),
  ADD CONSTRAINT `fg2` FOREIGN KEY (`codeE_C`) REFERENCES `equipe` (`codeE`);

--
-- Constraints for table `participer`
--
ALTER TABLE `participer`
  ADD CONSTRAINT `fg3` FOREIGN KEY (`numC_P`) REFERENCES `coureur` (`numC`),
  ADD CONSTRAINT `fg4` FOREIGN KEY (`numET_P`) REFERENCES `etape` (`numET`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
