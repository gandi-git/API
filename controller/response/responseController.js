const response = (statusCode, data, message, res ) =>{
    res.status(statusCode).json ({
        status: {
            statusCode: statusCode,
            message : message
        },
        data: data
    })
}

module.exports = response