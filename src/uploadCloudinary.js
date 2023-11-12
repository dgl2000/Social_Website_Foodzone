const multer = require('multer')
const stream = require('stream')
const cloudinary = require('cloudinary')
cloudinary.config({
    CLOUDINARY_URL: 'cloudinary://729688451187234:MdTVx8Q-AI5RKMiR4ihTwviY0wM@hevjiekwx',
    cloud_name: "hevjiekwx",
    api_key: "729688451187234",
    api_secret: "MdTVx8Q-AI5RKMiR4ihTwviY0wM",
    secure: true
});

const doUpload = (publicId, req, res, next) => {

    const uploadStream = cloudinary.uploader.upload_stream(result => {
        // capture the url and public_id and add to the request
        req.fileurl = result.url
        req.fileid = result.public_id
        next()
    }, { public_id: req.body[publicId] })

    // multer can save the file locally if we want
    // instead of saving locally, we keep the file in memory
    // multer provides req.file and within that is the byte buffer

    // we create a passthrough stream to pipe the buffer
    // to the uploadStream function for cloudinary.
    const s = new stream.PassThrough()
    s.end(req.file?.buffer)
    s.pipe(uploadStream)
    s.on('end', uploadStream.end)
    // and the end of the buffer we tell cloudinary to end the upload.
}

// multer parses multipart form data.  Here we tell
// it to expect a single file upload named 'image'
// Read this function carefully so you understand
// what it is doing!
const uploadImage = (publicId) => (req, res, next) =>
    multer().single('image')(req, res, () =>
        doUpload(publicId, req, res, next))



module.exports = uploadImage
