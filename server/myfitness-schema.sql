
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);


CREATE TABLE foodjournal (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
 meal_id INTEGER, 
 created_at timestamp DEFAULT now(),
 meal_name TEXT NOT NULL,
 calories INTEGER,
 img VARCHAR
)