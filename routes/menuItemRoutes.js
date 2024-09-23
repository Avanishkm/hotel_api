const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem')

// POST route to add a menu item
router.post("/", async(req,res) => {
    try {
        const data = req.body // assuming the requset body contains the person data
        // Create a new Person document using the mongoose modal
        const newMenuItem = await MenuItem(data);
        // save the new person to the database
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

// GET methods to get the menu items 
router.get('/', async(req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.get('/:tasteType', async(req,res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType=="sweet" || tasteType=="spicy" || tasteType=="sour"){
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: "Invalid taste Type"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.put('/:id', async(req, res) => {
    try {
        const MenuItemId = req.params.id; // Extract the id from the URL parameter
        const updatedMenuItemData = req.body; // update data for the person

        const response = await MenuItem.findByIdAndUpdate(MenuItemId, updatedMenuItemData,{
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
        if(!response){
            return res.status(404).json({error: "MenuItem not found"});
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
        const MenuItemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(MenuItemId);
        if(!response){
            return res.status(404).json({error: "MenuItemId not found"});
        }
        console.log('data deleted');
        res.status(200).json({message: 'MenuItemId Deleted successfully'});

    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

module.exports = router;