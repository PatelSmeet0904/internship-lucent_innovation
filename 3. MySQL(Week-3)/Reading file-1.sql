--        ------------Create Tables---------------

CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` char(2) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ALTER--> ADD, MODIFY, DROP, AFTER
ALTER TABLE customer  
ADD `points` int NOT NULL DEFAULT '0'
AFTER `state`;

desc order_items;

alter table order_items
change column qauntity count varchar(10); -- drawback
desc order_items;

ALTER TABLE order_items   
RENAME COLUMN quantity TO count;  

RENAME TABLE customer to customers;
 
-- same
show columns from customers;
DESC customers;

show full columns from customers; -- also shows privileges, collation

--           -------------Temporary table-----------------

CREATE TEMPORARY TABLE temp_customers  
SELECT c.first_name, c.city, o.order_id, o.status   
FROM orders o  
INNER JOIN customers c ON c.customer_id = o.order_id  
ORDER BY c.first_name DESC;

SELECT * FROM temp_customers;

DROP TEMPORARY TABLE temp_customers; 

--          ---------------COPY TABLE---------------

CREATE TABLE copy_customers LIKE customers; 
SELECT * FROM copy_customers; -- it will be NULL

INSERT copy_customers SELECT * FROM customers;

--          ---------------REPAIR TABLE---------------
-- > MySQL Repair Table allows us to repair or fix the corrupted table. 
-- > The repair table in MySQL provides support only for selected storage engines, not for all

SHOW ENGINES; -- 9 engine

SELECT table_name, engine   
FROM information_schema.tables   
WHERE table_name = 'customers';  

REPAIR TABLE customers; -- doesn't support repair

ALTER TABLE customers engine="MyISAM"; -- gives error due to fk
REPAIR TABLE customers;

--     ---------------------VIEW----------------------
-- Why we use View?

-- > Simplify complex query
-- > Increases the Re-usability
-- > Help in Data Security
-- > Enable Backward Compatibility

create or replace view product_above_avg as
select product_id, unit_price from products
where unit_price > (select avg(unit_price) from products);

select * from product_above_avg;

alter view product_above_avg as
select product_id, quantity_in_stock,unit_price from products
where unit_price > (select avg(unit_price) from products);


--   --------------------Table Locking----------------
-- MySQL allows a client session to acquire a table lock explicitly to cooperate with other sessions to access the table's data. 
-- used to solve concurrency problems. 
-- lock_option contains four modes that are DEFAULT, NONE, SHARED, and EXCLUSIVE.

-- 1) READ LOCK: This lock allows a user to only read the data from a table.
lock tables order_items read;
select * from order_items;

ALTER TABLE order_items   
RENAME COLUMN quantity TO count;  -- gives error

select * from customers; -- gives error

select connection_id();
unlock tables;

LOCK TABLES customers READ;-- 
RENAME TABLE customers to customerss; -- Not Posible
UNLOCK TABLES;

-- 2) WRITE LOCK: This lock allows a user to do both reading and writing into a table.
lock table order_items write;-- 
select * from order_items;

ALTER TABLE order_items   
RENAME COLUMN quantity TO count; -- It works

-- Acoount Locking

CREATE USER 'smeet'@'localhost' IDENTIFIED BY '1234' ACCOUNT LOCK; -- It will not works, as i have already user of this name 
ALTER USER 'smeet'@'localhost' IDENTIFIED BY '1234' ACCOUNT LOCK;
ALTER USER 'smeet'@'localhost' ACCOUNT UNLOCK;

CREATE USER 'rudra'@'localhost' IDENTIFIED BY '1234' ACCOUNT LOCK;
ALTER USER  'rudra'@'localhost' ACCOUNT UNLOCK;

--     -----------------MySQL Constraints------------------------

-- 1) Column Level Constraints: These constraints are applied only to the single column that limits the type of particular column data.
-- 2) Table Level Constraints: These constraints are applied to the entire table that limits the type of data for the whole table.

-- The following are the most common constraints used in the MySQL:
-- ---> NOT NULL, CHECK, DEFAULT, PRIMARY KEY, AUTO_INCREMENT,UNIQUE, INDEX, ENUM, FOREIGN KEY

-- demo
CREATE TABLE Persons (  
    ID int NOT NULL primary key auto_increment,  
    Name varchar(45) NOT NULL,  
    Age int CHECK (Age>=18),
	City varchar(25) DEFAULT 'New York',
    shirt_size ENUM('small', 'medium', 'large', 'x-large') 
); 

-- INDEX Constraint

-- >An index is a data structure that allows us to add indexes in the existing table. 
-- >This constraint allows us to create and retrieve values from the table very quickly and easily.
-- >We use it to quickly find the record without searching each row in a database table whenever the table is accessed. 
-- >An index can be created using one or more than one column. It assigns a ROWID for each row in that way they were inserted into the table.

 CREATE INDEX name ON Persons(Name); 
SELECT * FROM Persons where name='smeet';
SELECT * FROM Persons USE INDEX(name) where name='smeet';
 EXPLAIN SELECT * FROM Persons USE INDEX(name);

REPLACE INTO Persons (id, city) VALUES(4,'Amsterdam'); -- sets other values to NULL 

SHOW INDEXES FROM persons; -- 
SHOW KEYS FROM persons IN sql_store;  

DROP INDEX name ON persons;
DROP INDEX primary ON persons;  

-- MySQL UNIQUE INDEX

-- MySQL allows another constraint called the UNIQUE INDEX to enforce the uniqueness of values in one or more columns. 
-- We can create more than one UNIQUE index in a single table, which is not possible with the primary key constraint.
CREATE UNIQUE INDEX age_city ON persons (age, city); 
show indexes from persons;
-- CLUSTERED INDEX vs NON-CLUSTERED INDEX
-- > The indexes other than PRIMARY indexes (clustered indexes) called a non-clustered index.

CREATE TABLE if not exists `student_info` (  
  `studentid` int NOT NULL AUTO_INCREMENT,  
  `name` varchar(45) DEFAULT NULL,   
  `email` varchar(25) DEFAULT NULL,  
  PRIMARY KEY (`studentid`), -- clustered index  
  UNIQUE KEY `email_UNIQUE` (`email`) -- unique index 
);

SHOW INDEXES FROM student_info;

-- update
UPDATE customers  
SET points = 1000 , first_name = 'Smeet', last_name = 'Patel'  
WHERE customer_id = 8; 

delete from shippers where shipper_id = 5; -- Now we insert next data then it will give id 6 not 5
DELETE FROM shippers ORDER BY shipper_id desc LIMIT 1;


-- MySQL INSERT ON DUPLICATE KEY Example
CREATE TABLE Student (  
  Stud_ID int AUTO_INCREMENT PRIMARY KEY,  
  Name varchar(45) DEFAULT NULL,  
  Email varchar(45) DEFAULT NULL,  
  City varchar(25) DEFAULT NULL  
);  

INSERT INTO Student(Stud_ID, Name, Email, City)   
VALUES (1,'Stephen', 'stephen@javatpoint.com', 'Texax'),   
(2, 'Joseph', 'Joseph@javatpoint.com', 'Alaska'),   
(3, 'Peter', 'Peter@javatpoint.com', 'california'); 

INSERT INTO Student(Stud_ID, Name, Email, City)   
VALUES (4,'John', 'john@javatpoint.com', 'New York');  

INSERT INTO Student(Stud_ID, Name, Email, City)   
VALUES (4, 'John', 'john@javatpoint.com', 'New York')  
ON DUPLICATE KEY UPDATE City = 'Califo';  

select * from Student;

-- MySQL INSERT IGNORE
--   ----> Insert Ignore statement in MySQL has a special feature that ignores the invalid rows whenever we are inserting single or multiple rows into a table. 

-- MySQL INSERT INTO SELECT
--  ---->this query copies data from one table and inserts them in the other table. We must consider the following point before using this statement:

-- The data types in source and target tables must be the same.
-- The existing records in the target table should be unaffected.

-- The INSERT INTO SELECT command is advantageous when we need to copy data from one table to another table or to summarize data from more than one table into a single table.

select name, if(age>21, 'married', 'have GF') as result from persons;

alter table persons add phone varchar(15);
-- insert into persons (phone)
select ifnull(phone, '8320210032') as phone from persons;

SELECT NULLIF('smeet','patel'); -- first expression
SELECT NULLIF('smeet','smeet'); -- null 
select name, shirt_size, nullif(shirt_size, 'large') from persons;

select id, shirt_size, 
 case shirt_size
	when 'x-large' then 'available only 1'
    when 'large' then 'unavailable'
    else 'available'
end as availability from persons;

SELECT studentid, name, pass FROM student1 WHERE pass is TRUE;  
SELECT name FROM persons WHERE name NOT LIKE 's%'; 
SELECT name FROM persons WHERE name in ('harsh' , 'smeet');

-- =  >  <  >=  <=  <>  !=
SELECT colm1 FROM table1 WHERE colm1 = ANY (SELECT colm1 FROM table2);  
SELECT colm1 FROM table1 WHERE colm1 IN (SELECT colm1 FROM table2);   
-- Also, NOT IN cannot be an alias for <> ANY operator, but it can be used for <> ALL.
-- The word SOME in MySQL can be an alias for ANY. Therefore, these two SQL statements are equivalent:
SELECT colm1 FROM table1 WHERE colm1 <>ANY (SELECT colm1 FROM table2);  

SELECT first_name, phone FROM customers  
WHERE EXISTS (SELECT * FROM orders WHERE customers.customer_id = orders.customer_id);

select name, age from persons where age between 19 and 21;

DELETE customers FROM customers  
LEFT JOIN contacts ON customers.customer_id = contacts.contact_id   
WHERE cellphone IS NULL; 

-- demo
SELECT address, COUNT(*)  
FROM   officers   
GROUP BY address; 

CREATE TABLE `order_item_notes` (
  `note_id` int NOT NULL,
  `order_Id` int NOT NULL,
  `product_id` int NOT NULL,
  `note` varchar(255) NOT NULL,
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order_items` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(4,2) NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `fk_order_items_products_idx` (`product_id`),
  CONSTRAINT `fk_order_items_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_order_items_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order_statuses` (
  `order_status_id` tinyint NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`order_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `order_date` date NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `comments` varchar(2000) DEFAULT NULL,
  `shipped_date` date DEFAULT NULL,
  `shipper_id` smallint DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_customers_idx` (`customer_id`),
  KEY `fk_orders_shippers_idx` (`shipper_id`),
  KEY `fk_orders_order_statuses_idx` (`status`),
  CONSTRAINT `fk_orders_customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_order_statuses` FOREIGN KEY (`status`) REFERENCES `order_statuses` (`order_status_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_shippers` FOREIGN KEY (`shipper_id`) REFERENCES `shippers` (`shipper_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `quantity_in_stock` int NOT NULL,
  `unit_price` decimal(4,2) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `shippers` (
  `shipper_id` smallint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`shipper_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `temp` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `value` int NOT NULL,
  PRIMARY KEY (`id`)
);


-- ---------------------------------MySQL Triggers--------------------------------

-- --> It is a special type of stored procedure that is invoked automatically in response to an event. 
-- --> Each trigger is associated with a table, which is activated on any DML statement such as INSERT, UPDATE, or DELETE.
-- --> Generally, triggers are of two types according to the SQL standard: row-level triggers and statement-level triggers.
 
DELIMITER //  
Create Trigger before_insert   
BEFORE INSERT ON persons FOR EACH ROW  
BEGIN  
	IF NEW.age = 0 THEN SET NEW.age = 18;  
	END IF;  
END //
delimiter;

DELIMITER //  
Create Trigger before_insert_checkAge   
BEFORE INSERT ON persons FOR EACH ROW  
BEGIN  
	IF NEW.age < 18 THEN SET NEW.age = 18;  
	END IF;  
END //
DELIMITER //  

Create Trigger after_insert_details  
AFTER INSERT ON student FOR EACH ROW  
BEGIN  
	INSERT INTO student_info VALUES (new.stud_id, new.name, new.email);  
END //  

DELIMITER $$
CREATE TRIGGER before_update_orderItems
BEFORE UPDATE  
ON order_items FOR EACH ROW  
BEGIN  
    DECLARE error_msg VARCHAR(255);  
    SET error_msg = ('The new quantity cannot be greater than 2 times the current quantity');  
    IF new.count > old.count * 2 THEN  
    SIGNAL SQLSTATE '45000'   
    SET MESSAGE_TEXT = error_msg;  
    END IF;  
END $$ 
DELIMITER ;  


DELIMITER $$  
CREATE TRIGGER after_update_personInfo  
AFTER UPDATE  
ON PERSONS FOR EACH ROW  
BEGIN  
    INSERT into persons_log VALUES (old.id,   
    CONCAT('Update person Record ', OLD.name, ' Previous Age :',  
    OLD.age, ' Present Age ', NEW.age));  
END $$  
DELIMITER ;


DELIMITER $$  
CREATE TRIGGER before_delete_person  
BEFORE DELETE  
ON persons FOR EACH ROW  
BEGIN  
    INSERT INTO persons_log  
    VALUES(OLD.id, concat('Using before delete: old age-',OLD.age, ' old name-', OLD.name));  
END$$   
DELIMITER ;  

-- haven't used it
DELIMITER $$  
CREATE TRIGGER after_delete_salaries  
AFTER DELETE  
ON salaries FOR EACH ROW  
BEGIN  
   UPDATE total_salary_budget SET total_budget = total_budget - old.amount;  
END$$
DELIMITER ; 
 
SHOW triggers;

DROP trigger after_insert_updateCount;

-- task
select (
case
	when 1=1 then 1
	else 0
end
) abc
group by abc;

-- Triggers Task
CREATE TABLE `sql_store`.`task_employee_name` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `count` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `sql_store`.`task_employee_name_copy` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `count` INT NOT NULL,
  PRIMARY KEY (`id`));

drop trigger before_insert_updateCount;

DELIMITER //  
CREATE PROCEDURE `increse_count` (in p_id int, in p_name varchar(45))
BEGIN
	update task_employee_name set count = count + 1 where name = p_name;

 
DELIMITER //  
Create Trigger before_insert_updateCoun 
BEFORE INSERT ON task_employee_name FOR EACH ROW  
BEGIN  
	call  increse_count(new.id, new.name); 
END // 



