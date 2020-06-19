import Delivery from '../models/Delivery';
import File from '../models/File';

class AppController {
  async list(req, res) {
    const { deliveryman_id } = req.params;

    const deliveries = await Delivery.findAll({
      where: { deliveryman_id, canceled_at: null },
      attributes: [
        'id',
        'product',
        'status',
        'canceled_at',
        'start_date',
        'end_date',
        'start_date_formatted',
        'end_date_formatted',
        'canceled_at_formatted',
        'created_at_formatted',
      ],
      include: [
        {
          association: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
        },
        {
          association: 'recipient',
          attributes: ['id', 'name'],
          include: [
            {
              association: 'addresses',
              attributes: ['street', 'number', 'city', 'state', 'zipcode'],
            },
          ],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const { signature_id } = req.body;
    const { delivery_id } = req.params;

    const file = await File.findByPk(signature_id);

    if (!file) {
      return res.status(400).json({ error: 'Signature id is invalid' });
    }

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      res.status(400).json({ error: 'Delivery does not exist' });
    }

    delivery.signature_id = signature_id;
    delivery.end_date = new Date();

    await delivery.save();

    return res.status(200).json(delivery);
  }
}

export default new AppController();
