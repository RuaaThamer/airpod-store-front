-- 1. Create a restricted "worker" account specifically for the backend API (AppUser)
CREATE USER AppUser WITH PASSWORD = 'CST8912!';

-- 2. Grant it only read (SELECT) and write (INSERT/UPDATE) permissions
ALTER ROLE db_datareader ADD MEMBER AppUser;
ALTER ROLE db_datawriter ADD MEMBER AppUser;