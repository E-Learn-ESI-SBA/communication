-- Create a keyspace
// CREATE KEYSPACE IF NOT EXISTS communication WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- create posts table 
drop table if exists communication.posts;
drop table if exists communication.comments;
drop table if exists communication.likes;

CREATE TABLE IF NOT EXISTS communication.posts (
    id UUID PRIMARY KEY,
    text TEXT,
    user_id TEXT,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);

CREATE TABLE IF NOT EXISTS communication.comments (
    id UUID PRIMARY KEY,
    post_id UUID,
    user_id TEXT,
    text TEXT,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);

CREATE TABLE IF NOT EXISTS communication.likes (
    id UUID PRIMARY KEY,
    post_id UUID,
    user_id TEXT,
    createdAt TIMESTAMP,
);