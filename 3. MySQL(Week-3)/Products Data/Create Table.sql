CREATE SCHEMA `tssk_products_data` ;

CREATE TABLE `products` (
  `id` bigint NOT NULL,
  `title` varchar(300) NOT NULL,
  `body_html` varchar(10000) DEFAULT NULL,
  `vendor` varchar(100) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `created_at` varchar(100) NOT NULL,
  `handle` varchar(300) NOT NULL,
  `updated_at` varchar(100) NOT NULL,
  `published_at` varchar(100) NOT NULL,
  `template_suffix` varchar(50) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `published_scope` varchar(10) NOT NULL,
  `tags` varchar(50) DEFAULT NULL,
  `admin_graphql_api_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `images` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `position` int DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `alt` varchar(50) DEFAULT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `src` varchar(500) DEFAULT NULL,
  `variant_ids` json DEFAULT NULL,
  `isDefault` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  foreign key (product_id) references products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `options` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `position` int DEFAULT NULL,
  `value` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  foreign key (product_id) references products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `variants` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `weight_unit` varchar(30) DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `taxable` tinyint(1) DEFAULT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `requires_shipping` tinyint(1) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `position` int DEFAULT NULL,
  `option3` varchar(50) DEFAULT NULL,
  `option2` varchar(50) DEFAULT NULL,
  `option1` varchar(100) DEFAULT NULL,
  `old_inventory_quantity` int DEFAULT NULL,
  `inventory_quantity` int DEFAULT NULL,
  `inventory_policy` varchar(50) DEFAULT NULL,
  `inventory_management` varchar(50) DEFAULT NULL,
  `inventory_item_id` bigint DEFAULT NULL,
  `image_id` varchar(50) DEFAULT '0',
  `grams` int DEFAULT NULL,
  `fulfillment_service` varchar(100) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `compare_at_price` float DEFAULT NULL,
  `barcode` varchar(20) DEFAULT NULL,
  `admin_graphql_api_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
