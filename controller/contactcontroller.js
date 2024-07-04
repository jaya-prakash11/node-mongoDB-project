const asyncHandler = require('express-async-handler')
const Contacts = require('../model/contactmodel')

//@desc get all contacts
//@route GET /api/contacts
//@access public
const getAllContacts = asyncHandler(async(req, res) =>{
    try{
        const contacts = await Contacts.find()
        res.status(200).json(contacts)
    }catch(err){
        console.log(err)
    }
})

//@desc get  contacts for single id
//@route GET /api/contacts/:id
//@access public
const getContactOfSinglePerson = asyncHandler(async(req, res) =>{
    console.log(req.params.id)
    try{
        const contact = await Contacts.findById(req.params.id)
        if(!contact){
            console.log('inside contacts', contact);
            res.status(400)
            // throw new Error('id not found')
        }else{
            res.status(200).json(contact)
        }
    }catch(err){
            console.log(err)
            res.status(404)
    }
})


//@desc Create  contacts
//@route post /api/contacts/:id
//@access public
const createContact = asyncHandler(async(req, res) =>{

try{
    let {name , email , phone } = req.body

    if(!name  || !email || !phone ){

        console.log('ISNDE')
       
        res.status(400).send('fields are manditatory')
         throw new Error('fields are manditatory')
    }else{
        console.log('req body', req.body)

        const contacts = await Contacts.create({name , email , phone})
        res.status(200).json(contacts)
    }
}catch(err){
    console.log(err)
}
})


//@desc update  contacts
//@route put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res) =>{

    try{
        const contact = await Contacts.findById(req.params.id)

        if(!contact){
            
            res.status(400);
            throw new Error('no contacts availabble');
        }

        let updatedContact =  await Contacts.findByIdAndUpdate(req.params.id, req.body , {new:true});

        res.status(200).json(updatedContact)
    }catch(err){
            console.log(err)
    }
})


const deleteContact = asyncHandler(async (req, res) => {

    try{
    const contact = await Contacts.findById(req.params.id);

    if (!contact) {
        res.status(400);
        throw new Error('No contacts available');
    }
    console.log('c', req.params.id);

    // Use contact.remove() or Contacts.findByIdAndDelete
    await Contacts.findByIdAndDelete( req.params.id); // OR await Contacts.findByIdAndDelete(req.params.id);

    console.log('d', req.params.id);


    res.status(200).json({ message: 'Deleted contact for ' + req.params.id })

}catch(err){
    console.log(errorHandeler)
}
}); // <- Closing parenthesis for the asyncHandler function call



module.exports = { getAllContacts, getContactOfSinglePerson, createContact , updateContact, deleteContact}