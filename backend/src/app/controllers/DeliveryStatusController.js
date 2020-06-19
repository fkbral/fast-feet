import Delivery from '../models/Delivery';

class DeliveryStatusController {
  async store(req, res) {
    const { start_date, end_date } = req.body;

    return res.json({ ok: true });
  }

  async index(req, res) {
    const { id } = req.params;

    return res.json({ ok: true });
  }
}

export default new DeliveryStatusController();
