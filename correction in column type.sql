ALTER TABLE [Applications]
ADD ApplicationImageTemp nvarchar(max);

-- Step 2: Update the new column with converted data from the old column
UPDATE [Applications]
SET [Applications].[ApplicationImageTemp] = CONVERT(nvarchar(max), ApplicationImage);

-- Step 3: Drop the old column
ALTER TABLE [Applications]
DROP COLUMN ApplicationImage;
