const users = [];

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.replace(/\s+/g, '').toLowerCase() //replace(/\s+/g, '') replaces space inbetween strings in javascript but text.split(' ').join('') is way faster when analysing big words also replace(/^\s+|\s+$/g, ""); This line removes all white-space characters at the beginning (^) and end ($). The g at the end of the RegExp means: global, ie match and replace all occurences.
    room = room.trim().toLowerCase()

    // Validate data
    if (!username || !room) {
        return {
            error: 'username and room required'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.toLowerCase().split(' ').join('') // .split(' ').join('') replaces space inbetween strings in javascript
    console.log('got here', room)
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser, removeUser, getUser, getUsersInRoom
}