const express = require('express')
const validateAccessToken = require('../middleware/validateToken');

const router = express.Router();

const{getAllContacts,getContactOfSinglePerson,createContact , updateContact, deleteContact} = require('../controller/contactcontroller');

router.use(validateAccessToken)
router.route('/').get(getAllContacts).post(createContact);

router.route('/:id').get(getContactOfSinglePerson).put(updateContact).delete(deleteContact);

module.exports = router