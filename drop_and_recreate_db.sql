-- Drop the existing database and recreate with nueva base de datos.sql

USE master;
GO

-- Close all connections to the database
ALTER DATABASE [solmeddboblyperinatal] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- Drop the database
DROP DATABASE IF EXISTS [solmeddboblyperinatal];
GO

PRINT 'Database dropped successfully. Now run: nueva base de datos.sql';
GO
