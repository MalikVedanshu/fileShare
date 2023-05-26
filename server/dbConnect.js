const mongoose = require("mongoose");
async function dbConnect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/fileupload");
        console.log("Server connected successfully");
    }
    catch (error) {
        console.log(error)
    }
}
dbConnect();
