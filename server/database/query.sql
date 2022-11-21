

# create table users2(
#     id int primary key not null auto_increment,
#     username varchar(50) not null,
#     email varchar(150),
#     created_at datetime default current_timestamp(),
#     updated_at datetime default current_timestamp()
# )

# create table IF NOT EXISTS posts2(
#     id int primary key not null auto_increment,
#     author_id int,
#     title varchar(500) not null,
#     description longtext,
#     created_at datetime default current_timestamp(),
#     updated_at datetime default current_timestamp(),
#     FOREIGN KEY (author_id) REFERENCES users2(id)
# )

# create table likes(
#     id int primary key not null auto_increment,
#     user_id int,
#     post_id int
# )


# ALTER TABLE `my_db`.`likes`
#     ADD CONSTRAINT `post_id` FOREIGN KEY (`post_id`)
#         REFERENCES `my_db`.`posts` (`id`)
#         ON DELETE RESTRICT
#         ON UPDATE RESTRICT,
#     ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`)
#         REFERENCES `my_db`.`users` (`id`)
#         ON DELETE RESTRICT
#         ON UPDATE RESTRICT;



# alter table likes
#     add created_at datetime default current_timestamp;




CREATE TABLE IF NOT EXISTS `my_db`.`comments` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `post_id` INT NOT NULL,
     `user_id` INT NOT NULL,
     `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
     `parent_id` INT NULL,
     PRIMARY KEY (`id`),
     UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
     INDEX `fk_comments_comments_idx` (`parent_id` ASC) VISIBLE,
     CONSTRAINT `fk_comments_comments`
         FOREIGN KEY (`parent_id`)
             REFERENCES `my_db`.`comments` (`id`)
             ON DELETE NO ACTION
             ON UPDATE NO ACTION,

     INDEX `fk_comments_posts_idx` (`post_id` ASC) VISIBLE,
     CONSTRAINT `fk_comments_posts`
             FOREIGN KEY (`post_id`)
             REFERENCES `my_db`.`posts` (`id`)
             ON DELETE CASCADE
             ON UPDATE CASCADE,

    INDEX `fk_comments_users_id_idx` (`user_id` ASC) VISIBLE,
     CONSTRAINT `fk_comments_users`
         FOREIGN KEY (`user_id`)
             REFERENCES `my_db`.`users` (`id`)
             ON DELETE NO ACTION
             ON UPDATE NO ACTION
 );

# ALTER TABLE `my_db`.`comments`
#     ADD text varchar(500)