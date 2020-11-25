-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2020 at 02:00 PM
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
  `branch` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `fk_user_id`, `first_name`, `middle_name`, `last_name`, `address`, `birth_date`, `gender`, `location`, `branch`) VALUES
(2, 2, 'Opet', 'P', 'Test lastname', 'Test address 2', '2020-01-01', 'Female', 'Mandaue', 'Branch Option 3');

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
(3, 2, 'motorcycle', 'StrongHold', '33333', 'gds123', 'Bob', 'Petey', '6123782', 'honda', 'Marion', 'Peter', '2222', 'Matt', 'manila', '2020-11-07', '2020-11-07', '2121-11-07', 0, 0, 0, '7', 'November', '2020', 'Allan Doe', '162 Little Embers Court', '2020-11-07', 222, 0, 0, 0, 0, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Cash', ''),
(4, 2, 'motorcycle', 'StrongHold', '1234566', '555123', 'Bob', 'Petey', '51235612', 'honda', 'Marion', 'Peter', '3333', 'Matt', 'cagayan', '2020-11-07', '2020-11-07', '2021-11-06', 123, 22, 22, '7', 'November', '2020', 'John Doe', '162 Little Embers Court', '2020-11-07', 222, 555, 5, 4, 0, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Cash', ''),
(5, 2, 'motorcycle', 'StrongHold', '22222', 'Petey', 'Anna', 'Marion', '6123123', '123123', 'Holly', 'Bob', '123456', 'Kerry', 'Petey', '1970-01-01', '1970-01-01', '1970-01-01', 0, 0, 0, 'Peter', 'Anna', 'Anna', 'Anna Diaz', 'test address', '2020-11-07', 0, 0, 0, 0, 0, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Check', '123578900'),
(6, 2, 'motorcycle', 'StrongHold', '51231', '11123123', '123123', '23123', '5123123', '56123', 'BMW', 'test body1', '4444', 'red', 'cebu', '2020-11-24', '2020-11-24', '2021-11-24', 200, 200, 200, '24', 'November', '2020', 'John Prats', 'dalaguete', '2020-11-24', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '0', 'Check', '123123123');

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
(1, 'admin', '$2y$10$26XhmRp3LVAYyfWc968LIO9jjS.gVovO83Iiwbx7sd8ReVUIumj5O', 1, 1, 0),
(2, 'user', '$2y$10$7m7oFIvna9YEqmg/Fl7H6OXJjD9HQx70pQIIDW9JoidmNssK78bhe', 2, 1, 0);

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
  `status` int(11) NOT NULL,
  `contact` varchar(55) NOT NULL,
  `location` varchar(55) NOT NULL,
  `office` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_meta`
--

INSERT INTO `user_meta` (`user_meta_id`, `fk_user_id`, `first_name`, `last_name`, `middle_name`, `email`, `status`, `contact`, `location`, `office`) VALUES
(1, 1, 'admin', 'emocar', 'milde', 'vitualla@gmail.com', 2, '123546566', 'Cebu', 'Office 1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

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
  MODIFY `employee_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_meta`
--
ALTER TABLE `user_meta`
  MODIFY `user_meta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
