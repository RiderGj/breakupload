var express = require('express');
var multer = require('multer');
// 文件存储配置
// var storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename(req, file, cb) {
//         let [filename, type] = file.originalname.split('.');
//         cb(null,  filename + '-' + Date.now() + '.' + type);
//     }
// });
var upload = multer({ dest: 'uppload' }).single('file');

var app = express();

app.use(express.static('public'));

app.post('/upload', (req, res) => {
    // console.log(req);
    upload(req, res, function(err) {
        if(err) {
            console.log('err', err);
            res.send(err);
        }
        console.log('req.keys', Object.keys(req));
        console.log('req.file', req.file);
        console.log('req.files', req.files);
        console.log('req.body', req.body);
        res.send('upload success!');
    })
    
})

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
    console.log('Please visit http://127.0.0.1:8000');
})