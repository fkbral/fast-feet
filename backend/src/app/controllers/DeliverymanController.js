import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return res
        .status(400)
        .json({ error: 'Email already registered to another deliveryman' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.status(200).json(deliveryman);
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
    const deliverymen = await Deliveryman.findAll({
      where: query,
      include: { association: 'avatar' },
    });

    return res.status(200).json(deliverymen);
  }

  async list(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'joined_at'],
      include: {
        association: 'avatar',
        attributes: ['id', 'name', 'path', 'url'],
      },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    return res.status(200).json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    await deliveryman.update(req.body);

    return res.status(200).json(deliveryman);
  }

  async delete(req, res) {
    const { deliveryman_id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    await Deliveryman.destroy({ where: { id: deliveryman_id } });
    return res
      .status(200)
      .json({ message: `Deliveryman with id ${deliveryman_id} deleted` });
  }
}

export default new DeliverymanController();
