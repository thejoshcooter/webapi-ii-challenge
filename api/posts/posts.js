const express = require('express');
const router = require('express').Router();
const db = require('../../data/db');

const sendError = (msg, res) => {
    res.status(500);
    res.json({ errorMessage: `${msg}` })
  };

router.post('/', (req, res) => {

  const { title, contents } = req.body;
  const posted = { title, contents };

 
  if ( !title || !contents ) {
    return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  db
  .insert({ title, contents })
  .then( post => {
    post = {...post, posted}
    res.status(201).json(post);
  })
  .catch( err => {
    return sendError( 'There was an error while saving the post to the database', err );
  })
    // res.status(200).json({ message: 'success', operation: 'POST' })
}); 

router.post('/:id/comments', (req, res) => {
    res.status(200).json({ message: 'success', operation: 'POST' })
}); // needs does not exist logic to work properly

router.get('/', (req, res) => {
  db
  .find()
  .then( post => {
    res.status(200).json(post);
  })
  .catch( err => {
    return sendError( 'The posts information could not be retrieved.', err );
  })
    // res.status(200).json({ message: 'success', operation: 'GET' })
});

router.get('/:id', (req, res) => {
  const Id = req.params.id;
  db
  .findById(Id)
  .then( post => {
    if (post == 0) {
      return sendMissingID(res);
    }
    else {
      return res.status(200).json(post);
    }
  })
  .catch( err => {
    return sendError( 'The posts information could not be retrieved.', err );
  })
    // res.status(200).json({ message: 'success', operation: 'GET' })
});

router.get('/:id/comments', (req, res) => {
    res.status(200).json({ message: 'success', operation: 'GET' })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
  .then(post => {
    if (post == 0) {
      return sendMissingID(res);
    }
    else {
      return res.status(200).json(post);
    }
  })
  .catch( err => { 
    return sendError('oops', err)
  })
  db
  .remove(id)
  .then( post => {
    if (post == 0) {
      return sendMissingID(res);
    }
    else {
      return res.status(200).json(post);
    }
  })
  .catch( err => {
    return sendError( 'The post could not be removed.', err );
  })
    // res.status(200).json({ message: 'success', operation: 'DELETE' })
});  // needs does not exist lofic to work properly

router.put('/:id', (req, res) => {
  const id = req.params.id
  
  const { title, contents } = req.body;
  const posted = { title, contents };

 
  if ( !title || !contents ) {
    return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  db
  .update(id, posted)
  .then( post => {
    if (post == 0) {
      return sendMissingID(res);
    }
    else {
      post = {...post, posted}
      return res.status(201).json(post);
    }
  })
  .catch( err => {
    return sendError( 'The post information could not be modified.', err );
  })
    // res.status(200).json({ message: 'success', operation: 'PUT' })
});

module.exports = router;