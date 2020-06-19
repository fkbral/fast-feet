import * as Yup from 'yup';
import { Op } from 'sequelize';

import Address from '../models/Address';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { name, street, number, complement, city, state, zipcode } = req.body;

    const recipient = await Recipient.create({
      name,
    });

    await Address.create({
      street,
      number,
      complement,
      city,
      state,
      zipcode,
      recipient_id: recipient.id,
    });

    return res.status(200).json(recipient);
  }

  async index(req, res) {
    const { name } = req.query;
    const query = name
      ? {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        }
      : {};
    const recipients = await Recipient.findAll({
      where: query,
      include: { association: 'addresses' },
    });

    return res.status(200).json(recipients);
  }

  async list(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
      include: { association: 'addresses' },
    });

    return res.status(200).json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    await recipient.destroy();

    return res.status(204).send();
  }
}

export default new RecipientController();
