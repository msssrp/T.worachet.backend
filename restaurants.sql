-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 19, 2023 at 10:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `type`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Korean Toast Sandwich by Jam - GrabKitchen วนิลามูน', 'Breakfast & Brunch, Coupon, Street Food, Small Bites/Snacks, Fast Food', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C332LP2XNKVDG6/hero/c87aebd9ea4c4a64ad8e92fe39b552a8_1674709197550775964.webp', NULL, NULL),
(2, 'มิว เปาะเปี๊ยสดหน้าปู - ถนนพรานนก', 'Street Food', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2VBR242WF4YCA/hero/8022a4a7bddd46d090407bea5f9da7d1_1624506054129442137.webp', NULL, NULL),
(3, 'Koji japanese food - พระราม 5', 'Street Food', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2LJJ66FNTWYNA/hero/97d45766-7fd9-4085-bdf6-962ad18a0232__store_cover__2023__06__10__13__02__00.webp', NULL, NULL),
(4, 'เจ๊ กลอยอาหารตามสั่งอนุสาวรีย์ชัยฯ - ถนนราชวิถี', 'Coupon, Fast Food', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2MAMEDZLRJ2FE/hero/7b3f14b7a5a54c83aa7a64ae96f39f82_1652069267376918307.webp', NULL, NULL),
(5, 'กะเพราบ้านช่างจรัญ 43 - อรุณอมรินทร์', 'Fast Food', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C33UAEXAGA5TRN/hero/ec866046-9ee5-4a2a-8c95-6a4cc6bfc4ab__store_cover__2023__06__14__09__18__43.webp', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
