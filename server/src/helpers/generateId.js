// create ID
module.exports = (length) => require("crypto").randomBytes(16).toString("hex").substr(0, length);