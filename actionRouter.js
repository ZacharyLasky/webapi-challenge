const express = "express";
const router = require("express").Router();
const actionDatabase = require("./data/helpers/actionModel");
const projectDatabase = require("./data/helpers/projectModel");

//GET (GET)
router.get("/:id", validateId, (req, res) => {
  actionDatabase
    .get(req.params.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
})

//POST (INSERT)
router.post("/", validatePost, (req,res) => {
  actionDatabase.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

//PUT (UPDATE)
router.put("/:id", validateId, validatePost, (req,res) => {
  actionDatabase.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

//DELETE (REMOVE)


//local custom middleware
function validateId(req, res, next) {
  actionDatabase.get(req.params.id) 
   .then(user => {
     if (user) {
       next();
     }
     else {
       res.status(404).json({message: "invalid id"})
     }
   })
}

function validatePost(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({message: "missing required text field"})
  }
  else if (!req.body) {
    res.status(400).json({message: "missing post data"})
  }
  next();
}


module.exports = router;