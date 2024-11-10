/*
  Warnings:

  - The `ApplicationImage` column on the `Applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Applications] DROP COLUMN [ApplicationImage];
ALTER TABLE [dbo].[Applications] ADD [ApplicationImage] VARBINARY(max);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
