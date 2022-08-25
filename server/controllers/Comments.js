import mongoose from 'mongoose'
import Questions from '../models/Questions.js'

export const postComment = async(req, res) => {
    const { id: _id } = req.params;
    const { noOfComments, commentBody, userCommented } = req.body;
    const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    
    updateNoOfQuestions(_id, noOfComments)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'comment': [{ commentBody, userCommented, userId }]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}

const updateNoOfQuestions = async (_id, noOfComments) => {
    try {
        await Questions.findByIdAndUpdate( _id, { $set: { 'noOfComments' : noOfComments}})
    } catch (error) {
        console.log(error)
    }
}



export const deleteComment = async ( req, res ) => {
    const { id:_id } = req.params;
    const { commentId, noOfComments } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(commentId)){
        return res.status(404).send('Comment unavailable...');
    }
    updateNoOfQuestions( _id, noOfComments)
    try{
        await Questions.updateOne(
            { _id }, 
            { $pull: { 'comment': { _id: commentId } } }
        )
        res.status(200).json({ message: "Successfully deleted..."})
    }catch(error){
        res.status(405).json(error)
    }
}

