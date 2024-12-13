const List = require('../models/List')


module.exports ={
    getList : async(req,res) => {

        try{
            const {user_id} = req.query

            if(!user_id) {
                return res.status(400).json("User Id should not be empty")
            }

            const responseData =  await List.find({user_id})

            return res.status(200).json(responseData)

        }
        catch(err) {
            return res.status(500).json({message: "Error ocurred", error:err.message})
        }
    },

    addList : async(req,res) => {

        try{
            const {user_id, title} =req.body

            if(!user_id || !title) {
                return res.status(400).json({message: "User ID and Title should not be empty"})
            }

            const responseData = await List.create(req.body)

            const newList =  await List.find({user_id}) 

            return res.status(200).json({message: "Added to List", data: newList})


        }
        catch(err)  {
            return res.status(500).json({message: " Error ocurred", error: err.message})
        }
    },

    removeList : async(req,res) => {

        try{
            const {user_id, id} = req.body

            if(!id) {
                return res.status(400).json("Id Should not be empty")
            }
            
            const responseData = await List.findByIdAndDelete({_id:id})
            const newList =  await List.find({user_id}) 
            return res.status(200).json({message: "Removed one item", data: newList})


        }
        catch(err) {
            return res.status(500).json({message:"Error ocurre", error: err.message})
        }
    }
}