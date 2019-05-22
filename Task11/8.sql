SELECT Users.USER_NAME, Posts.DESCRIPTION, Posts.CREATION_DATE FROM Users, Posts
WHERE Users.USER_ID = Posts.USER_ID AND Users.USER_ID = 1
ORDER BY Posts.CREATION_DATE;