const express = require('express');
const router = express.Router();

const Person = require('../models/person')

// POST route to add a person
router.post("/", async(req,res) => {
    try {
        const data = req.body // assuming the requset body contains the person data
        // Create a new Person document using the mongoose modal
        const newPerson = await Person(data);
        // save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

// GET methods to get the person 
router.get('/', async(req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.get('/:workType', async(req,res) => {
    try {
        const workType = req.params.workType;
        if(workType=="chef" || workType=="waiter" || workType=="manager"){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: "Invalid work Type"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // update data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
        if(!response){
            return res.status(404).json({error: "Person not found"});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.delete('/:id',async (req, res)=> {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: "Person not found"});
        }
        console.log('data deleted');
        res.status(200).json({message: 'person Deleted successfully'});

    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

module.exports = router;