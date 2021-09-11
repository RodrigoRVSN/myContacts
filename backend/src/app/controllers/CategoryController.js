const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'You should send a name' })
    }

    const category = await CategoriesRepository.create({ name });

    res.json(category)
  }

  async index(req, res) {
    const categories = await CategoriesRepository.findAll();
    res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.json(category)
  }

  async delete(req, res) {
    const { id } = req.params;
    await CategoriesRepository.delete(id);
    res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExist = await CategoriesRepository.findById(id);
    if (!categoryExist) {
      return res.status(400).json({ error: 'This category doesnt exists' });
    }

    if (!name) {
      return res.status(400).json({ error: 'You should send a name to update' });
    }

    const category = await CategoriesRepository.update(id, name);

    res.json(category);
  }
}

module.exports = new CategoryController()
