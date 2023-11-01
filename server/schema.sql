DROP DATABASE Youtube;

CREATE DATABASE IF NOT EXISTS Youtube;

USE Youtube;

-- Table Creation

-- DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
    id INT Auto_Increment Primary Key,
    username VARCHAR(200),
    email VARCHAR(200) UNIQUE,
    password VARCHAR(255),
    user_pic_url VARCHAR(255),
    created_at TIMESTAMP Default now(),
    updated_at TIMESTAMP Default now(),
    registration_type VARCHAR(255)
);

-- DROP TABLE IF EXISTS Channel;
CREATE TABLE Channel(
    id INT Auto_Increment Primary Key,
    channel_name VARCHAR(255),
    owner_id INT NOT NULL,
    description VARCHAR(255),
    channel_pic_url VARCHAR(255),
    FOREIGN KEY(owner_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS Subscription;
CREATE TABLE Subscription(
    id INT Auto_Increment Primary Key,
    subscriber_id INT NOT NULL,
    channel_id INT NOT NULL,
    subscribed_at TIMESTAMP Default now(),
    FOREIGN KEY(subscriber_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY(channel_id) REFERENCES Channel(id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS Videos;
CREATE TABLE Videos(
    id INT Auto_Increment Primary Key,
    uploader_id INT NOT NULL,
    channel_id INT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    upload_date TIMESTAMP Default now(),
    video_url VARCHAR(255),
    thumbnail_url VARCHAR(255),
    views INT,
    duration VARCHAR(255),
    FOREIGN KEY(uploader_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY(channel_id) REFERENCES Channel(id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments(
    id INT Auto_Increment Primary Key,
    user_id INT NOT NULL,
    video_id INT NOT NULL,
    parent_comment_id INT,
    content VARCHAR(255),
    comment_date TIMESTAMP Default now(),
    FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY(video_id) REFERENCES Videos(id) ON DELETE CASCADE,
    FOREIGN KEY(parent_comment_id) REFERENCES Comments(id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS Likes;
CREATE TABLE Likes(
    id INT Auto_Increment Primary Key,
    user_id INT NOT NULL,
    video_id INT NOT NULL,
    is_like BOOLEAN,
    like_date TIMESTAMP Default now(),
    FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY(video_id) REFERENCES Videos(id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS Tags;
CREATE TABLE Tags(
    id INT Auto_Increment Primary Key,
    video_id INT NOT NULL,
    tag_name VARCHAR(255),
    FOREIGN KEY(video_id) REFERENCES Videos(id) ON DELETE CASCADE
);