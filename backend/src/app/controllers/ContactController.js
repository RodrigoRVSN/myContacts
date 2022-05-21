const ContactsRepository = require('../repositories/ContactsRepository')
const isValidUUID = require('../utils/isValidUUID')

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    res.json(contacts)
  }

  async show(req, res) {
    const { id } = req.params

    if(!isValidUUID(id)){
      return res.status(400).json({ error: 'Invalid contact id' })
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' })
    }

    res.json(contact)
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body

    if(category_id && !isValidUUID(category_id)){
      return res.status(400).json({ error: 'Invalid contact id' })
    }

    if (!name) {
      return res.status(400).json({ error: 'You should send a name' })
    }

    if(email){
      const contactExists = await ContactsRepository.findByEmail(email)

      if (contactExists) {
        return res.status(400).json({ error: 'This e-mail is already been taken' })
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null ,
    })

    res.json(contact)
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body

    if(!isValidUUID(id)){
      return res.status(400).json({ error: 'Invalid contact id' })
    }

    if(category_id && !isValidUUID(category_id)){
      return res.status(400).json({ error: 'Invalid contact id' })
    }

    if (!name) {
      return res.status(400).json({ error: 'You should send a name' })
    }

    const contactExist = await ContactsRepository.findById(id);

    if (!contactExist) {
      return res.status(400).json({
        error: 'This contact doesnt exists'
      })
    }

    if(email){
      const contactExists = await ContactsRepository.findByEmail(email)

      if (contactExists) {
        return res.status(400).json({ error: 'This e-mail is already been taken' })
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null
    })

    res.json(contact)
  }

  async delete(req, res) {
    const { id } = req.params

    if(!isValidUUID(id)){
      return res.status(400).json({ error: 'Invalid contact id' })
    }

    await ContactsRepository.delete(id)
    res.sendStatus(204)
  }
}

module.exports = new ContactController();
