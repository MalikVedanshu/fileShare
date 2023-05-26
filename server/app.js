const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const Uploadmodel = require("./uploadmodal.js");
const passwordGenerator = require("./stringGenerator.js");

require("./dbConnect.js");

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    console.log(file),
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({
  storage: storage,
})

app.post('/uploadfiles', upload.single('mediafile'),  async (req, res, next) => {
  
  try {

    let folderName = req.body.folderName;
    if(folderName.length < 1) folderName = passwordGenerator();
    let existingCollection = await Uploadmodel.findOne({ folderName: folderName });
    if (!existingCollection) {
      existingCollection = new Uploadmodel({ folderName: folderName });
    }
    existingCollection.paths.push(req.file.path);
    await existingCollection.save();
    res.status(200).json({ msg: "File successully uploaded" });
  }
  catch (error) {
    res.status(500).json("Internal server error.");
  }
})

app.get("/getallfolders", async (req,res) => {
  try {
    let allFolders = await Uploadmodel.find({});
    return res.status(200).json({data: allFolders});
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"})
  }
})

app.post('/getAllFiles/', async (req, res) => {
  try {
    let folderId = req.body.folderId;
    
    let existingCollection = await Uploadmodel.findById(folderId);
    if (!existingCollection) return res.status(400).json({ msg: [] });

    return res.status(200).json({ data: existingCollection.paths });

  } catch (error) {
    res.status(500).json("Internal server error.");
  }

})

app.post("/getafile", async (req,res) => {
  try {
    console.log(req.body);
    res.download(`./${req.body.filename}`);
  }
  catch(error) {
    return res.status(200).json({error: "Internal server error."})
  }
})


app.listen(5000, () => {
  console.log("App is listening to port 5000");
})
