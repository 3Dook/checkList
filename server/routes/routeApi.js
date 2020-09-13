const express = require('express')
const router = express.Router()
const CheckList = require('./../models/checkList')
const { isValidObjectId } = require('mongoose')

router.get('/', async (req, res) =>{
    res.send("Hello, This is the server backEnd. This is a CRUD api. Please try to PUT, POST, DELETE some Data. Have Fun!")
})

router.post('/add', async (req, res) =>{
    let cList = new CheckList({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        itemList: req.body.itemList,
        //user: req.body.user,
    })

    try {
        cList = await cList.save()
        res.status(202).json({message: "add complete", cList})
    } catch(err){
        console.log(err)
        res.status(404).json({message: "ERROR - 404 unable to add", err})
    }
})

router.get('/all', async (req, res) =>{
    var check = CheckList; 
    check.find({}, {}, function(err, data){
        try{
            res.status(200).json(data)
        } catch(err){
            console.log(err);
            res.status(404).json("ERROR - UNABLE TO GET CHECK LIST")
        }
    })
})

router.get('/:id', async (req, res) =>{
    //find by param Id
    var check = CheckList; 
    check.findById(req.params.id, function(err, data){
        try{
            if(data){
                res.status(200).json({message: "Checklist found", data})
            }else{
                res.status(404).json({message: "Error - UNABLE TO GET ID", err})
            }
        } catch(err){
            console.log(err);
            res.status(404).json("ERROR - UNABLE TO GET specific ID")
        }
    })
})


// Update a Tutorial with id
router.put("/:id",  async (req, res) =>{
    //update
    var check = CheckList;
    //update save because it validates entries and is proper way.
    const doc = await check.findById(req.params.id)
    doc.title = req.body.title;
    doc.description = req.body.description;
    doc.itemList = req.body.itemList;
    doc.tags = req.body.tags
    try {
        await doc.save()
        res.status(202).json({message: "document update complete", doc})
    } catch(err){
        console.log(err)
        res.status(404).json({message: "ERROR - 404 unable to update", err})
    }
 
});

// Delete a Tutorial with id
router.delete("/delete/:id",  async (req, res) =>{
    //find by param Id
    var check = CheckList; 
    check.findByIdAndDelete(req.params.id, function(err, data){
        try{
            if(!data){
                res.status(404).json({message: "UNABLE FIND AND DELETE DOCUMENT WITH ID", err})
            }else{
                res.status(200).json({message: "DOCUMENT DELETED", data})
            }
        } catch(err){
            console.log(err);
            res.status(404).json({message: "UNABLE FIND AND DELETE DOCUMENT WITH ID", err})
        }
    })
})


module.exports = router