const mongoose = require("mongoose");

let Status = mongoose.model("status", {
    orderID: String,
    status: String
})

module.exports = {
    Status
}