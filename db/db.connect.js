const mongoose = require('mongoose')

require('dotenv').config()

const mongooseURI = process.env.MONGODB

async function initializeData(){

    try {

        await mongoose.connect(mongooseURI)
                            .then(() => {

                                console.log('Database connected')
                            })
                            .catch((error) => {

                                console.log('Failed to connect database', error)
                            })
        
    } catch (error) {

        console.log('Failed to connect database', error)
        
    }

}

module.exports = {initializeData}