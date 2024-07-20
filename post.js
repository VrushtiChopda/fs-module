const { readPostData, readUserData, writePostData, feildValidations } = require("./commanFunction");

//---------------- create post -----------------------

const postData = readPostData()
const userData = readUserData()
const users = userData.users;
const specifiedFields = ["postId", "userId", "postTitle"]

const createPost = (postDatas) => {
    const validateFields = feildValidations(postDatas, specifiedFields)
    if (validateFields.status === true) {
        const { userId } = postDatas
        const user = users.find(user => user.id === userId)
        if (user) {
            const userId = postDatas.userId
            const pTitle = postDatas.postTitle
            const highestId = postData.posts.reduce((maxId, post) => Math.max(maxId, post.postId), 0);
            let postdetail = { postId: highestId + 1, userId: userId, postTitle: pTitle };
            postData.posts.push(postdetail)
            writePostData(postData)
        }
    } else {
        console.log(validateFields.message)
    }
    // if (!postDatas) {
    //     console.log("please enter details")
    // } else {
    //     if (Object.keys(postDatas).length === 0) {
    //         console.log("enter proper fields")
    //     } else {
    //         if (Object.keys(postDatas).length === specifiedFields) {
    //             console.log("only specified fields working")
    //         } else {
    //             const { userId } = postDatas
    //             const user = users.find(user => user.id === userId)
    //             if (user) {
    //                 const userId = postDatas.userId
    //                 const pTitle = postDatas.postTitle
    //                 const highestId = postData.posts.reduce((maxId, post) => Math.max(maxId, post.postId), 0);
    //                 let postdetail = { postId: highestId + 1, userId: userId, postTitle: pTitle };
    //                 postData.posts.push(postdetail)
    //                 writePostData(postData)
    //             } else {
    //                 console.log("user not found")
    //             }
    //         }
    //     }
    // }
}


//---------------- update post -----------------------

const updatePost = (postDatas) => {
    console.log(postDatas)
    const validateFields = feildValidations(postDatas, specifiedFields)
    if (validateFields.status === true) {
        const pId = postDatas.postId
        const uId = postDatas.userId
        const pTitle = postDatas.postTitle

        const pIdIndex = postData.posts.findIndex(data => data.postId === pId)
        const uIdIndex = postData.posts.findIndex(data => data.userId === uId)
        const pTitleIndex = postData.posts.findIndex(data => data.postTitle === pTitle)

        if (pIdIndex !== -1) {
            if (uIdIndex !== -1) {
                if (pTitleIndex === -1) {
                    postData.posts[pIdIndex].postTitle = pTitle
                    writePostData(postData)
                }
            } else {
                console.log("unauthorize user can't update the post")
            }
        } else {
            console.log("This post is not available")
        }
    } else {
        console.log(validateFields.message)
    }
}

//--------------------- delete posts ---------------------

const deletePost = (postDatas) => {
    console.log(postDatas , "postDatas")
    console.log("object1")
    const specifiedFields1 = ["postId", "userId"]
    console.log("object2")
    const validateFields = feildValidations(postDatas, specifiedFields1)
    console.log("object3")
    if (validateFields.status === true) {
        console.log("object4")

        const pId = postDatas.postId
        const uId = postDatas.userId
        const pIdIndex = postData.posts.findIndex(data => data.postId === pId)
        const uIdIndex = postData.posts.findIndex(data => data.userId === uId)

        if (uIdIndex !== -1) {
            if (pIdIndex !== -1) {
                console.log("object5")

                let deleteIndex = postData.posts.filter((i) => i.id !== pId)
                writePostData({ posts: deleteIndex })
            } else {
                console.log("object6")

                console.log("this post is not exist")
            }
        } else {
            console.log("object7")

            console.log("unauthorize user can't delete the post")
        }
    } else {
        console.log("object8")

        console.log(validateFields.message)
    }
}

module.exports = { createPost, updatePost, deletePost }