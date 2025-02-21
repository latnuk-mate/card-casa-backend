// configuring env file..
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const Path = require('path');
const upload = require('./middleware/img.middleware');
const connection = require('./config/db');
const blogModal = require('./model/Blog.model');

const Port = process.env.PORT

const app = express();


// database set up..
connection();


// configuring middlewares..
app.use('/getImage' , express.static(Path.join(__dirname , 'uploads')))
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// configuring cors..
app.use(cors({
    origin: process.env.ORIGIN_URL,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials : true
}));




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

// route for save blog..

app.post('/saveBlog' , async(req,res)=>{
    try {
        const blogDoc = await blogModal.create({
            title: req.body.titleText,
            metaText: req.body.metaText,
            publishDate: req.body.postDate,
            components: req.body.components
        });

        await blogDoc.save();
        console.log(blogDoc);

        res.json('data saved successfully');

    } catch (error) {
        console.log(error.message);
    }
}); 

app.get('/blogs' , async(req,res)=>{
    try {
       const blogs = await blogModal.find({});
       if(blogs) {
        res.json(blogs)
       }else{
            res.sendStatus(404).json('found nothing');
       }
    } catch (err) {
       console.log(err.message) 
    }
})



app.listen(Port, ()=>{
    console.log('server is listening on port ',Port)
})