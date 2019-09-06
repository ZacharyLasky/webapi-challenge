const express = "express";
const router = require("express").Router();
const projectDatabase = require("./data/helpers/projectModel");
const actionDatabase = require("./data/helpers/actionModel");

//CRUD ACTIONS BELOW

//POST / (CREATE)
router.post("/", validatePost, (req,res) => {
  projectDatabase.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

//GET / (READ)
router.get("/", (req, res) => {
  projectDatabase
    .get()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
})

//GET /:id (READ)
router.get("/:id", validateId, (req, res) => {
  projectDatabase
    .get(req.params.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
})

//PUT (UPDATE)
router.put("/:id", validateId, validatePost, (req, res) => {
  projectDatabase.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

//DELETE (DELETE)
router.delete("/:id", validateId, (req,res) => {
  projectDatabase.remove(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => [
      res.status(500).json(error)
    ])
})

//EXTRA (getProjectActions/projectId)
router.get("/projectId/:id", (req, res) => {

  actionDatabase.get()
    .then(data => {
      res.status(200).json(data)
    })
  projectDatabase.getProjectActions(req.body.project_id)
    .then(actions => {
      res.status(200).json(actions)
      console.log(req.body.project_id)
    })
    .catch(error => {
      res.status(500).json(error)
      console.log(req.body.project_id)
    })
})

//local custom middleware
function validateId(req, res, next) {
  projectDatabase.get(req.params.id) 
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
  if (!req.body.name || !req.body.description) {
    res.status(400).json({message: "missing required text field"})
  }
  else if (!req.body) {
    res.status(400).json({message: "missing post data"})
  }
  next();
}

function getActions(req, res, next) {
  actionDatabase.get() 
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(404).json(error)
    })
  next()
}
 




module.exports = router;