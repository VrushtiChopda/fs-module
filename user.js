//---------------- create user -----------------

const { readUserData, writeUserData, feildValidations } = require("./commanFunction");

const userData = readUserData();
// console.log(userData, "userData")

const addNewUser = (userDatas) => {
    const specifiedFields = ["postId", "userId", "postTitle"]
    const validateFields = feildValidations(userDatas, specifiedFields)
    if (validateFields.status === true) {
        const highestId = userData.users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
        let userName = { id: highestId + 1, name: userInfo };
        userData.users.push(userName)
        writeUserData(userData)
    } else {
        console.log(validateFields.message)
    }
    // if (!userInfo) {
    //     console.log("enter Details first")
    // } else {
    //     const highestId = userData.users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
    //     let userName = { id: highestId + 1, name: userInfo };
    //     userData.users.push(userName)
    //     writeUserData(userData)
    // }
}



//---------------- update user -------------------

const updateUser = (uData) => {
    console.log(uData, "uData")
    let updatedUser = userData
    console.log(updatedUser, "before update")
    if (!uData) {
        console.log("please enter data for update")
    } else {
        uId = uData.id
        uName = uData.name

        const userIdIndex = userData.users.findIndex((data) => data.id === uId)
        const userNameIndex = userData.users.findIndex((data) => data.name === uName)

        if (userIdIndex !== -1) {
            if (userNameIndex === -1) {
                userData.users[userIdIndex].name = uName;
                console.log(userData, "after update")
                writeUserData(userData)
            } else {
                console.log("this user is already exist")
            }
        } else {
            console.log("user not find")
        }
    }
}

//----------------- delete  user ---------------------------

const deleteUsers = () => {
    writeUserData({ users: [] })
}

//---------------- delete user by id ------------------------

const DeleteUserById = (userId) => {
    const uId = userId.id
    console.log(uId, "uId")
    const uIndex = userData.users.findIndex((u) => u.id === uId)
    if (uIndex !== -1) {
        let deleteIndex = userData.users.filter((i) => i.id !== uId)
        writeUserData({ users: deleteIndex })
    }
}
module.exports = { addNewUser, updateUser, deleteUsers, DeleteUserById }