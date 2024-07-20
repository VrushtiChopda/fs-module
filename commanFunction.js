const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, 'data', 'users.json');
const postFilePath = path.join(__dirname, "data", "posts.json")
const commentFilePath = path.join(__dirname, "data", "comments.json")

// Ensure the data directory exists
const ensureDataDirectoryExists = (filePath) => {
    const dataDir = path.dirname(filePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
};

//------------------------------ validations ------------------------------
const feildValidations = (datas, specifiedFields) => {
    console.log(specifiedFields, "-------------------")
    console.log("object====================1")

    if (!datas) {
        console.log("object====================2")

        return {
            status: false,
            message: "please enter details First"
        }
    } else {
        if (Object.keys(datas).length === 0) {
            console.log("object====================3")

            return {
                status: false,
                message: "fill all required fields"
            }
        } else {
            if (Object.keys(datas).length === specifiedFields) {
                console.log("object====================4")
                return {
                    status: false,
                    message: "only specified fields working"
                }
            } else {
                console.log("object====================5")

                for (let i = 0; i < specifiedFields.length; i++) {
                    console.log("object====================n")

                    const field = specifiedFields[i];
                    if (!datas.hasOwnProperty(field)) {
                        return {
                            status: false,
                            message: `${field} is required`
                        }
                    }
                }
                return {
                    status: true,
                    message: "done"
                }
            }
        }
    }
}

// ------------------------------User Read & Write Function ------------------------
// Read user data from the file
const readUserData = () => {
    ensureDataDirectoryExists(userFilePath);
    if (fs.existsSync(userFilePath)) {
        const user = fs.readFileSync(userFilePath, 'utf-8');
        if (user) {
            return JSON.parse(user);
        }
    }
    const userData = { "users": [] };
    writeUserData(userData);
    return userData;
};

// Write user data to the file
const writeUserData = (userData) => {
    ensureDataDirectoryExists(userFilePath);
    fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2), 'utf-8');
};

// ------------------------------Post Read & Write Function ------------------------

const readPostData = () => {
    ensureDataDirectoryExists(postFilePath);
    if (fs.existsSync(postFilePath)) {
        const post = fs.readFileSync(postFilePath, 'utf-8')
        if (post) {
            return JSON.parse(post)
        }
    }
    const postData = { "posts": [] }
    writePostData(postData)
    return postData;

}

const writePostData = (postData) => {
    ensureDataDirectoryExists(postFilePath);
    fs.writeFileSync(postFilePath, JSON.stringify(postData), 'utf-8')
}

// ------------------------------Comment Read & Write Function ------------------------

const readCommentData = () => {
    ensureDataDirectoryExists(commentFilePath);
    if (fs.existsSync(commentFilePath)) {
        const comment = fs.readFileSync(commentFilePath, 'utf-8')
        if (comment) {
            return JSON.parse(comment)
        }
    }
    const commentData = { "comments": [] }
    writeCommentData(commentData)
    return commentData;

}

const writeCommentData = (commentData) => {
    ensureDataDirectoryExists(commentFilePath);
    fs.writeFileSync(commentFilePath, JSON.stringify(commentData), 'utf-8')
}

module.exports = { feildValidations, readUserData, writeUserData, readPostData, writePostData, writeCommentData, readCommentData };