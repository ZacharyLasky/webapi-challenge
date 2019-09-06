const express = "express";
const router = require("express").Router();
const projectDatabase = require("./data/helpers/projectModel");
const actionDatabase = require("./data/helpers/actionModel");

//CRUD ACTIONS BELOW

//POST(CREATE)
router.post("/", (req,res) => {
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
router.get("/:id", validateUserId, (req, res) => {
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

//DELETE (DELETE)

//local custom middleware
function validateUserId(req, res, next) {
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

module.exports = router;