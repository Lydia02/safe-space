const connectToDB = require('./db')
require('dotenv').config()
const app = require('./index')
const PORT = 3440;
const MONGO_URI = process.env.MONGO_URI


//connectToDB
connectToDB(MONGO_URI)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
