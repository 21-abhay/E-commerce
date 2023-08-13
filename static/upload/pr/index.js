const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');


app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/uploads'));
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        // cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        const customFileName = req.body.filename + path.extname(file.originalname);
        cb(null, customFileName);
    },
});

// Create the multer instance for handling file uploads
const upload = multer({ storage });

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to display the upload form
app.get('/upload', (req, res) => {
    res.render('upload');
});

// Route to handle the file upload form submission
app.post('/upload', upload.single('image'), (req, res) => {
    // If the file was uploaded successfully, it will be available in the "req.file" object
    if (req.file) {
        res.send('File uploaded successfully!');
    } else {
        res.send('No file was selected for upload.');
    }
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
