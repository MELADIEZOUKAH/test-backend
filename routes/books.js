const express = require('express');
const router = express.Router();
const Books = require('../modules/createbook.schema')
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const {isAuthenticated} = require('../middleware/isAuthenticated');

// get new book page
router.get('/', isAuthenticated, async(req,res)=>{
    res.render('newbook')
})

// get all books from database
router.get('/post_data',async(req,res)=>{
    const post_Data = await Books.find();
    res.send(post_Data);
})

// create new book
router.post('/', auth, upload.single('file'), async (req,res)=>{
    const {number,name,img,url,name_book,article_code,discription} = req.body;
    console.log(req.file)
    const books = await Books.find();

    const General = books.filter(e => e.number >= 0 && e.number < 5000);
    const Electronic = books.filter(e => e.number >= 5000 && e.number < 10000);
    const Mechanicla = books.filter(e => e.number >= 10000 && e.number < 15000);
    const Architectrual = books.filter(e => e.number >= 15000 && e.number < 20000);
    const Civil = books.filter(e => e.number >= 25000 && e.number < 25000);
    const Chemistry = books.filter(e => e.number >= 25000 && e.number < 30000);

    const get_number  =   number === "0" ? General.length 
                        : number === "1" ? Electronic.length+5000
                        : number === "2" ? Mechanicla.length + 10000
                        : number === "3" ? Architectrual.length +15000
                        : number === "4" ? Civil.length + 20000
                        :  Chemistry.length + 25000

    const file = JSON.stringify(req.file)
    const newBook = await Books.create({
        number : get_number ,
        name,
        img,
        url,
        name_book,
        article_code,
        discription,
        createAt : new Date(),
        file: file
    });
    // if(req.file){
    //     let path = '';
    //     req.file.forEach((file, index, array) => {
    //         path = path + file.path + ',';
    //     })  
    //     path = path.substring(0, path.lastIndexOf(","));
    //     schema.avator = path;
    // }
    res.render('newbook')
})

// Delete a book
router.get('/delete', async (req, res) => {
    const post_Data = await Books.find();
    res.render('deletebook',{Data : post_Data});
})

// Delete a book
router.delete('/:id',async(req,res)=>{
    const delete_book = await Books.findByIdAndRemove(req.params.id)
    console.log(req.params);
    res.send(req.params.id)
})

router.post('/delete/GetDataFromSearch', async(req, res) => {
    let get_data = req.body.search.trim();
    let data = await Books.find({ name: {$regex : new RegExp(get_data,'i') }}).exec();
    console.log(data);
    res.send({search : data, value : get_data})
})


module.exports = router;