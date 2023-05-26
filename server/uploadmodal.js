const mongoose = require("mongoose");

const Schema = new mongoose.Schema({

    folderName: {
        type: String,
        unique: true
    },
    paths: {
        type: Array,
        default: []
    }
})

const Model = mongoose.model("uploads", Schema);

module.exports = Model;