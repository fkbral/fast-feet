import Mail from '../../lib/Mail';

class AssignmentMail {
  get key() {
    return 'AssignmentMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega disponível para retirada',
      template: 'assignment',
      context: {
        deliveryman: delivery.deliveryman.name,
        recipient: delivery.recipient.name,
        product: delivery.product,
      },
    });
  }
}

export default new AssignmentMail();
