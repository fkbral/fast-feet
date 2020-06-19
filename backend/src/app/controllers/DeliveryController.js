import { isBefore, isAfter, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import Queue from '../../lib/Queue';
import AssignmentMail from '../jobs/AssignmentMail';

class DeliveryController {
  async store(req, res) {
    const { deliveryman_id, recipient_id } = req.body;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const delivery = await Delivery.create(req.body);

    delivery.dataValues.deliveryman = deliverymanExists.dataValues;
    delivery.dataValues.recipient = recipientExists.dataValues;

    await Queue.add(AssignmentMail.key, {
      delivery,
    });

    return res.json(delivery);
  }

  async index(req, res) {
    const { product } = req.query;
    const query = product
      ? {
          product: {
            [Op.iLike]: `%${product}%`,
          },
        }
      : {};
    const deliveries = await Delivery.findAll({
      where: query,
      attributes: [
        'id',
        'status',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'canceled_at_formatted',
        'start_date_formatted',
        'end_date_formatted',
        'created_at_formatted',
        'signature_id',
      ],
      include: [
        {
          association: 'deliveryman',
          attributes: ['id', 'name'],
          include: {
            association: 'avatar',
            attributes: ['id', 'name', 'path', 'url'],
          },
        },
        {
          association: 'recipient',
          attributes: ['id', 'name'],
          include: {
            association: 'addresses',
            attributes: ['street', 'number', 'city', 'state', 'zipcode'],
          },
        },
        {
          association: 'signature',
          attributes: ['name', 'url'],
        },
      ],
    });

    return res.status(200).json(deliveries);
  }

  async list(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          association: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          association: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!delivery) {
      return res.error(400).status({ error: 'Delivery does not exist' });
    }

    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      deliveryman_id,
      recipient_id,
      // product,
      end_date,
      canceled_at,
      start_date,
    } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    if (deliveryman_id) {
      const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

      if (!deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman does not exist' });
      }
    }

    if (recipient_id) {
      const recipientExists = await Recipient.findByPk(recipient_id);

      if (!recipientExists) {
        return res.status(400).json({ error: 'Recipient does not exist' });
      }
    }

    if (start_date) {
      const date = new Date().setHours(
        parseISO(start_date).getHours(),
        parseISO(start_date).getMinutes(),
        parseISO(start_date).getSeconds()
      );
      const min_date = new Date().setHours(8, 0, 0);
      const max_date = new Date().setHours(18, 0, 0);
      if (isBefore(date, min_date) || isAfter(date, max_date)) {
        return res
          .status(404)
          .json({ error: 'Start date must be between 08:00 and 18:00' });
      }
    }

    if (end_date) {
      if (!isAfter(parseISO(end_date), parseISO(start_date))) {
        return res
          .status(400)
          .json({ error: 'End date must be after start date' });
      }
    }

    if (canceled_at) {
      if (!isAfter(parseISO(canceled_at), parseISO(start_date))) {
        return res
          .status(400)
          .json({ error: 'Cancellation date must be after start date' });
      }
    }

    delivery.update(req.body);

    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    await delivery.destroy();

    return res.status(204).send();
  }
}

export default new DeliveryController();
