const BadRequestError = (error = "參數錯誤", code = 400) => {
    return {
        error,
        code,
    }
}

module.exports = {
    BadRequestError,
}