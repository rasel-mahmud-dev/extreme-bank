const dbConnect = require("./dbConnect");

async function initialQuery(){
  
  const db = await dbConnect()
  
  let createdPostTable = `
  create table IF NOT EXISTS posts(
      id int primary key not null auto_increment,
      author_id int,
      title varchar(500) not null,
      description longtext,
      created_at datetime default current_timestamp(),
      updated_at datetime default current_timestamp(),
      FOREIGN KEY (author_id) REFERENCES users(id)
  )
  `
  let doc = await db.query(createdPostTable)
  
}

module.exports = initialQuery


