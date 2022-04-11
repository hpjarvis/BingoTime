// using modules
const express = require('express');
const homeRouter = express.Router();
const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');

const uri = "mongodb+srv://admin:CLJ2XTpH614GR3WF@bingotime.brpff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function getBoard(UserId, GameName){
    await client.connect();
    const boards = client.db("BingoTime").collection("BingoBoards");
    const query = { "username": UserId, "GameName": GameName};
    var board = await boards.findOne(query);

    if (board){
        console.log(`Found ${UserId} on ${GameName} Board`);
        return(board['Guesses']);
    }
    else{
        console.log(`Cannot Find ${UserId} on ${GameName} Board`);
        return(false);
    }
}

homeRouter.get('/:boardName/:userId', async(req, res) => {
    const boardName = String(req.params['boardName']);
    const userId =  String(req.params['userId']);

    const guesses = await getBoard(userId, boardName).catch(console.error);
    
    if (guesses){
        res.render('home', { name: boardName, values: guesses});
    }else{
        res.render('403');
    }
});

module.exports = homeRouter;