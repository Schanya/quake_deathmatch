ALTER TABLE "game_sessions" 
ADD CONSTRAINT "FK_game_sessions_to_user_sessions" FOREIGN KEY ("session_id") 
REFERENCES "user_sessions" ("id")
ON DELETE RESTRICT
ON UPDATE RESTRICT

ALTER TABLE "users" 
ADD CONSTRAINT "FK_user_to_user_sessions" FOREIGN KEY ("id") 
REFERENCES "user_sessions" ("user_id")
ON DELETE RESTRICT
ON UPDATE RESTRICT

ALTER TABLE "users" 
ADD CONSTRAINT "FK_users_to_users_roles" FOREIGN KEY ("id") 
REFERENCES "users_roles" ("user_id")
ON DELETE RESTRICT
ON UPDATE RESTRICT

ALTER TABLE "roles" 
ADD CONSTRAINT "FK_roles_to users_roles" FOREIGN KEY ("id") 
REFERENCES "users_roles" ("role_id")
ON DELETE RESTRICT
ON UPDATE RESTRICT

ALTER TABLE "locations" 
ADD CONSTRAINT "FK_locations_game_sessions" FOREIGN KEY ("id") 
REFERENCES "game_sessions" ("location_id")
ON DELETE RESTRICT
ON UPDATE RESTRICT
