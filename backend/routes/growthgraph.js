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
router.get("/graph", (req,res)=>{
    let title =req.query.title;
    const ref = db.ref(`graphs/${title}`);
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
router.get("/directory",(req,res)=>{
    let user =req.query.uid;
    const ref =db.ref(`graphs`);
    ref.once('value',(snap)=>{
        if(snap.exists()){
            res.status(200).json(Object.keys(snap.val()));    
        }else{
            res.status(400).json("Empty Directory");
        }
    }, (errorObject) => {
        res.status(400).json({"error":errorObject});
    });
});


/**
 * POST GRAPH newdoc
 * Creates new doc
 *
 * @param {str}  title title of new graph.
 * @return {JSONObject} object of all the types of usage.
 */
router.post("/newdoc", (req,res)=>{
    let title =req.body.title;
    let ref = db.ref(`graphs/${title}`);
    ref.once("value", (snap)=>{
        if(snap.exists()){
            res.status(200).json({error:"file exists"})
        }
        else{
            db.ref('graphs').update({[title]: {title:title}});
            res.status(200).json("Received");
        }
    })

})

/**
 * POST USER update graph
 * Updates the contents of a graph.
 * 
 * @param {obj}  title  which graph to update.
 * @return {obj} object of all the types of usage.
 */
router.post("/update", (req,res)=>{
    const ref = db.ref(`graphs/${req.body.title}`);
    ref.update(req.body);
    res.status(200).json("Received");
})

router.delete("/delete", (req, res)=>{
    let title = req.query.title;
    const ref = db.ref(`graphs/${title}`);
    ref.remove().then((resp)=>res.status(200).json("Received"))
    .catch(function(error) {
        console.log("Remove failed: " + error.message)
    });
    
})

module.exports = router;