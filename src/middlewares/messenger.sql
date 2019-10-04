-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 04 Paź 2019, 20:49
-- Wersja serwera: 10.1.36-MariaDB
-- Wersja PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `messenger`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chats`
--

CREATE TABLE `chats` (
  `chatId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `chats`
--

INSERT INTO `chats` (`chatId`) VALUES
(1),
(2),
(3),
(4);

-- --------------------------------------------------------

--
-- Zastąpiona struktura widoku `latestMessagesByChats`
-- (Zobacz poniżej rzeczywisty widok)
--
CREATE TABLE `latestMessagesByChats` (
`chatId` int(11)
,`messageId` int(11)
,`timestamp` text
);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `logs`
--

CREATE TABLE `logs` (
  `logId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `timestamp` text COLLATE utf8_polish_ci NOT NULL,
  `action` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `logs`
--

INSERT INTO `logs` (`logId`, `userId`, `timestamp`, `action`) VALUES
(1, 4, '1568225200646', 'Login'),
(2, 4, '1568225382764', 'Login'),
(3, 4, '1568296061645', 'Login'),
(4, 4, '1568298020546', 'Login'),
(5, 4, '1568298208373', 'Login'),
(6, 4, '1568299304874', 'Login'),
(7, 4, '1568315500767', 'Login'),
(8, 5, '1568315919950', 'Login'),
(9, 4, '1568389640730', 'Login'),
(10, 4, '1568389772755', 'Login'),
(11, 4, '1568390042426', 'Login'),
(12, 4, '1568744163894', 'Login'),
(13, 4, '1569243026524', 'Login'),
(14, 4, '1569956775043', 'Login'),
(15, 4, '1569962904282', 'Login'),
(16, 4, '1569963032769', 'Login'),
(17, 4, '1569999929776', 'Login'),
(18, 4, '1570002377602', 'Login'),
(19, 4, '1570003166840', 'Login'),
(20, 4, '1570048301608', 'Login'),
(21, 4, '1570175391920', 'Login');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `messages`
--

CREATE TABLE `messages` (
  `messageId` int(11) NOT NULL,
  `chatId` int(11) NOT NULL,
  `content` text COLLATE utf8_polish_ci NOT NULL,
  `timestamp` text COLLATE utf8_polish_ci NOT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `senderCanSee` tinyint(1) DEFAULT '1',
  `receiverCanSee` tinyint(1) DEFAULT '1',
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `messages`
--

INSERT INTO `messages` (`messageId`, `chatId`, `content`, `timestamp`, `isRead`, `type`, `senderCanSee`, `receiverCanSee`, `userId`) VALUES
(1, 1, 'Hej', '1568148910440', 1, NULL, 1, 1, 4),
(2, 2, 'Ewelinkoo', '1568149377831', 1, NULL, 1, 1, 4),
(3, 2, 'Co tam?', '1568193700164', 1, NULL, 1, 1, 5),
(4, 2, 'Kiedy przyjdziesz?', '1568193803646', 1, NULL, 1, 1, 4),
(5, 3, 'Mamooo', '1568201390515', 1, NULL, 1, 1, 7),
(6, 3, 'Co?', '1568201434506', 1, NULL, 1, 1, 6),
(7, 4, 'Jest u cb Mateusz?', '1568201499025', 1, NULL, 1, 1, 7),
(8, 4, 'Tak', '1568201527330', 1, NULL, 1, 1, 5),
(9, 1, 'Yo!', '1569963498132', 0, 0, 1, 1, 1),
(10, 2, 'Zaraz', '1570047362543', 0, 0, 1, 1, 5),
(11, 2, 'Widzę cię :D', '1570055275504', 0, 0, 1, 1, 4),
(12, 1, 'Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki.', '1570136872594', 0, 0, 1, 1, 1),
(13, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus quis justo pulvinar interdum. Nullam blandit tincidunt enim dapibus ullamcorper. Sed suscipit, mi at dapibus pharetra, quam risus imperdiet mauris, sed consectetur risus sapien ac est. Aliquam accumsan finibus ex, ut gravida nulla suscipit in. Aliquam consequat in nunc in elementum. ', '1570136996658', 0, 0, 1, 1, 4),
(14, 1, 'heloł', '1570176524567', 0, 0, 1, 1, 4),
(15, 1, 'dgfdfdg', '1570196366723', 0, 0, 1, 1, 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `userChat`
--

CREATE TABLE `userChat` (
  `userChatId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `chatId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `userChat`
--

INSERT INTO `userChat` (`userChatId`, `userId`, `chatId`) VALUES
(1, 1, 1),
(2, 4, 1),
(3, 4, 2),
(4, 5, 2),
(5, 7, 3),
(6, 6, 3),
(7, 5, 4),
(8, 7, 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` text COLLATE utf8_polish_ci NOT NULL,
  `password` text COLLATE utf8_polish_ci NOT NULL,
  `name` text COLLATE utf8_polish_ci NOT NULL,
  `surname` text COLLATE utf8_polish_ci NOT NULL,
  `isActive` tinyint(1) DEFAULT '0',
  `lastSeen` text COLLATE utf8_polish_ci,
  `photo` text COLLATE utf8_polish_ci,
  `activated` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`userId`, `email`, `password`, `name`, `surname`, `isActive`, `lastSeen`, `photo`, `activated`) VALUES
(1, 'rusak.mateusz2@gmail.com', 'd90cc3ca2fc880f52c662d2dac3440a0', 'Mateusz', 'Rusak', 0, NULL, '', 1),
(4, 'rusakkk@live.com', 'd90cc3ca2fc880f52c662d2dac3440a0', 'Mateusz', 'Rusak', 0, NULL, NULL, 1),
(5, 'milowylas98@gmail.com', 'd90cc3ca2fc880f52c662d2dac3440a0', 'Ewelina', 'Garbarczyk', NULL, NULL, NULL, 1),
(6, 'rusak.anna5@gmail.com', 'd90cc3ca2fc880f52c662d2dac3440a0', 'Anna', 'Rusak', NULL, NULL, NULL, 1),
(7, 'julczir@gmail.com', 'd90cc3ca2fc880f52c662d2dac3440a0', 'Julia', 'Rusak', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Zastąpiona struktura widoku `usersAndTheirChats`
-- (Zobacz poniżej rzeczywisty widok)
--
CREATE TABLE `usersAndTheirChats` (
`userId` int(11)
,`name` mediumtext
,`chatId` int(11)
,`userChatId` int(11)
);

-- --------------------------------------------------------

--
-- Struktura widoku `latestMessagesByChats`
--
DROP TABLE IF EXISTS `latestMessagesByChats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `latestMessagesByChats`  AS  select `messages`.`chatId` AS `chatId`,max(`messages`.`messageId`) AS `messageId`,`messages`.`timestamp` AS `timestamp` from `messages` group by `messages`.`chatId` ;

-- --------------------------------------------------------

--
-- Struktura widoku `usersAndTheirChats`
--
DROP TABLE IF EXISTS `usersAndTheirChats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usersAndTheirChats`  AS  select distinct `users`.`userId` AS `userId`,concat_ws(' ',`users`.`name`,`users`.`surname`) AS `name`,`userChat`.`chatId` AS `chatId`,`userChat`.`userChatId` AS `userChatId` from ((`users` join `userChat`) join `chats`) where ((`users`.`userId` = `userChat`.`userId`) and (`chats`.`chatId` = `userChat`.`chatId`)) ;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chatId`),
  ADD KEY `chatId` (`chatId`);

--
-- Indeksy dla tabeli `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`logId`),
  ADD KEY `logId` (`logId`),
  ADD KEY `user` (`userId`);

--
-- Indeksy dla tabeli `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`messageId`),
  ADD KEY `messageId` (`messageId`),
  ADD KEY `sender` (`userId`),
  ADD KEY `chatId` (`chatId`);

--
-- Indeksy dla tabeli `userChat`
--
ALTER TABLE `userChat`
  ADD PRIMARY KEY (`userChatId`),
  ADD KEY `user` (`userId`),
  ADD KEY `chat` (`chatId`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `chats`
--
ALTER TABLE `chats`
  MODIFY `chatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `logs`
--
ALTER TABLE `logs`
  MODIFY `logId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT dla tabeli `messages`
--
ALTER TABLE `messages`
  MODIFY `messageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT dla tabeli `userChat`
--
ALTER TABLE `userChat`
  MODIFY `userChatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Ograniczenia dla tabeli `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`);

--
-- Ograniczenia dla tabeli `userChat`
--
ALTER TABLE `userChat`
  ADD CONSTRAINT `userChat_ibfk_1` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`),
  ADD CONSTRAINT `userChat_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
