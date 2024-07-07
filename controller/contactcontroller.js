const asyncHandler = require('express-async-handler')
const Contacts = require('../model/contactmodel')

//@desc get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async(req, res) =>{
    try{
        const contacts = await Contacts.find({user_id:req.user.id});
        res.status(200).json(contacts)
    }catch(err){
        console.log(err)
    }
})

//@desc get  contacts for single id
//@route GET /api/contacts/:id
//@access private
const getContactOfSinglePerson = asyncHandler(async(req, res) =>{
    try{
        const contact = await Contacts.findById(req.params.id)
        if(!contact){
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
//@route POST /api/contacts/:id
//@access private
const createContact = asyncHandler(async(req, res) =>{

try{
    let {name , email , phone } = req.body

    if(!name  || !email || !phone ){
        res.status(400).send('fields are manditatory')
         throw new Error('fields are manditatory')
    }else{

        const contacts = await Contacts.create({name , email , phone, user_id: req.user.id})
        res.status(200).json(contacts)
    }
}catch(err){
    console.log(err)
}
})


//@desc update  contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req, res) =>{

    try{
        const contact = await Contacts.findById(req.params.id)

        if(!contact){
            
            res.status(400);
            throw new Error('no contacts availabble');
        }

        if(contact.user_id.toString() !== req.user.id){
            res.status(401)
            throw new Error('user is not authorized to change other users contact')
        }

        let updatedContact =  await Contacts.findByIdAndUpdate(req.params.id, req.body , {new:true});

        res.status(200).json(updatedContact)
    }catch(err){
            console.log(err)
    }
})

//@desc update  contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {

    try{
    const contact = await Contacts.findById(req.params.id);

    if (!contact) {
        res.status(400);
        throw new Error('No contacts available');
    }

    // Use contact.remove() or Contacts.findByIdAndDelete
    await Contacts.findByIdAndDelete( req.params.id); // OR await Contacts.findByIdAndDelete(req.params.id);



    res.status(200).json({ message: 'Deleted contact for ' + req.params.id })

}catch(err){
    console.log(errorHandeler)
}
}); // <- Closing parenthesis for the asyncHandler function call



module.exports = { getAllContacts, getContactOfSinglePerson, createContact , updateContact, deleteContact}