import { isAfter } from 'date-fns';

import Delivery from '../models/Delivery';
import DeliveryProblems from '../models/DeliveryProblems';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemsController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblems.findAll({
      include: {
        association: 'delivery',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      attributes: ['description', 'id', 'date'],
    });

    return res.json(deliveryProblems);
  }

  async list(req, res) {
    const { delivery_id } = req.params;
    const deliveryProblems = await DeliveryProblems.findAll({
      where: { delivery_id },
      attributes: ['description', 'id', 'date'],
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const { delivery_id } = req.params;

    const deliveryExists = await Delivery.findByPk(delivery_id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    const { description } = req.body;

    const deliveryProblem = await DeliveryProblems.create({
      delivery_id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblems.findByPk(id, {
      include: { association: 'delivery' },
    });

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Problem does not exist' });
    }

    const { start_date } = deliveryProblem;
    const canceled_at = new Date();

    if (start_date && !isAfter(canceled_at, start_date)) {
      return res
        .status(400)
        .json({ error: 'Cancellation date must be after start date' });
    }

    deliveryProblem.delivery.canceled_at = canceled_at;

    await deliveryProblem.delivery.save();

    await Queue.add(CancellationMail.key, {
      delivery: deliveryProblem.delivery,
    });

    return res.status(200).json(deliveryProblem);
  }
}

export default new DeliveryProblemsController();
