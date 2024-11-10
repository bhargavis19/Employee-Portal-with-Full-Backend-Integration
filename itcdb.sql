CREATE DATABASE DB;

USE DB;

CREATE TABLE HRUpdates (
    UpdateID INT IDENTITY(1,1) PRIMARY KEY,
    HRUpdate VARCHAR(200) NOT NULL,
    TimeOfUpdate DATETIME DEFAULT GETDATE() NOT NULL,
    Category VARCHAR(30),
    UpdateStatus VARCHAR(10) CHECK (UpdateStatus IN ('Active', 'Inactive')) NOT NULL,
    Title VARCHAR(50)
);

CREATE PROCEDURE GetLatestHRUpdates
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM HRUpdates
    ORDER BY TimeOfUpdate DESC;
END;
EXEC GetLatestHRUpdates


CREATE TABLE holidays (
    ID INT IDENTITY(1,1) PRIMARY KEY,
	HolidayDate DATE not null,
    HolidayEvent VARCHAR(30) not null
)

SELECT*FROM holidays

CREATE PROCEDURE GetHolidaysByDateRange
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM holidays
    WHERE HolidayDate BETWEEN '2024-01-01' AND '2024-12-31';
END;

EXEC GetHolidaysByDateRange;


CREATE TABLE Support (
    TeamID VARCHAR(20) PRIMARY KEY,
    TeamName VARCHAR(255)not null,
    TeamPhoneNumber INT CHECK (TeamPhoneNumber BETWEEN 000 AND 999)not null,
    TeamDept VARCHAR(255)not null,
    EmailAddress VARCHAR(80)
);


CREATE TABLE CategoryMaster (
    CategoryID VARCHAR(20) PRIMARY KEY,
    CategoryName VARCHAR(255) not null,
    CategoryOrder int not null unique
);

CREATE PROCEDURE GetCategoriesOrdered
AS
BEGIN
  SELECT *
  FROM CategoryMaster
  ORDER BY CategoryOrder ASC;
END;
EXEC GetCategoriesOrdered


CREATE TABLE Applications (
    ApplicationID VARCHAR(20) PRIMARY KEY,
    ApplicationName VARCHAR(255)not null,
    CategoryName VARCHAR(255)not null,
    CategoryID VARCHAR(20) FOREIGN KEY REFERENCES CategoryMaster(CategoryID)not null,
    ApplicationURL VARCHAR(255),
    ApplicationDescription VARCHAR(80),
    ApplicationImage VARCHAR(1000), 
    ApplicationOwner VARCHAR(255),
    ApplicationOwnerPrimaryEmail VARCHAR(80),
    ApplicationOwnerSecondaryEmail VARCHAR(80)
);

CREATE TABLE Favorites (
    ID INT IDENTITY(1,1) PRIMARY KEY,
	EmployeeID VARCHAR(20) FOREIGN KEY REFERENCES Applications(ApplicationID) not null,
    ApplicationID VARCHAR(20)FOREIGN KEY REFERENCES ImportantContacts(EmployeeID),
);

CREATE TABLE ImportantContacts (
    EmployeeID VARCHAR(20) PRIMARY KEY,
    EmployeeName VARCHAR(255) not null,
    Department VARCHAR(30) not null,
    PhoneNumber INT CHECK (PhoneNumber BETWEEN 000 AND 999)not null,
    EmailAddress VARCHAR(80),
);

CREATE TABLE EmployeeAccessRequests (
    EmployeeID VARCHAR(20) PRIMARY KEY,
    ApplicationName VARCHAR(255) not null,
    EmailAddress VARCHAR(80) not null,
    Messages VARCHAR(80),
    AccessRequestTime DATETIME not null,
    AssignDate DATE not null,
    Status VARCHAR(10)not null,CHECK (Status IN ('accepted', 'rejected')) 
);

CREATE TABLE holidays (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    HolidayDate DATE NOT NULL,
    HolidayEvent VARCHAR(30) NOT NULL
);

select * from HRUpdates

INSERT INTO ImportantContacts (EmployeeID, EmployeeName, Department, PhoneNumber, EmailAddress) 
VALUES 
('E001', 'John Doe', 'HR', 123, 'john.doe@example.com');
select * from ImportantContacts
INSERT INTO Support (TeamID, TeamName, TeamPhoneNumber, TeamDept, EmailAddress) 
VALUES 
('T001', 'Support Team Alpha', 123, 'Technical Support', 'alpha.support@example.com');
select * from Support
INSERT INTO holidays (HolidayDate, HolidayEvent) 
VALUES 
('2024-07-29', 'Test day');
select * from holidays