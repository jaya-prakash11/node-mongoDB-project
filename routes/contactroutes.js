const express = require('express')

const router = express.Router();

const{getAllContacts,getContactOfSinglePerson,createContact , updateContact, deleteContact} = require('../controller/contactcontroller')

// Router.route.get(',(req, res)=>{
//     res.json({message:'get all contacts'})
// })

router.route('/').get(getAllContacts).post(createContact);

router.route('/:id').get(getContactOfSinglePerson).put(updateContact).delete(deleteContact);

module.exports = router