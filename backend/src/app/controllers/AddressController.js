import Address from '../models/Address';
import Recipient from '../models/Recipient';

class AddressController {
  async store(req, res) {
    const { recipient_id } = req.params;

    const recipient = await Recipient.findByPk(recipient_id);
    const { street, number, complement, state, city, zipcode } = req.body;

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const address = await Address.create({
      street,
      number,
      complement,
      state,
      city,
      zipcode,
      recipient_id,
    });
    return res.json(address);
  }

  async index(req, res) {
    const { recipient_id } = req.params;

    const recipient = await Recipient.findByPk(recipient_id, {
      include: { association: 'addresses' },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    return res.json(recipient.addresses);
  }
}

export default new AddressController();
