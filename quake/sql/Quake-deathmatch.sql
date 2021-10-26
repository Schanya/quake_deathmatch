CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "login" varchar(255),
  "password" varchar(200),
  "create_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "locations" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255),
  "description" varchar(255),
  "poster" varchar(255),
  "file" varchar(max),
  "max_users" int
);

CREATE TABLE "game_sessions" (
  "id" SERIAL PRIMARY KEY,
  "location_id" int NOT NULL,
  "name" varchar(255),
  "max_users" int,
  "create_at" timestamp NOT NULL,
  "deleted_at" timestamp,
  "is_active" boolean
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" nvarchar(255)
);

CREATE TABLE "users_roles" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "role_id" int
);

CREATE TABLE "user_sessions" (
  "id" SERIAL PRIMARY KEY ,
  "session_id" int,
  "user_id" int,
  "create_at" timestamp,
  "end_date" timestamp
);