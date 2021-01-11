-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 11, 2021 at 06:56 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emocar_db`
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
(6, 8, 'Anabelle', 'Bejagan', 'Torino', 'Anahaw Buhisan Cebu City', '1977-08-13', 'Female', '1', 'anabellebtorino123@gmail.com', '09264418054', '1', ''),
(7, 9, 'Opets', 'Tests', 'Lstnames', 'Cebu ', '1998-01-05', 'Male', '1', 'test@sdf.com', '123568765', '1', 'profile-1610233723.png'),
(8, 10, 'Van', 'Helsing', 'Tigbak', 'Alcoy cebu', '2001-04-06', 'Male', '1', 'test@testes.com', '123456789', '1', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_agent_policies`
--

CREATE TABLE `tbl_agent_policies` (
  `agent_policy_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `trust_receipt_no` int(11) NOT NULL,
  `table_data` longtext NOT NULL,
  `place_issued` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_agent_policies`
--

INSERT INTO `tbl_agent_policies` (`agent_policy_id`, `fk_user_id`, `trust_receipt_no`, `table_data`, `place_issued`, `status`, `date_added`) VALUES
(10, 9, 3, '[{\"id\":\"motorcycle\",\"tble_data\":[{\"id\":\"coc\",\"sfrom\":\"1\",\"sTo\":\"1\",\"set\":\"1.1\",\"qty\":\"55\"},{\"id\":\"or\",\"sfrom\":\"1\",\"sTo\":\"1\",\"set\":\"2.22\",\"qty\":\"111\"},{\"id\":\"policy\",\"sfrom\":\"1\",\"sTo\":\"1\",\"set\":\"1.32\",\"qty\":\"66\"}]},{\"id\":\"private\",\"tble_data\":[{\"id\":\"coc\",\"sfrom\":\"2\",\"sTo\":\"2\",\"set\":\"1.08\",\"qty\":\"54\"},{\"id\":\"or\",\"sfrom\":\"2\",\"sTo\":\"2\",\"set\":\"0.2\",\"qty\":\"10\"},{\"id\":\"policy\",\"sfrom\":\"2\",\"sTo\":\"2\",\"set\":\"1.3\",\"qty\":\"65\"}]},{\"id\":\"trailer\",\"tble_data\":[{\"id\":\"coc\",\"sfrom\":\"11\",\"sTo\":\"11\",\"set\":\"1.34\",\"qty\":\"67\"},{\"id\":\"or\",\"sfrom\":\"5\",\"sTo\":\"5\",\"set\":\"1.46\",\"qty\":\"73\"},{\"id\":\"policy\",\"sfrom\":\"5\",\"sTo\":\"5\",\"set\":\"1.02\",\"qty\":\"51\"}]}]', 'Cebu City', 1, '2021-01-10'),
(11, 9, 4, '[{\"id\":\"motorcycle\",\"tble_data\":[{\"id\":\"coc\",\"sfrom\":\"1\",\"sTo\":\"1\",\"set\":\"1\",\"qty\":\"50\"},{\"id\":\"or\",\"sfrom\":\"1\",\"sTo\":\"1\",\"set\":\"1.1\",\"qty\":\"55\"},{\"id\":\"policy\",\"sfrom\":\"1\",\"sTo\":\"1\",\"set\":\"1.54\",\"qty\":\"77\"}]},{\"id\":\"tricycle\",\"tble_data\":[{\"id\":\"coc\",\"sfrom\":\"1001\",\"sTo\":\"1001\",\"set\":\"1\",\"qty\":\"50\"},{\"id\":\"or\",\"sfrom\":\"1001\",\"sTo\":\"1001\",\"set\":\"1\",\"qty\":\"50\"},{\"id\":\"policy\",\"sfrom\":\"1001\",\"sTo\":\"1001\",\"set\":\"1\",\"qty\":\"50\"}]}]', 'Cebu City', 1, '2021-01-10'),
(12, 10, 5, '[{\"id\":\"motorcycle\",\"tble_data\":[{\"id\":\"coc\",\"sfrom\":\"1010\",\"sTo\":\"1010\",\"set\":\"79.82\",\"qty\":\"3991\"},{\"id\":\"or\",\"sfrom\":\"6001\",\"sTo\":\"6001\",\"set\":\"1\",\"qty\":\"50\"},{\"id\":\"policy\",\"sfrom\":\"2\",\"sTo\":\"2\",\"set\":\"1\",\"qty\":\"50\"}]}]', 'Cebu City', 1, '2021-01-11');

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
(1, 1, 'Main', '2020-11-28', 1);

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
(1, 'Cebu City', '2020-11-28', 1);

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
(44, 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInVzZXJuYW1lIjoidXNlciIsInVzZXJfdHlwZSI6IjIiLCJzdGF0dXMiOiIxIiwiaXNfbG9nZ2VkIjoiMCIsImVtcGxveWVlX2lkIjoiMiIsImZrX3VzZXJfaWQiOiIyIiwiZmlyc3RfbmFtZSI6Ik9wZXQiLCJtaWRkbGVfbmFtZSI6IlAiLCJsYXN0X25hbWUiOiJUZXN0IGxhc3RuYW1lIiwiYWRkcmVzcyI6IlRlc3QgYWRkcmVzcyAyIiwiYmlydGhfZGF0ZSI6IjIwMjAtMDEtMjMiLCJnZW5kZXIiOiJGZW1hbGUiLCJsb2NhdGlvbiI6IjIiLCJlbWFpbCI6Imp1cGhldHZpdHVhbGxhQGdtYWlsLmNvbSIsImNvbnRhY3Rfbm8iOiIxMjM0NTY3Nzg4IiwiYnJhbmNoIjoiNSIsInByb2ZpbGVfbmFtZSI6InByb2ZpbGUtMTYwNjgwOTc5MS5wbmciLCJsb2NfaWQiOiIyIiwibG9jYXRpb25fbmFtZSI6Ik1hbmRhdWUiLCJkYXRlX2FkZGVkIjoiMjAyMC0xMS0yOCIsImJyYW5jaF9pZCI6IjUiLCJma19sb2NhdGlvbl9pZCI6IjIiLCJicmFuY2hfbmFtZSI6IkJyYW5jaCAyIiwidGltZSI6MTYwNzI0ODQyMH0.zp6XltXyB-2FbXfjXMzO7wrHd9EAjHTNBN9-uXfAMEo', '2020-12-06', '2020-12-07', 1);

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
  `check_no` varchar(100) NOT NULL,
  `coc_no` varchar(100) NOT NULL,
  `series_no` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_transactions`
--

INSERT INTO `tbl_transactions` (`trans_id`, `fk_user_id`, `trans_type`, `trans_option`, `mb_file_no`, `plate_no`, `motor_no`, `serial_chassis`, `policy_no`, `model_no`, `make`, `type_of_body`, `official_receipt`, `color`, `place`, `date_issued`, `date_from`, `date_to`, `others`, `pol_docs_stamp`, `lgt`, `policy_day`, `policy_month`, `policy_year`, `received_from`, `address`, `or_date`, `premium_sales`, `docs_stamp`, `lg_tax`, `misc`, `or_total`, `the_sum_of_pesos`, `status`, `published_status`, `paid_type`, `check_no`, `coc_no`, `series_no`) VALUES
(12, 8, 'Motorcycle', 'StrongHold', '55555', '070106', 'x', 'xxxxxx', '000000000', '2016', 'yyama', 'mc', '111111', 'otange', 'cebu city', '2020-12-21', '2020-12-21', '2021-12-21', 200, 200, 200, '21', 'December', '2020', 'Anabel', 'cebu city', '2020-12-21', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '1', 'Cash', '', '00000000', 'asdasd'),
(13, 8, 'Motorcycle', 'StrongHold', 'asdasd', 'asd', 'asdasd', 'tesdt', '123', 'asd', 'asdasd', 'asd', '123123', 'test', '123123', '2020-12-22', '2020-12-22', '2021-12-22', 200, 200, 200, '22', 'December', '2020', 'Test', 'tesadd', '2020-12-22', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '0', 'Cash', '', '123123', 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_trust_agents`
--

CREATE TABLE `tbl_trust_agents` (
  `trans_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `fk_trust_receipt_id` int(11) NOT NULL,
  `trust_data` longtext NOT NULL,
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
  `check_no` varchar(100) NOT NULL,
  `coc_no` varchar(100) NOT NULL,
  `series_no` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_trust_agents`
--

INSERT INTO `tbl_trust_agents` (`trans_id`, `fk_user_id`, `fk_trust_receipt_id`, `trust_data`, `trans_type`, `trans_option`, `mb_file_no`, `plate_no`, `motor_no`, `serial_chassis`, `policy_no`, `model_no`, `make`, `type_of_body`, `official_receipt`, `color`, `place`, `date_issued`, `date_from`, `date_to`, `others`, `pol_docs_stamp`, `lgt`, `policy_day`, `policy_month`, `policy_year`, `received_from`, `address`, `or_date`, `premium_sales`, `docs_stamp`, `lg_tax`, `misc`, `or_total`, `the_sum_of_pesos`, `status`, `published_status`, `paid_type`, `check_no`, `coc_no`, `series_no`) VALUES
(1, 9, 4, '[{\"name\":\"motorcycle\",\"serNum\":1,\"type\":\"coc\"},{\"name\":\"motorcycle\",\"serNum\":3,\"type\":\"or\"},{\"name\":\"motorcycle\",\"serNum\":76,\"type\":\"policy\"}]', 'Motorcycle', 'StrongHold', 'mv1234', 'palce1234', 'motro', 'serial1234', 'pocliy234', 'model123', 'make1234', 'body1234', 'or1234', 'color', 'cebu city', '2021-01-10', '2021-01-10', '2022-01-10', 200, 200, 200, '10', 'January', '2021', 'Juan cruz', 'test address', '2121-01-10', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '0', 'Cash', '', 'coc1234', 'series'),
(2, 9, 4, '[{\"name\":\"motorcycle\",\"serNum\":2,\"type\":\"coc\"},{\"name\":\"motorcycle\",\"serNum\":4,\"type\":\"or\"},{\"name\":\"motorcycle\",\"serNum\":56,\"type\":\"policy\"}]', 'Motorcycle', 'StrongHold', 'mv11111', 'plate123', 'motor123', 'seriak', 'policy123', 'model1', 'maketes', 'testbody', 'or1234', 'red', 'place of isstest', '2021-01-10', '2021-01-10', '2022-01-10', 200, 200, 200, '10', 'January', '2021', 'Test from', 'address ts', '2121-01-10', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '0', 'Check', '1234', 'coc1234', '1234'),
(3, 9, 4, '[{\"name\":\"motorcycle\",\"serNum\":3,\"type\":\"coc\"},{\"name\":\"motorcycle\",\"serNum\":5,\"type\":\"or\"},{\"name\":\"motorcycle\",\"serNum\":77,\"type\":\"policy\"}]', 'Motorcycle', 'StrongHold', 'test mv', 'place', 'test mottr', 'serial', 'policy123', '123model', 'mnak tes', 'bodu', 'or11111', 'blue', 'test', '2021-01-11', '2021-01-11', '2022-01-11', 200, 200, 200, '11', 'January', '2021', 'Receiuve from', 'test addres', '2121-01-11', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '0', 'Cash', '', 'coc123', 'series1111'),
(4, 10, 5, '[{\"name\":\"motorcycle\",\"serNum\":1010,\"type\":\"coc\"},{\"name\":\"motorcycle\",\"serNum\":51,\"type\":\"policy\"},{\"name\":\"motorcycle\",\"serNum\":6001,\"type\":\"or\"}]', 'Motorcycle', 'StrongHold', 'mvttt', 'place56', 'motor6', 'serial99', 'pool877', 'model99', 'make', 'body77', 'or88', 'red', 'cuby alcoy', '2021-01-11', '2021-01-11', '2022-01-11', 200, 200, 200, '11', 'January', '2021', 'Juna va', 'testy addddddd', '2121-01-11', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '0', 'Cash', '', 'coco89888', 'seruies1'),
(5, 5, 5, '[{\"name\":\"motorcycle\",\"serNum\":1011,\"type\":\"coc\"},{\"name\":\"motorcycle\",\"serNum\":50,\"type\":\"policy\"},{\"name\":\"motorcycle\",\"serNum\":6050,\"type\":\"or\"}]', 'Motorcycle', 'StrongHold', 'mv test', 'tesplae', 'test mottr111', 'ser010293', 'pol99', 'mod99', 'tea', 'body 15123', 'or99', 'red99', 'issue99', '2021-01-11', '2021-01-11', '2022-01-11', 200, 200, 200, '11', 'January', '2021', 'Rec99', 'add99', '2121-01-11', 250, 100, 100, 200, 650, 'SIX HUNDRED FIFTY PESOS ONLY', 1, '0', 'Cash', '', 'coc99', 'ser123');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_trust_receipt`
--

CREATE TABLE `tbl_trust_receipt` (
  `trust_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_trust_receipt`
--

INSERT INTO `tbl_trust_receipt` (`trust_id`, `status`, `date_added`) VALUES
(1, 1, '2021-01-02'),
(2, 1, '2021-01-09'),
(3, 1, '2021-01-10'),
(4, 1, '2021-01-10'),
(5, 1, '2021-01-11');

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
(8, 'test', '$2y$10$zg4hcu3jrnJKwNM05.EMI.yRYdqc.Ql/fPTtUS6wv60EPeoACqHp.', 2, 1, 0),
(9, 'opet', '$2y$10$xvVMrn6fCMCEL./zXqXi1eyZ7POfCzYFghKN85qGswMDqT.YlcJtm', 4, 1, 0),
(10, 'van', '$2y$10$G0D/xblikTn.Q.vOHqyOteQ4jiA..tOQpHYFoitYv4H.km/ojDa1O', 4, 1, 0);

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
(1, 1, 'admin', 'Emocar', 'E', 'vitualla@gmail.com', '123546566', '1', '1', 'Male', '2011-02-09', 'cebu city', 'profile-1606619739.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `tbl_agent_policies`
--
ALTER TABLE `tbl_agent_policies`
  ADD PRIMARY KEY (`agent_policy_id`);

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
-- Indexes for table `tbl_trust_agents`
--
ALTER TABLE `tbl_trust_agents`
  ADD PRIMARY KEY (`trans_id`);

--
-- Indexes for table `tbl_trust_receipt`
--
ALTER TABLE `tbl_trust_receipt`
  ADD PRIMARY KEY (`trust_id`);

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
  MODIFY `employee_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_agent_policies`
--
ALTER TABLE `tbl_agent_policies`
  MODIFY `agent_policy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_trust_agents`
--
ALTER TABLE `tbl_trust_agents`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_trust_receipt`
--
ALTER TABLE `tbl_trust_receipt`
  MODIFY `trust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_meta`
--
ALTER TABLE `user_meta`
  MODIFY `user_meta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
