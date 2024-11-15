/*
  Warnings:

  - You are about to alter the column `ApplicationImage` on the `Applications` table. The data in that column could be lost. The data in that column will be cast from `VarBinary(Max)` to `NVarChar(1000)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Applications] ALTER COLUMN [ApplicationImage] NVARCHAR(1000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
