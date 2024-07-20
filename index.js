const { readUserData, readPostData, readCommentData } = require("./commanFunction");
const { createPost, updatePost, deletePost } = require("./post");
const { addNewUser, updateUser, deleteUsers, DeleteUserById } = require("./user");

readUserData();
readPostData();
readCommentData();

//-------------------- User ------------------------

// addNewUser("vrushti")
// addNewUser("astha")
// addNewUser("vrutika")
// addNewUser("abhay")

// updateUser({ "id": 1, "name": "vru" })

// deleteUsers();
// DeleteUserById({ id: 3 });

//------------------- posts -------------------------

// createPost({ userId: 3, postTitle: "it's first post" });
// createPost({ userId: 1, postTitle: "it's second post" });
// createPost({userid: 1, postTitles: "it's second post"});
// createPost({ userId: 3, postTitle: "it's second post" });

// updatePost({ postId: 3, userId: 10, postTitle: "it is third post" })

deletePost({ userId: 3, postId: 1 ,post : "dcdddddddddd"})