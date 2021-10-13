const {
    random
} = require("../main")

const randomIP = () => `${~~random(100, 999)}.${~~random(10, 99)}.${~~random(100, 999)}.${~~random(100, 999)}`

module.exports = {
    randomIP,
}