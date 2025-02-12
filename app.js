const cors = require('cors');
const express = require('express');
const Path = require('path');
const upload = require('./middleware/img.middleware');

// const upload = require('multer')().single('blogImage');

const Port = process.env.PORT || 5000;


const app = express();

// memory db
let db = {};

// configuring middlewares..
app.use('/getImage' , express.static(Path.join(__dirname , 'uploads')))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// configuring cors..
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials : true
}));



app.get("/data" , (req,res)=>{
    res.json('hello world');
});


app.post('/uploadImage' , upload.single('blogImage') , (req,res)=>{
    if(!req.file){
        res.sendStatus('400').json('file not found');
    }else{
        res.json(
            { 
            msg: 'file uploaded successfully!', 
            file: req.file.filename
            })
    }

});

// route for save blog...

app.post('/saveBlog' , (req,res)=>{
    try {
        const {date , data} = req.body;
        db = {date , data};  // save the object
        res.json('data saved successfully')
    } catch (error) {
        console.log(error.message);
    }
}); 

app.get('/blogs' , (req,res)=>{
    try {
        if(db){
            res.json({date: db.date , blogs: db.data})
        }else{
            res.json({date: "" , blogs: null})
        }
    } catch (err) {
       console.log(err.message) 
    }
})





// app.get('/getImage/:id', (req,res)=>{
//     try {
//         const file = imageFile.find(img => img.fileId === req.params.id);

//         res.set('Content-Type' , file.fileContentType);
//         res.set('Content-Disposition', `attachment; filename=${file.fileName}`);
//         res.send(file.fileData);


//     } catch (error) {
//         res.json(error.message)
//     }
// })


app.listen(Port, ()=>{
    console.log('server is listening on port ',Port)
})