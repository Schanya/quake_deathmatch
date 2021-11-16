ALTER TABLE user_sessions 
    ADD CONSTRAINT FK_user_sessions_session_id_to_game_sessions_id 
        FOREIGN KEY (session_id) 
            REFERENCES game_sessions (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE;

ALTER TABLE users_sessions 
    ADD CONSTRAINT FK_user_sessions_user_id_to_users_id 
        FOREIGN KEY (user_id) 
            REFERENCES user (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE;

ALTER TABLE users_roles 
    ADD CONSTRAINT FK_users_roles_user_id_to_users_id 
        FOREIGN KEY (user_id) 
            REFERENCES users (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE;

ALTER TABLE users_roles 
    ADD CONSTRAINT FK_users_role_id_to_roles_id 
        FOREIGN KEY (role_id) 
            REFERENCES roles (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE;

ALTER TABLE game_sessions 
    ADD CONSTRAINT FK_game_sessions_location_id_to_locations_id 
        FOREIGN KEY (location_id) 
            REFERENCES locations (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE;

ALTER TABLE users_info 
    ADD CONSTRAINT FK_users_info_user_id_to_user_id 
        FOREIGN KEY (user_id) 
            REFERENCES user (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE;
