const config = {
    app: {
        port: process.env.PORT || 8088,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://admin:abc201199@cluster0.3crqh.mongodb.net/wbchat?retryWrites=true&w=majority"

    },
    jwt: {
		secret: process.env.JWT_SECRET || "wbchat-secret-key",
	},
        
}

module.exports = config;