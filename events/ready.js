module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setPresence({
        activity: {
            name: '$man',
            type: 'PLAYING'
        },
    });
}
