CREATE TABLE "users" (
  "id"            INT             PRIMARY KEY     AUTO_INCREMENT,
  "login"         VARCHAR(255)    UNIQUE,
  "password"      VARCHAR(200),
  "create_at"     TIMESTAMP,
  "deleted_at"    TIMESTAMP
);

CREATE TABLE "user_info" (
  "id"            INT             PRIMARY KEY     AUTO_INCREMENT,
  "user_id"       INT,
  "first_name"    VARCHAR(255),
  "last_name"     VARCHAR(255),
  "avatar"        VARCHAR(255)
);

CREATE TABLE "locations" (
  "id"            INT             PRIMARY KEY     AUTO_INCREMENT,
  "name"          VARCHAR(255),
  "description"   VARCHAR(255),
  "poster"        VARCHAR(255),
  "file"          VARCHAR(255),
  "max_users"     INT
);

CREATE TABLE "game_sessions" (
  "id"            INT             PRIMARY KEY     AUTO_INCREMENT,
  "location_id"   INT             NOT NULL,
  "name"          VARCHAR(255),
  "max_users"     INT,
  "create_at"     TIMESTAMP       NOT NULL,
  "deleted_at"    TIMESTAMP,
  "is_active"     boolean
);

CREATE TABLE "roles" (
  "id"            INT             PRIMARY KEY     AUTO_INCREMENT,
  "name"          VARCHAR(255)
);

CREATE TABLE "users_roles" (
  "id"            INT             PRIMARY KEY     AUTO_INCREMENT,
  "user_id"       INT,
  "role_id"       INT
);

CREATE TABLE "user_sessions" (
  "id"            INT             PRIMARY KEY     AUTO_INCREMENT,
  "session_id"    INT,
  "user_id"       INT,
  "create_at"     TIMESTAMP,
  "deleted_at"    TIMESTAMP
);