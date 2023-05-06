const Software = require('../modules/createSoftware.schema');
const _ = require('lodash');

const get_software = async (req,res)=>{
    res.render('newSoftware');
};

const post_data_to_front = async (req,res)=>{
    
    const software = await Software.find();
    let new_software = [];
    for(let i=0; i < software.length; i++){
        if(software[i].isVisibale === true){
            new_software.push(
                {
                    name: software[i].name,
                    path_img: software[i].path_img,
                    path_software: software[i].path_software,
                    discription: software[i].discription
                }
            )
        }
    }

    // console.log(new_software[0]);
    res.send(new_software);
}

const post_software = async (req,res)=>{
    const {name, path_img, path_software, discription} = req.body;
    // console.log(name, path_img, path_software, discription);
    const software = await Software.create({
        name,
        path_img,
        path_software,
        discription,
        createAt :new Date(),
        isVisibale: true
    })
    res.redirect('/Software')
};

module.exports ={
    get_software,
    post_software,
    post_data_to_front
}