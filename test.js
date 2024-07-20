const fs = require('fs')
const path = require('path')

const userFilePath = path.join(__dirname, '../JSON_File/user-detail.json')
const postsFilePath = path.join(__dirname, '../JSON_File/post-detail.json');
const commentFilePath = path.join(__dirname, '../JSON_File/comment-detail.json');
// console.log(commentFilePath);
//---------------------read and write to json-----------------------------
//--------working with user-details.json file ----------------------------
const readUserData = () => {
    const user = fs.readFileSync(userFilePath, 'utf-8')
    if (user) {
        return JSON.parse(user);
    }
    else {
        return { "users": [] }
    }
}

const writeUserData = (userData) => {
    fs.writeFileSync(userFilePath, JSON.stringify(userData), 'utf-8')
}

//--------working with post-details.json file ----------------------------
const readPostData = () => {
    try {
        const postData = fs.readFileSync(postsFilePath, 'utf8');
        return JSON.parse(postData);
    } catch (error) {
        return { posts: [] };
    }
};


const writePostData = (pData) => {
    fs.writeFileSync(postsFilePath, JSON.stringify(pData), 'utf8');
};

//--------working with comment-details.json file -------------------------
const readCommentData = () => {
    try {
        const commentData = fs.readFileSync(commentFilePath, 'utf-8');
        return JSON.parse(commentData)
    } catch (error) {
        return { comments: [] };
    }
};


const writeCommentData = (commentData) => {
    fs.writeFileSync(commentFilePath, JSON.stringify(commentData), 'utf8');
};
module.exports = { readUserData, writeUserData, readPostData, writePostData, readCommentData, writeCommentData };



//------------user----------------------------

const { readUserData, writeUserData, readPostData, writePostData, readCommentData, writeCommentData } = require('./pathModule.js');


const userData = readUserData();
const postData = readPostData();
const commentData = readCommentData();
//--------------------------crud------------------------------------

//-----------add user----------------------
const addNewUser = (userDatas) => {
    const specificFields = ["userName"];
    if (!userDatas) {
        console.log("Enter Details First");
    } else {
        if (Object.keys(userDatas).length === 0) {
            console.log("Enter Details First");
        } else {
            if (Object.keys(userDatas).length !== specificFields.length) {
                console.log("Required fields only handled");
            } else {
                for (let i = 0; i < specificFields.length; i++) {
                    const field = specificFields[i];
                    if (!userDatas.hasOwnProperty(field)) {
                        console.log(`${field} is required`);
                        return;
                    }
                }
                const userName = userDatas.userName;

                let userIndex = userData.users.findIndex((n) => n.uname === userName);
                if (userIndex === -1) {
                    if (!userData.users.length) {
                        let user = { id: 0, uname: userName }
                        userData.users.push(user)
                        console.log("user added");
                        writeUserData(userData)
                    } else {
                        let maxId = Math.max(...userData.users.map((n) => n.id));
                        let newUser = { id: maxId + 1, uname: userName };
                        userData.users.push(newUser);
                        console.log("user added");
                        writeUserData(userData);
                    }
                } else {
                    console.log(`user already added `);
                };

            };
        }
    };
};


const uId = userDatas.uId;
const newName = userDatas.newName;

const userIndex = userData.users.findIndex((u) => u.id === uId);
const newUpdateNameIndex = userData.users.findIndex((u) => u.uname === newName);

if (userIndex !== -1) {
    if (newUpdateNameIndex === -1) {
        userData.users[userIndex].uname = newName;
        writeUserData(userData);
        console.log(`User Updated`);
    } else {
        console.log("This username is already taken");
    }
} else {
    console.log(`User not found.`);
}



// ---------------- deleteById ----------------------

const deleteUserByUserID = (userDatas) => {
    const specificFields = ["uId"];
    if (!userDatas) {
        console.log("add data first");
    } else {
        if (Object.keys(userDatas).length === 0) {
            console.log("Enter Details First");
        } else {
            if (Object.keys(userDatas).length !== specificFields.length) {
                console.log("Required fields only handled");
            } else {
                for (let i = 0; i < specificFields.length; i++) {
                    const field = specificFields[i];
                    if (!userDatas.hasOwnProperty(field)) {
                        console.log(`${field} is required`);
                        return;
                    }
                }
                const uId = userDatas.uId;
                const uIndex = userData.users.findIndex((u) => u.id === uId);
                if (uIndex !== -1) {
                    let delUsers = userData.users.filter((i) => i.id !== uId);
                    writeUserData({ users: delUsers });

                    const deletePostId = [];
                    let filterPostData = postData.posts.filter((post) => {
                        if (post.userId !== uId) {
                            return post
                        } else {
                            deletePostId.push(post.pid)

                        }
                    });
                    writePostData({ posts: filterPostData })

                    const delCmntByTitle = commentData.comments.filter((c) => {
                        if (c.userId !== uId && deletePostId.includes(c.PostId) === false) {
                            return c
                        }
                    });
                    writeCommentData({ comments: delCmntByTitle })
                    console.log('delete the user by user Id');
                } else {
                    console.log(`No User Found With The Given Id`);
                }
            }
        }
    }
}