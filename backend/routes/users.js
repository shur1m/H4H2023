//firebase stuff
const firebase=require("firebase-admin");
const admin = require("../firebase");
 

//server stuff
const express=require("express");

const router = express.Router();
const db = admin.database();



/**
 * GET GRAPH gets graph
 * Retrieves graph 
 *
 * @param {str}  title title of  graph.
 * @return {object} object of the graph.
 */
router.get("/directory", (req,res)=>{
    let uid =req.query.uid;
    const ref = db.ref(`users/${uid}`);
    ref.once('value', (snap) => {
        if(snap.exists()){
            res.status(200).json(snap.val());
        }else{
            res.status(200).json("Doc does not exist");
        }
      }, (errorObject) => {
        res.status(400).json({"error":errorObject});
      }); 
})
router.post("/share",(req,res)=>{
    let uid =req.body.uid;
    let title=req.body.title;
    const ref =db.ref(`users/${uid}`);
    ref.push(title).then(()=>res.status(200).json("Received"));
    
});


/**
 * POST GRAPH newdoc
 * Creates new doc
 *
 * @param {str}  title title of new graph.
 * @return {JSONObject} object of all the types of usage.
 */
router.post("/newuser", (req,res)=>{
    let uid =req.body.uid;
    let ref = db.ref(`users/${uid}`);
    ref.once("value",(snap)=>{
        if(snap.exists()){
            res.status(200).json({error:"users exists"})
        }
        else{
            db.ref('users').update({[uid]: {uid:uid}});
            res.status(200).json("Received");
        }
    })

})


module.exports = router;