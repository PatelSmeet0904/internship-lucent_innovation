# MySQL constraint
CREATE TABLE vehicle (  
    vehicle_no VARCHAR(18) PRIMARY KEY,  
    model_name VARCHAR(45),  
    cost_price DECIMAL(10,2 ) NOT NULL CHECK (cost_price >= 0),  
    sell_price DECIMAL(10,2) NOT NULL CHECK (sell_price >= 0)
    -- CONSTRAINT vehicle_chk_sp_gt_cp CHECK(sell_price > cost_price) 
); 

INSERT INTO vehicle(vehicle_no, model_name, cost_price, sell_price)   
VALUES('S2001', 'Scorpio', 950000, 1000000),  
('M3000', 'Mercedes', 2500000, 3000000);  

INSERT INTO vehicle(vehicle_no, model_name, cost_price, sell_price)   
VALUES('R0001', 'Rolls Royas', 75000000, -85000000);

SHOW CREATE TABLE vehicle;


# Export Database
-- mysqldump -u root -p school_management_system > E:\Internship-Lucent\MySQL(Week-3)\school_database.sql

# Import Database
CREATE DATABASE school_copy;
-- mysql -u root -p school_copy < E:\Internship-Lucent\MySQL(Week-3)\school_database.sql

# Import CSV
CREATE TABLE Address_Book (  
    ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,   
    Name varchar(35) NOT NULL,   
    Email varchar(35),  
    Mobile varchar(15),
    Date date,
    Address varchar(45)  
);  

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/address.csv'   
INTO TABLE address_book   
FIELDS TERMINATED BY ','  
OPTIONALLY ENCLOSED BY '"'  
LINES TERMINATED BY '\r\n'   
IGNORE 1 ROWS;

TRUNCATE TABLE address_book; 

/*
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/address.csv'   
INTO TABLE address_book   
FIELDS TERMINATED BY ','  
OPTIONALLY ENCLOSED BY '"'  
LINES TERMINATED BY '\r\n'   
IGNORE 1 ROWS  
(Mobile,@Date,Address)  
SET Date = STR_TO_DATE(@Date, '%m-%d-%Y');  
*/

SELECT Id, Name, Email, Mobile, Date, Address FROM address_book  
INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/expor_address.csv'     
FIELDS TERMINATED BY ','    
OPTIONALLY ENCLOSED BY '"'    
LINES TERMINATED BY '\r\n';
-- FIELDS ENCLOSED BY '"'   
-- TERMINATED BY ';'   
-- ESCAPED BY '"'; 

TABLE address_book ORDER BY id  
INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/export_address.csv'  
FIELDS ENCLOSED BY '"'   
TERMINATED BY ';'   
ESCAPED BY '"'   
LINES TERMINATED BY '\r\n'; 

SHOW VARIABLES LIKE "secure_file_priv";  

SELECT customer_id, concat(first_name, ' ', last_name) name FROM customers WHERE   
customer_id < ANY (SELECT customer_id FROM Orders);  

SELECT customer_id, concat(first_name, ' ', last_name) name FROM customers WHERE   
customer_id < ALL (SELECT customer_id FROM Orders); 

 SELECT UUID();  

 
 # MySQL LEAD and LAG Function
CREATE TABLE sales_table (  
    Employee_Name VARCHAR(45) NOT NULL,  
    Year INT NOT NULL,  
    Country VARCHAR(45) NOT NULL,  
    Product VARCHAR(45) NOT NULL,  
    Sale DECIMAL(12,2) NOT NULL,  
    PRIMARY KEY(Employee_Name, Year)    
);  

INSERT INTO sales_table VALUES  
('Stephen', 2017, 'India', 'Laptop', 10000),    
('Stephen', 2018, 'India', 'Laptop', 15000),    
('Stephen', 2019, 'India', 'TV', 20000),    
('Bob', 2017, 'US', 'Computer', 15000),    
('Bob', 2018, 'US', 'Computer', 10000),    
('Bob', 2019, 'US', 'TV', 20000),    
('Mandy', 2017, 'Canada', 'Mobile', 20000),    
('Mandy', 2018, 'Canada', 'Calculator', 1500),    
('Mandy', 2019, 'Canada', 'Mobile', 25000); 

SELECT Year, Product, Sale,     
LEAD(Sale,1) OVER (  
PARTITION BY Year  
ORDER BY Country) AS Next_Sale    
FROM sales_table;


CREATE TABLE Employee (  
  emp_id int NOT NULL,  
  name varchar(40) NOT NULL,  
  birthdate date NOT NULL,  
  gender varchar(10) NOT NULL,  
  hire_date date NOT NULL,  
  PRIMARY KEY (emp_id)  
);  

CREATE TABLE Payment (  
  payment_id int PRIMARY KEY NOT NULL,  
  emp_id int NOT NULL,  
  amount float NOT NULL,  
  payment_date date NOT NULL,  
  FOREIGN KEY (emp_id) REFERENCES Employee (emp_id) ON DELETE CASCADE  
); 

ALTER TABLE Payment ADD CONSTRAINT `payment_fk`   
FOREIGN KEY(emp_id) REFERENCES Employee (emp_id) ON UPDATE CASCADE;  


# MySQL UPSERT
-- UPSERT using INSERT IGNORE
-- UPSERT using REPLACE
-- UPSERT using INSERT ON DUPLICATE KEY UPDATE


# MySQL Transaction
/*
Properties of Transaction

Atomicity
Consistency
Isolation
Durability

Atomicity: This property ensures that all statements or operations within the transaction unit must be executed successfully. 
Otherwise, if any operation is failed, the whole transaction will be aborted, and it goes rolled back into their previous state. 

Consistency: This property ensures that the database changes state only when a transaction will be committed successfully. 
It is also responsible for protecting data from crashes. It includes features:

InnoDB doublewrite buffer.
InnoDB crash recovery.

Isolation: This property guarantees that each operation in the transaction unit operated independently. 
It also ensures that statements are transparent to each other.

Durability: This property guarantees that the result of committed transactions persists permanently even 
if the system crashes or failed.

*/

START TRANSACTION;  
COMMIT;  
ROLLBACK;  

SAVEPOINT savepoint_name;  
ROLLBACK TO SAVEPOINT savepoint_name;  
RELEASE SAVEPOINT savepoint_name; 


# PARTITION

CREATE TABLE Sales ( cust_id INT NOT NULL, name VARCHAR(40),   
store_id VARCHAR(20) NOT NULL, bill_no INT NOT NULL,   
bill_date DATE PRIMARY KEY NOT NULL, amount DECIMAL(8,2) NOT NULL) 
PARTITION BY RANGE (year(bill_date))(   
PARTITION p0 VALUES LESS THAN (2016),   
PARTITION p1 VALUES LESS THAN (2017),   
PARTITION p2 VALUES LESS THAN (2018),   
PARTITION p3 VALUES LESS THAN (2020)); 

INSERT INTO Sales VALUES   
(1, 'Mike', 'S001', 101, '2015-01-02', 125.56),   
(2, 'Robert', 'S003', 103, '2015-01-25', 476.50),   
(3, 'Peter', 'S012', 122, '2016-02-15', 335.00),   
(4, 'Joseph', 'S345', 121, '2016-03-26', 787.00),   
(5, 'Harry', 'S234', 132, '2017-04-19', 678.00),   
(6, 'Stephen', 'S743', 111, '2017-05-31', 864.00),   
(7, 'Jacson', 'S234', 115, '2018-06-11', 762.00),   
(8, 'Smith', 'S012', 125, '2019-07-24', 300.00),   
(9, 'Adam', 'S456', 119, '2019-08-02', 492.20);

SELECT TABLE_NAME, PARTITION_NAME, TABLE_ROWS, AVG_ROW_LENGTH, DATA_LENGTH  
FROM INFORMATION_SCHEMA.PARTITIONS  
WHERE TABLE_SCHEMA = 'temp_database' AND TABLE_NAME = 'Sales';  

ALTER TABLE Sales TRUNCATE PARTITION p0; 
Drop TAble Sales;

# MySQL HASH Partitioning
-- In other words, it splits the table as of the value returned by the user-defined expression. 
-- It is mainly used to distribute data evenly into the partition. It is performed with the PARTITION BY HASH(expr) clause. 

CREATE TABLE Stores (   
    cust_name VARCHAR(40),   
    bill_no VARCHAR(20) NOT NULL,   
    store_id INT PRIMARY KEY NOT NULL,   
    bill_date DATE NOT NULL,   
    amount DECIMAL(8,2) NOT NULL  
)  
PARTITION BY HASH(store_id)  
PARTITIONS 4;

CREATE TABLE AgentDetail (   
agent_id VARCHAR(10),  
agent_name VARCHAR(40),   
city VARCHAR(10))   
PARTITION BY LIST COLUMNS(agent_id) (   
PARTITION pNewyork VALUES IN('A1', 'A2', 'A3'),   
PARTITION pTexas VALUES IN('B1', 'B2', 'B3'),   
PARTITION pCalifornia VALUES IN ('C1', 'C2', 'C3'));    

SELECT TABLE_NAME, PARTITION_NAME, TABLE_ROWS, AVG_ROW_LENGTH, DATA_LENGTH  
FROM INFORMATION_SCHEMA.PARTITIONS  
WHERE TABLE_SCHEMA = 'temp_database' AND TABLE_NAME = 'AgentDetail';

SELECT *,   
    ROW_NUMBER() OVER(PARTITION BY Year) AS row_num  
FROM sales_table;

SELECT FORMAT(13600.2021, 2);
 
/*
Types of Window Function
We can categorize the window functions mainly in three types that are given below:

Aggregate Functions
It is a function that operates on multiple rows and produces the result in a single row. Some of the important aggregate functions are:

COUNT, SUM, AVG, MIN, MAX, and many more.

Ranking Functions
It is a function that allows us to rank each row of a partition in a given table. Some of the important ranking functions are:

RANK, DENSE_RANK, PERCENT_RANK, ROW_NUMBER, CUME_DIST, etc.

Analytical Functions
It is a function, which is locally represented by a power series. Some of the important analytical functions are:

NTILE, LEAD, LAG, NTH, FIRST_VALUE, LAST_VALUE, etc.
*/

CREATE TABLE myset_test (  
  Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,   
  Myset_col SET('Java', 'Python', 'Android', 'PHP')  
);
INSERT INTO myset_test(Myset_col) VALUES ('Java,PHP'), ('PHP,Java'),   
('Java,PHP,Java'), ('Java,PHP,PHP'), ('PHP,Java,PHP');  

SELECT CAST(3-6 AS SIGNED);

SELECT CONVERT("2018-11-30", DATETIME); 
SELECT CONCAT('CONVERT Function Example ## ',CONVERT(5, CHAR));  
 
SELECT COALESCE(NULL, NULL, 'javatpoint', NULL);   

SELECT CURDATE() AS Today; 
SELECT DATE(NOW()) AS Today;

DELIMITER $$
CREATE PROCEDURE list_name (INOUT name_list varchar (4000) )
		BEGIN
		DECLARE is_done INTEGER DEFAULT 0;
       DECLARE s_name varchar (100) DEFAULT "";
       DECLARE stud_cursor CURSOR FOR
        SELECT name FROM table1;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET is_done = 1;
		OPEN stud_cursor;
        get_list: LOOP
        FETCH stud_cursor INTO s_name;
        IF is_done = 1 THEN
        LEAVE get_list;
        END IF;
        SET name_list = CONCAT (s_name, ";",name_list);
        END LOOP get_list;
        CLOSE stud_cursor;
        END$$
        
DELIMITER $$   
CREATE FUNCTION get_designation_name(emp_id INT) RETURNS VARCHAR( 20 )   
BEGIN   
DECLARE de_name VARCHAR( 20 ) DEFAULT "";  
SELECT name INTO de_name FROM employee WHERE emp_id = emp_id;  
RETURN de_name;  
END $$  

DELIMITER &&  
CREATE PROCEDURE get_merit_student ()  
BEGIN  
    SELECT * FROM student WHERE marks > 70;  
    SELECT COUNT(sid) AS Total_Student FROM student_info;    
END &&  
DELIMITER ; 
CALL get_merit_student();


DELIMITER &&
CREATE PROCEDURE display_max_mark (OUT highestmark INT)  
BEGIN  
    SELECT MAX(marks) INTO highestmark FROM student_info;   
END &&  
DELIMITER ;  
CALL display_max_mark(@M);  
SELECT @M;   
  

# Nth highest salary
SELECT name, salary FROM Employee AS emp1   
WHERE N-1 = (SELECT COUNT(DISTINCT salary) FROM Employee AS emp2   
WHERE emp2.salary > emp1.salary);


SELECT EXTRACT(DAY_HOUR FROM '2020-07-15 08:06:44') AS DAY;

SHOW PROCESSLIST; 

 SELECT '2020-02-01' + INTERVAL -5 DAY AS DATE;
 SELECT DATE_ADD('2020-02-01', INTERVAL 3 MONTH) AS MONTH_LATER,   
DATE_SUB('2020-02-01',INTERVAL 3 MONTH) AS MONTH_BEFORE; 

# Regular Expression

SELECT * FROM student WHERE full_name REGEXP '^[ab]'; -- search for students whose name start with "A or B"

SHOW VARIABLES LIKE 'have_query_cache';
SHOW VARIABLES LIKE 'query_cache_size';

