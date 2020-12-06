-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2020 at 07:57 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emocar_db2020`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(100) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` varchar(100) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `profile_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `fk_user_id`, `first_name`, `middle_name`, `last_name`, `address`, `birth_date`, `gender`, `location`, `email`, `contact_no`, `branch`, `profile_name`) VALUES
(2, 2, 'Opet', 'P', 'Test lastname', 'Test address 2', '2020-01-23', 'Female', '2', 'juphetvitualla@gmail.com', '1234567788', '5', 'profile-1606809791.png'),
(4, 3, 'Juphetsss', 'P', 'Vituallas', 'Test address', '2009-02-02', 'Female', '2', 'test@test.com', '11111111', '5', ''),
(5, 7, 'Juan', 'P', 'Balongas', 'Test address 2', '1997-01-01', 'Male', '1', 'jessie@gmail.com', '61232123', '13', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_branches`
--

CREATE TABLE `tbl_branches` (
  `branch_id` int(11) NOT NULL,
  `fk_location_id` int(11) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `date_added` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_branches`
--

INSERT INTO `tbl_branches` (`branch_id`, `fk_location_id`, `branch_name`, `date_added`, `status`) VALUES
(1, 1, 'Branch 1', '2020-11-28', 1),
(2, 1, 'Branch 2', '2020-11-28', 1),
(3, 1, 'Branch 3', '2020-11-28', 1),
(4, 2, 'Branch 1', '2020-11-28', 1),
(5, 2, 'Branch 2', '2020-11-28', 1),
(6, 3, 'Branch 1', '2020-11-28', 1),
(7, 2, 'asd', '2020-11-28', 0),
(8, 2, 'asd asd asdas d', '2020-11-28', 0),
(9, 1, 'asdasd asd', '2020-11-28', 0),
(10, 2, 'sample 2', '2020-11-28', 0),
(11, 1, 'branch 2', '2020-11-28', 0),
(12, 3, 'test branch2', '2020-11-28', 0),
(13, 1, 'Colon', '2020-11-29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_locations`
--

CREATE TABLE `tbl_locations` (
  `loc_id` int(11) NOT NULL,
  `location_name` varchar(100) NOT NULL,
  `date_added` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_locations`
--

INSERT INTO `tbl_locations` (`loc_id`, `location_name`, `date_added`, `status`) VALUES
(1, 'Cebu', '2020-11-28', 1),
(2, 'Mandaue', '2020-11-28', 1),
(3, 'Lapu-Lapu', '2020-11-28', 1),
(4, 'cebu city', '2020-11-28', 0),
(5, 'NCR', '2020-11-28', 1),
(6, 'Davao2', '2020-11-28', 0),
(7, 'NCR2', '2020-11-28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_log_tokens`
--

CREATE TABLE `tbl_log_tokens` (
  `token_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `token_value` text NOT NULL,
  `date_added` date NOT NULL,
  `date_expired` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_log_tokens`
--

INSERT INTO `tbl_log_tokens` (`token_id`, `fk_user_id`, `token_value`, `date_added`, `date_expired`, `status`) VALUES
(40, 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInVzZXJuYW1lIjoidXNlciIsInVzZXJfdHlwZSI6IjIiLCJzdGF0dXMiOiIxIiwiaXNfbG9nZ2VkIjoiMCIsImVtcGxveWVlX2lkIjoiMiIsImZrX3VzZXJfaWQiOiIyIiwiZmlyc3RfbmFtZSI6Ik9wZXQiLCJtaWRkbGVfbmFtZSI6IlAiLCJsYXN0X25hbWUiOiJUZXN0IGxhc3RuYW1lIiwiYWRkcmVzcyI6IlRlc3QgYWRkcmVzcyAyIiwiYmlydGhfZGF0ZSI6IjIwMjAtMDEtMjMiLCJnZW5kZXIiOiJGZW1hbGUiLCJsb2NhdGlvbiI6IjIiLCJlbWFpbCI6Imp1cGhldHZpdHVhbGxhQGdtYWlsLmNvbSIsImNvbnRhY3Rfbm8iOiIxMjM0NTY3Nzg4IiwiYnJhbmNoIjoiNSIsInByb2ZpbGVfbmFtZSI6InByb2ZpbGUtMTYwNjgwOTc5MS5wbmciLCJsb2NfaWQiOiIyIiwibG9jYXRpb25fbmFtZSI6Ik1hbmRhdWUiLCJkYXRlX2FkZGVkIjoiMjAyMC0xMS0yOCIsImJyYW5jaF9pZCI6IjUiLCJma19sb2NhdGlvbl9pZCI6IjIiLCJicmFuY2hfbmFtZSI6IkJyYW5jaCAyIiwidGltZSI6MTYwNzIzNzcyMH0.2ab6_rqqdRqyeKTD1OTkV34U9M_9UC4b5hj4i5TLKd8', '2020-12-06', '2020-12-07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions`
--

CREATE TABLE `tbl_transactions` (
  `trans_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `trans_type` varchar(55) NOT NULL,
  `trans_option` varchar(55) NOT NULL,
  `mb_file_no` varchar(55) NOT NULL,
  `plate_no` varchar(55) NOT NULL,
  `motor_no` varchar(55) NOT NULL,
  `serial_chassis` varchar(55) NOT NULL,
  `policy_no` varchar(55) NOT NULL,
  `model_no` varchar(55) NOT NULL,
  `make` varchar(55) NOT NULL,
  `type_of_body` varchar(55) NOT NULL,
  `official_receipt` varchar(55) NOT NULL,
  `color` varchar(55) NOT NULL,
  `place` varchar(100) NOT NULL,
  `date_issued` date NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `others` double NOT NULL,
  `pol_docs_stamp` double NOT NULL,
  `lgt` double NOT NULL,
  `policy_day` varchar(55) NOT NULL,
  `policy_month` varchar(22) NOT NULL,
  `policy_year` varchar(22) NOT NULL,
  `received_from` varchar(55) NOT NULL,
  `address` varchar(100) NOT NULL,
  `or_date` date NOT NULL,
  `premium_sales` double NOT NULL,
  `docs_stamp` double NOT NULL,
  `lg_tax` double NOT NULL,
  `misc` double NOT NULL,
  `or_total` double NOT NULL,
  `the_sum_of_pesos` text NOT NULL,
  `status` int(11) NOT NULL,
  `published_status` varchar(55) NOT NULL,
  `paid_type` varchar(55) NOT NULL,
  `check_no` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_transactions`
--

INSERT INTO `tbl_transactions` (`trans_id`, `fk_user_id`, `trans_type`, `trans_option`, `mb_file_no`, `plate_no`, `motor_no`, `serial_chassis`, `policy_no`, `model_no`, `make`, `type_of_body`, `official_receipt`, `color`, `place`, `date_issued`, `date_from`, `date_to`, `others`, `pol_docs_stamp`, `lgt`, `policy_day`, `policy_month`, `policy_year`, `received_from`, `address`, `or_date`, `premium_sales`, `docs_stamp`, `lg_tax`, `misc`, `or_total`, `the_sum_of_pesos`, `status`, `published_status`, `paid_type`, `check_no`) VALUES
(2, 2, 'motorcycle', 'StrongHold', '55555', '234123', 'test', 'Petey', '1234566', 'honda', 'Marion', 'Peter', '1111', 'Matt', 'lapu lapu', '2020-11-07', '2020-11-07', '2121-11-07', 0, 0, 0, '7', 'November', '2020', 'Juan de cruz', '162 Little Embers Court', '2020-11-08', 560, 200, 200, 290, 1250, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Cash', ''),
(3, 2, 'tricycle', 'StrongHold', '33333', 'gds123', 'Bob', 'Petey', '6123782', 'honda', 'Marion', 'Peter', '2222', 'Matt', 'manila', '2020-11-07', '2020-11-07', '2121-11-07', 0, 0, 0, '7', 'November', '2020', 'Allan Doe', '162 Little Embers Court', '2020-11-07', 222, 0, 0, 0, 0, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Cash', ''),
(4, 3, 'private', 'StrongHold', '1234566', '555123', 'Bob', 'Petey', '51235612', 'honda', 'Marion', 'Peter', '3333', 'Matt', 'cagayan', '2020-11-07', '2020-11-07', '2021-11-06', 123, 22, 22, '7', 'November', '2020', 'John Doe', '162 Little Embers Court', '2020-11-07', 222, 555, 5, 4, 0, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Cash', ''),
(5, 2, 'commercial', 'StrongHold', '22222', 'Petey', 'Anna', 'Marion', '6123123', '123123', 'Holly', 'Bob', '123456', 'Kerry', 'Petey', '1970-01-01', '1970-01-01', '1970-01-01', 0, 0, 0, 'Peter', 'Anna', 'Anna', 'Anna Diaz', 'test address', '2020-11-07', 0, 0, 0, 0, 0, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Check', '123578900'),
(6, 2, 'trailer', 'StrongHold', '51231', '11123123', '123123', '23123', '5123123', '56123', 'BMW', 'test body1', '4444', 'red', 'cebu', '2020-11-24', '2020-11-24', '2021-11-24', 200, 200, 200, '24', 'November', '2020', 'John Prats', 'dalaguete', '2020-11-24', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 0, '0', 'Check', '123123123'),
(7, 2, 'motorcycle', 'StrongHold', '555123', '612311', '666611', 'cgase 2123', '6123123', 'test modale', 'honda', 'test vody', '6123123', 'blue', 'cebu city', '2020-11-29', '2020-11-30', '2021-11-30', 200, 200, 200, '29', 'November', '2020', 'Joch clart', 'mandaie', '2020-11-29', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Check', 'chck1235123'),
(8, 2, 'motorcycle', 'StrongHold', 'Cliff', 'Frank', 'Holly', 'Marion', 'Anna', 'Terry', 'Matt', 'Petey', 'Tom', 'Lynn', 'Sue', '1970-01-01', '1970-01-01', '1970-01-01', 0, 0, 0, 'Cory', 'Anna', 'Leonardo', 'Cruiser', '162 Little Embers Court', '7070-01-01', 0, 0, 0, 0, 0, 'This is a dummy text.', 0, '0', 'Check', 'Leonardo'),
(9, 2, 'motorcycle', 'StrongHold', 'asd', 'asd', 'asd', 'a', 'asd', 'asdas', 'asd', 'asd', 'asd', 'asd', 'asd', '2020-11-29', '2020-11-29', '2021-11-29', 200, 200, 200, '29', 'November', '2020', 'Asd', 'asd', '2020-11-29', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 0, '0', 'Check', 'asdasd'),
(10, 2, 'Motorcycle', 'StrongHold', '1111', '12', '11', '123', '123', '1', '123', '123', '123', '123', 'cenu', '2020-11-29', '2020-11-29', '2021-11-29', 200, 200, 200, '29', 'November', '2020', '11', 'Test address 2', '2020-11-29', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Cash', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1- admin\r\n2 - employee\r\n3 -semi admin',
  `status` int(11) NOT NULL,
  `is_logged` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `user_type`, `status`, `is_logged`) VALUES
(1, 'admin', '$2y$10$zg4hcu3jrnJKwNM05.EMI.yRYdqc.Ql/fPTtUS6wv60EPeoACqHp.', 1, 1, 0),
(2, 'user', '$2y$10$zg4hcu3jrnJKwNM05.EMI.yRYdqc.Ql/fPTtUS6wv60EPeoACqHp.', 2, 1, 0),
(3, 'opet', '$2y$10$evpPQQVKKkvOtcWx3plyoukQndCs6BHmTzT4orpRyQxS0Fk5dowbu', 2, 1, 0),
(5, 'admin2', '$2y$10$w.U5ay3B7h91w86y507jVuxtNq8r00k5ql8Wxm8p3q3xNlBVI4fey', 1, 1, 0),
(6, 'test', '$2y$10$TG0RpIqiXLD.SHNTNRvtgu.uQBler2If6VNvruzI9anxE4L.y.39.', 1, 1, 0),
(7, 'juan', '$2y$10$Qyb3sDuOVh3zu.BSkcbYfeVSpjFdwPyC/Ga5Z8iFYuzKDcjxmpNZi', 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_meta`
--

CREATE TABLE `user_meta` (
  `user_meta_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `first_name` varchar(66) NOT NULL,
  `last_name` varchar(55) NOT NULL,
  `middle_name` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL,
  `contact_no` varchar(55) NOT NULL,
  `location` varchar(55) NOT NULL,
  `branch` varchar(55) NOT NULL,
  `gender` varchar(55) NOT NULL,
  `birth_date` date NOT NULL,
  `address` varchar(200) NOT NULL,
  `profile_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_meta`
--

INSERT INTO `user_meta` (`user_meta_id`, `fk_user_id`, `first_name`, `last_name`, `middle_name`, `email`, `contact_no`, `location`, `branch`, `gender`, `birth_date`, `address`, `profile_name`) VALUES
(1, 1, 'admin', 'Emocar', 'E', 'vitualla@gmail.com', '123546566', '1', '1', 'Male', '2011-02-09', 'cebu city', 'profile-1606619739.jpg'),
(2, 5, 'James2', 'Leonardo2', 'Cliffs2', 'ex2@exs.com', '222222222', '1', '2', 'Female', '2016-02-25', 'Cebu test', ''),
(3, 6, 'Marion', 'Bob', 'Frank', 'example@proweaver.com', 'Cory', '1', '1', 'Male', '1971-05-28', '7669 Gulf Drive', 'profile-1606620051.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `tbl_branches`
--
ALTER TABLE `tbl_branches`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `tbl_locations`
--
ALTER TABLE `tbl_locations`
  ADD PRIMARY KEY (`loc_id`);

--
-- Indexes for table `tbl_log_tokens`
--
ALTER TABLE `tbl_log_tokens`
  ADD PRIMARY KEY (`token_id`);

--
-- Indexes for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD PRIMARY KEY (`trans_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_meta`
--
ALTER TABLE `user_meta`
  ADD PRIMARY KEY (`user_meta_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_branches`
--
ALTER TABLE `tbl_branches`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_locations`
--
ALTER TABLE `tbl_locations`
  MODIFY `loc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_log_tokens`
--
ALTER TABLE `tbl_log_tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_meta`
--
ALTER TABLE `user_meta`
  MODIFY `user_meta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
