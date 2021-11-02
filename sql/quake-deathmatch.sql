CREATE TABLE "users" (
  "id"            int             PRIMARY KEY     AUTO_INCREMENT,
  "login"         varchar(255)    UNIQUE,
  "password"      varchar(200),
  "create_at"     timestamp,
  "deleted_at"    timestamp
);

CREATE TABLE "user_info" (
  "id"            int             PRIMARY KEY     AUTO_INCREMENT,
  "user_id"       int,
  "first_name"    varchar(255),
  "last_name"     varchar(255),
  "avatar"        varchar(255)
);

CREATE TABLE "locations" (
  "id"            int             PRIMARY KEY     AUTO_INCREMENT,
  "name"          varchar(255),
  "description"   varchar(255),
  "poster"        varchar(255),
  "file"          varchar(max),
  "max_users"     int
);

CREATE TABLE "game_sessions" (
  "id"            int             PRIMARY KEY     AUTO_INCREMENT,
  "location_id"   int             NOT NULL,
  "name"          varchar(255),
  "max_users"     int,
  "create_at"     timestamp       NOT NULL,
  "deleted_at"    timestamp,
  "is_active"     boolean
);

CREATE TABLE "roles" (
  "id"            int             PRIMARY KEY     AUTO_INCREMENT,
  "name"          varchar(255)
);

CREATE TABLE "users_roles" (
  "id"            int             PRIMARY KEY     AUTO_INCREMENT,
  "user_id"       int,
  "role_id"       int
);

CREATE TABLE "user_sessions" (
  "id"            int             PRIMARY KEY     AUTO_INCREMENT,
  "session_id"    int,
  "user_id"       int,
  "create_at"     timestamp,
  "deleted_at"    timestamp
);