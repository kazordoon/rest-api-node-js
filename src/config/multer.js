const { resolve } = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, resolve(__dirname, '..', '..', 'uploads'))
  },
  filename (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter (req, file, cb) {
    const allowedMimes = [
      'image/jpeg',
      'image/png'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Tipo de arquivo inválido'), false)
    }
  }
})

module.exports = upload
