const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const FileSchema = new mongoose.Schema({
    length: { type: Number, required: true },
    chunkSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    filename: { type: String, required: true },
    md5: { type: String, required: true },
    contentType: { type: String, required: true },
    metadata: { 
        type: { 
            owner: { type: ObjectId, unique: true }
        }, required: true }
}, { strict: false });

const ChunkSchema = new mongoose.Schema({
    files_id: { type: ObjectId, required: true },
    n: { type: Number, required: true },
    data: { type: Buffer }
}, { strict: false });

mongoose.model("File", FileSchema, "fs.files");
mongoose.model("Chunk", ChunkSchema, "fs.chunks");