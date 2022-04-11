// using modules
const express = require('express');
const adminRouter = express.Router();
const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const db = require('../../tools/db.js');

const client = new MongoClient(db.uri);

adminRouter.get('/:JoinCode?', async(req, res) => {
    await client.connect();
    const boards = client.db("BingoTime").collection("BingoBoards");
    const allBoards = await boards.find({}).toArray();

    const JoinCode = String(req.params.JoinCode);
    
    let playerNumbers = {};

    allBoards.forEach(boards =>{
        if (!playerNumbers[boards.GameName]){
            playerNumbers[boards.GameName] = 1;
        }else{
            playerNumbers[boards.GameName]++;
        }
    });
    
    if (JoinCode !== "undefined"){
    }else{
        console.log("No Join Code Found");
    }

    res.render('admin', {playerNumbers: playerNumbers});
});

module.exports = adminRouter;