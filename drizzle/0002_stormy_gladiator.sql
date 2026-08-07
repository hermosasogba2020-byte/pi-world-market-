CREATE TABLE `claims` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`userId` int NOT NULL,
	`reason` varchar(255) NOT NULL,
	`description` longtext,
	`status` enum('open','in_review','resolved','closed') DEFAULT 'open',
	`decision` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `claims_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dropshipProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`wholesalerId` int NOT NULL,
	`dropshipperId` int NOT NULL,
	`wholesalePrice` decimal(12,2) NOT NULL,
	`dropshipPrice` decimal(12,2) NOT NULL,
	`commission` decimal(5,2) NOT NULL,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dropshipProducts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `investmentProjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entrepreneurId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` longtext,
	`category` varchar(100) NOT NULL,
	`targetAmount` decimal(15,2) NOT NULL,
	`raisedAmount` decimal(15,2) DEFAULT '0',
	`minInvestment` decimal(12,2) NOT NULL,
	`expectedReturn` decimal(5,2),
	`status` enum('draft','active','funded','closed') DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `investmentProjects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `investments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`investorId` int NOT NULL,
	`amount` decimal(15,2) NOT NULL,
	`status` enum('pending','confirmed','completed') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `investments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`invoiceNumber` varchar(50) NOT NULL,
	`totalAmount` decimal(12,2) NOT NULL,
	`pdfUrl` text,
	`status` enum('draft','issued','paid','cancelled') DEFAULT 'issued',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`),
	CONSTRAINT `invoices_invoiceNumber_unique` UNIQUE(`invoiceNumber`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`latitude` decimal(10,8) NOT NULL,
	`longitude` decimal(11,8) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `realEstateListings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` longtext,
	`type` enum('house','apartment','land','commercial','office') NOT NULL,
	`price` decimal(15,2) NOT NULL,
	`location` varchar(255) NOT NULL,
	`latitude` decimal(10,8),
	`longitude` decimal(11,8),
	`area` int,
	`bedrooms` int,
	`bathrooms` int,
	`images` longtext,
	`rating` decimal(3,2) DEFAULT '0',
	`totalReviews` int DEFAULT 0,
	`status` enum('available','sold','rented','archived') DEFAULT 'available',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `realEstateListings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicleListings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sellerId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` longtext,
	`type` enum('car','motorcycle','truck','bus','boat','aircraft') NOT NULL,
	`brand` varchar(100) NOT NULL,
	`model` varchar(100) NOT NULL,
	`year` int,
	`price` decimal(15,2) NOT NULL,
	`mileage` int,
	`images` longtext,
	`rating` decimal(3,2) DEFAULT '0',
	`totalReviews` int DEFAULT 0,
	`status` enum('available','sold','archived') DEFAULT 'available',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vehicleListings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `userRoles` MODIFY COLUMN `roleType` enum('buyer','seller','trainer','recruiter','candidate','driver','wholesaler','dropshipper','investor','ambassador','admin') NOT NULL;--> statement-breakpoint
ALTER TABLE `courseEnrollments` ADD CONSTRAINT `unique_enrollment` UNIQUE(`userId`,`courseId`);--> statement-breakpoint
ALTER TABLE `claims` ADD CONSTRAINT `claims_orderId_orders_id_fk` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `claims` ADD CONSTRAINT `claims_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dropshipProducts` ADD CONSTRAINT `dropshipProducts_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dropshipProducts` ADD CONSTRAINT `dropshipProducts_wholesalerId_users_id_fk` FOREIGN KEY (`wholesalerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dropshipProducts` ADD CONSTRAINT `dropshipProducts_dropshipperId_users_id_fk` FOREIGN KEY (`dropshipperId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `investmentProjects` ADD CONSTRAINT `investmentProjects_entrepreneurId_users_id_fk` FOREIGN KEY (`entrepreneurId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `investments` ADD CONSTRAINT `investments_projectId_investmentProjects_id_fk` FOREIGN KEY (`projectId`) REFERENCES `investmentProjects`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `investments` ADD CONSTRAINT `investments_investorId_users_id_fk` FOREIGN KEY (`investorId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_orderId_orders_id_fk` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `locations` ADD CONSTRAINT `locations_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `realEstateListings` ADD CONSTRAINT `realEstateListings_agentId_users_id_fk` FOREIGN KEY (`agentId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicleListings` ADD CONSTRAINT `vehicleListings_sellerId_users_id_fk` FOREIGN KEY (`sellerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `claims_orderId_idx` ON `claims` (`orderId`);--> statement-breakpoint
CREATE INDEX `claims_userId_idx` ON `claims` (`userId`);--> statement-breakpoint
CREATE INDEX `dropshipProducts_productId_idx` ON `dropshipProducts` (`productId`);--> statement-breakpoint
CREATE INDEX `dropshipProducts_wholesalerId_idx` ON `dropshipProducts` (`wholesalerId`);--> statement-breakpoint
CREATE INDEX `dropshipProducts_dropshipperId_idx` ON `dropshipProducts` (`dropshipperId`);--> statement-breakpoint
CREATE INDEX `investmentProjects_entrepreneurId_idx` ON `investmentProjects` (`entrepreneurId`);--> statement-breakpoint
CREATE INDEX `investmentProjects_category_idx` ON `investmentProjects` (`category`);--> statement-breakpoint
CREATE INDEX `investmentProjects_slug_idx` ON `investmentProjects` (`slug`);--> statement-breakpoint
CREATE INDEX `investments_projectId_idx` ON `investments` (`projectId`);--> statement-breakpoint
CREATE INDEX `investments_investorId_idx` ON `investments` (`investorId`);--> statement-breakpoint
CREATE INDEX `invoices_orderId_idx` ON `invoices` (`orderId`);--> statement-breakpoint
CREATE INDEX `invoices_invoiceNumber_idx` ON `invoices` (`invoiceNumber`);--> statement-breakpoint
CREATE INDEX `locations_userId_idx` ON `locations` (`userId`);--> statement-breakpoint
CREATE INDEX `realEstateListings_agentId_idx` ON `realEstateListings` (`agentId`);--> statement-breakpoint
CREATE INDEX `realEstateListings_type_idx` ON `realEstateListings` (`type`);--> statement-breakpoint
CREATE INDEX `realEstateListings_slug_idx` ON `realEstateListings` (`slug`);--> statement-breakpoint
CREATE INDEX `vehicleListings_sellerId_idx` ON `vehicleListings` (`sellerId`);--> statement-breakpoint
CREATE INDEX `vehicleListings_type_idx` ON `vehicleListings` (`type`);--> statement-breakpoint
CREATE INDEX `vehicleListings_slug_idx` ON `vehicleListings` (`slug`);--> statement-breakpoint
ALTER TABLE `courseEnrollments` ADD CONSTRAINT `courseEnrollments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `courseEnrollments` ADD CONSTRAINT `courseEnrollments_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_trainerId_users_id_fk` FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobApplications` ADD CONSTRAINT `jobApplications_jobId_jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobApplications` ADD CONSTRAINT `jobApplications_candidateId_users_id_fk` FOREIGN KEY (`candidateId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_recruiterId_users_id_fk` FOREIGN KEY (`recruiterId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_senderId_users_id_fk` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_recipientId_users_id_fk` FOREIGN KEY (`recipientId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderItems` ADD CONSTRAINT `orderItems_orderId_orders_id_fk` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderItems` ADD CONSTRAINT `orderItems_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_shopId_shops_id_fk` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shops` ADD CONSTRAINT `shops_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `travelBookings` ADD CONSTRAINT `travelBookings_travelId_travels_id_fk` FOREIGN KEY (`travelId`) REFERENCES `travels`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `travelBookings` ADD CONSTRAINT `travelBookings_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `travels` ADD CONSTRAINT `travels_providerId_users_id_fk` FOREIGN KEY (`providerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userRoles` ADD CONSTRAINT `userRoles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `courseEnrollments_userId_idx` ON `courseEnrollments` (`userId`);--> statement-breakpoint
CREATE INDEX `courseEnrollments_courseId_idx` ON `courseEnrollments` (`courseId`);--> statement-breakpoint
CREATE INDEX `courses_trainerId_idx` ON `courses` (`trainerId`);--> statement-breakpoint
CREATE INDEX `courses_category_idx` ON `courses` (`category`);--> statement-breakpoint
CREATE INDEX `courses_slug_idx` ON `courses` (`slug`);--> statement-breakpoint
CREATE INDEX `favorites_userId_idx` ON `favorites` (`userId`);--> statement-breakpoint
CREATE INDEX `favorites_item_idx` ON `favorites` (`itemType`,`itemId`);--> statement-breakpoint
CREATE INDEX `jobApplications_jobId_idx` ON `jobApplications` (`jobId`);--> statement-breakpoint
CREATE INDEX `jobApplications_candidateId_idx` ON `jobApplications` (`candidateId`);--> statement-breakpoint
CREATE INDEX `jobs_recruiterId_idx` ON `jobs` (`recruiterId`);--> statement-breakpoint
CREATE INDEX `jobs_category_idx` ON `jobs` (`category`);--> statement-breakpoint
CREATE INDEX `jobs_slug_idx` ON `jobs` (`slug`);--> statement-breakpoint
CREATE INDEX `lessons_courseId_idx` ON `lessons` (`courseId`);--> statement-breakpoint
CREATE INDEX `messages_senderId_idx` ON `messages` (`senderId`);--> statement-breakpoint
CREATE INDEX `messages_recipientId_idx` ON `messages` (`recipientId`);--> statement-breakpoint
CREATE INDEX `orderItems_orderId_idx` ON `orderItems` (`orderId`);--> statement-breakpoint
CREATE INDEX `orderItems_productId_idx` ON `orderItems` (`productId`);--> statement-breakpoint
CREATE INDEX `orders_userId_idx` ON `orders` (`userId`);--> statement-breakpoint
CREATE INDEX `orders_orderNumber_idx` ON `orders` (`orderNumber`);--> statement-breakpoint
CREATE INDEX `products_shopId_idx` ON `products` (`shopId`);--> statement-breakpoint
CREATE INDEX `products_category_idx` ON `products` (`category`);--> statement-breakpoint
CREATE INDEX `products_slug_idx` ON `products` (`slug`);--> statement-breakpoint
CREATE INDEX `reviews_userId_idx` ON `reviews` (`userId`);--> statement-breakpoint
CREATE INDEX `reviews_target_idx` ON `reviews` (`targetType`,`targetId`);--> statement-breakpoint
CREATE INDEX `shops_userId_idx` ON `shops` (`userId`);--> statement-breakpoint
CREATE INDEX `shops_slug_idx` ON `shops` (`slug`);--> statement-breakpoint
CREATE INDEX `travelBookings_travelId_idx` ON `travelBookings` (`travelId`);--> statement-breakpoint
CREATE INDEX `travelBookings_userId_idx` ON `travelBookings` (`userId`);--> statement-breakpoint
CREATE INDEX `travels_providerId_idx` ON `travels` (`providerId`);--> statement-breakpoint
CREATE INDEX `travels_type_idx` ON `travels` (`type`);--> statement-breakpoint
CREATE INDEX `travels_slug_idx` ON `travels` (`slug`);--> statement-breakpoint
CREATE INDEX `userRoles_userId_idx` ON `userRoles` (`userId`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `openId_idx` ON `users` (`openId`);