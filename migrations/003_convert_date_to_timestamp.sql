-- Convert all date columns to timestamp to preserve time information
-- This migration safely converts existing date data to timestamp without data loss

-- Users table
ALTER TABLE users 
ALTER COLUMN created TYPE timestamp USING created::timestamp;

-- Apps table  
ALTER TABLE apps 
ALTER COLUMN created TYPE timestamp USING created::timestamp,
ALTER COLUMN modified TYPE timestamp USING modified::timestamp;

-- Registrations table
ALTER TABLE registrations 
ALTER COLUMN created TYPE timestamp USING created::timestamp;

-- Contexts table
ALTER TABLE contexts 
ALTER COLUMN created TYPE timestamp USING created::timestamp;

-- People table
ALTER TABLE people 
ALTER COLUMN created TYPE timestamp USING created::timestamp;

-- Launches table
ALTER TABLE launches 
ALTER COLUMN created TYPE timestamp USING launches.created::timestamp;

-- Enrollments table
ALTER TABLE enrollments 
ALTER COLUMN created TYPE timestamp USING created::timestamp;

-- Jwks table
ALTER TABLE jwks 
ALTER COLUMN created TYPE timestamp USING created::timestamp;
