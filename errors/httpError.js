const BadRequestError = (error = "參數錯誤") => {
    return {
        error,
        code: 400,
    }
}

module.exports = {
    BadRequestError,
}