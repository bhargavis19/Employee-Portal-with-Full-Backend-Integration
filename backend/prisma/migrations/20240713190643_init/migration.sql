BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Applications] (
    [ApplicationID] VARCHAR(20) NOT NULL,
    [ApplicationName] VARCHAR(255),
    [CategoryName] VARCHAR(255),
    [CategoryID] VARCHAR(20),
    [ApplicationURL] VARCHAR(255),
    [ApplicationDescription] VARCHAR(80),
    [ApplicationImage] VARBINARY(max),
    [ApplicationOwner] VARCHAR(255),
    [ApplicationOwnerPrimaryEmail] VARCHAR(80),
    [ApplicationOwnerSecondaryEmail] VARCHAR(80),
    CONSTRAINT [PK__Applicat__C93A4F79C826D3D8] PRIMARY KEY CLUSTERED ([ApplicationID])
);

-- CreateTable
CREATE TABLE [dbo].[CategoryMaster] (
    [CategoryID] VARCHAR(20) NOT NULL,
    [CategoryName] VARCHAR(255),
    [CategoryOrder] INT,
    CONSTRAINT [PK__Category__19093A2B8E7460B3] PRIMARY KEY CLUSTERED ([CategoryID])
);

-- CreateTable
CREATE TABLE [dbo].[EmployeeAccessRequests] (
    [EmployeeID] VARCHAR(20) NOT NULL,
    [ApplicationName] VARCHAR(255),
    [EmailAddress] VARCHAR(80),
    [Messages] VARCHAR(80),
    [AccessRequestTime] DATETIME,
    [AssignDate] DATE,
    [Status] VARCHAR(10),
    CONSTRAINT [PK__Employee__7AD04FF1D12EECD4] PRIMARY KEY CLUSTERED ([EmployeeID])
);

-- CreateTable
CREATE TABLE [dbo].[Favorites] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [EmployeeID] VARCHAR(20),
    [ApplicationID] VARCHAR(20),
    CONSTRAINT [PK__Favorite__3214EC270817B107] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[holidays] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [HolidayDate] DATE,
    [HolidayEvent] VARCHAR(30),
    CONSTRAINT [PK__holidays__3214EC27EFA8A61E] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[HRUpdates] (
    [UpdateID] INT NOT NULL IDENTITY(1,1),
    [HRUpdate] VARCHAR(200),
    [TimeOfUpdate] DATETIME,
    [Category] VARCHAR(30),
    [UpdateStatus] VARCHAR(10),
    [Title] VARCHAR(10),
    CONSTRAINT [PK__HRUpdate__7A0CF3259F114986] PRIMARY KEY CLUSTERED ([UpdateID])
);

-- CreateTable
CREATE TABLE [dbo].[ImportantContacts] (
    [EmployeeID] VARCHAR(20) NOT NULL,
    [EmployeeName] VARCHAR(255),
    [Department] VARCHAR(30),
    [PhoneNumber] INT,
    [EmailAddress] VARCHAR(80),
    CONSTRAINT [PK__Importan__7AD04FF192185899] PRIMARY KEY CLUSTERED ([EmployeeID])
);

-- CreateTable
CREATE TABLE [dbo].[Support] (
    [TeamID] VARCHAR(20) NOT NULL,
    [TeamName] VARCHAR(255),
    [TeamPhoneNumber] INT,
    [TeamDept] VARCHAR(255),
    [EmailAddress] VARCHAR(80),
    CONSTRAINT [PK__Support__123AE7B9F8132095] PRIMARY KEY CLUSTERED ([TeamID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Applications] ADD CONSTRAINT [FK__Applicati__Categ__403A8C7D] FOREIGN KEY ([CategoryID]) REFERENCES [dbo].[CategoryMaster]([CategoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Favorites] ADD CONSTRAINT [FK__Favorites__Appli__5165187F] FOREIGN KEY ([ApplicationID]) REFERENCES [dbo].[ImportantContacts]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Favorites] ADD CONSTRAINT [FK__Favorites__Emplo__5070F446] FOREIGN KEY ([EmployeeID]) REFERENCES [dbo].[Applications]([ApplicationID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
