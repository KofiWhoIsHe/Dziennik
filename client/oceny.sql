-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2025 at 09:29 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `szkola`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `oceny`
--

CREATE TABLE `oceny` (
  `ID` int(11) NOT NULL,
  `Przedmiot` varchar(50) NOT NULL,
  `Ocena` int(11) NOT NULL CHECK (`Ocena` between 1 and 6),
  `Data_dodania` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `oceny`
--

INSERT INTO `oceny` (`ID`, `Przedmiot`, `Ocena`, `Data_dodania`) VALUES
(1, 'Matematyka', 5, '2025-03-18'),
(2, 'Matematyka', 3, '2025-03-17'),
(3, 'Fizyka', 4, '2025-03-16'),
(4, 'Fizyka', 2, '2025-03-15'),
(5, 'Chemia', 5, '2025-03-14'),
(6, 'Chemia', 3, '2025-03-13'),
(7, 'Biologia', 6, '2025-03-12'),
(8, 'Biologia', 4, '2025-03-11'),
(9, 'Historia', 3, '2025-03-10'),
(10, 'Historia', 4, '2025-03-09'),
(11, 'Język Polski', 5, '2025-03-08'),
(12, 'Język Polski', 2, '2025-03-07'),
(13, 'Język Angielski', 6, '2025-03-06'),
(14, 'Język Angielski', 4, '2025-03-05'),
(15, 'Geografia', 4, '2025-03-02'),
(16, 'Geografia', 2, '2025-03-01'),
(17, 'WF', 6, '2025-02-23'),
(18, 'WF', 5, '2025-02-22'),
(19, 'Matematyka', 4, '2025-03-19'),
(20, 'Matematyka', 1, '2025-03-19'),
(21, 'Polski', 3, '2025-03-19'),
(22, 'Polski', 2, '2025-03-19'),
(23, 'Polski', 5, '2025-03-19'),
(24, 'Angielski', 2, '2025-03-19'),
(25, 'Geografia', 5, '2025-03-19'),
(26, 'Geografia', 1, '2025-03-19');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `oceny`
--
ALTER TABLE `oceny`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `oceny`
--
ALTER TABLE `oceny`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
