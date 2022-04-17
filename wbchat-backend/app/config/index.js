const config = {
    app: {
        port: process.env.PORT || 8088,
    },
    db: 
    {
        uri: process.env.MONGODB_URI || "mongodb+srv://admin:abc201199@cluster0.3crqh.mongodb.net/wbchat?retryWrites=true&w=majority"

    }
        
}

module.exports = config;