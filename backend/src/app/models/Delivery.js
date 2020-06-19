import Sequelize, { Model } from 'sequelize';
import { format } from 'date-fns';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        start_date_formatted: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, ['start_date']),
          get() {
            const date = this.get('start_date');
            if (!date) return null;
            return format(date, 'dd/MM/yyyy');
          },
        },
        end_date_formatted: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, ['end_date']),
          get() {
            const date = this.get('end_date');
            if (!date) return null;
            return format(date, 'dd/MM/yyyy');
          },
        },
        canceled_at_formatted: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, ['canceled_at']),
          get() {
            const date = this.get('canceled_at');
            if (!date) return null;
            return format(date, 'dd/MM/yyyy');
          },
        },
        created_at_formatted: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, ['created_at']),
          get() {
            const date = this.get('created_at');
            if (!date) return null;
            return format(date, 'dd/MM/yyyy');
          },
        },
        status: {
          type: Sequelize.VIRTUAL(Sequelize.INTEGER, [
            'canceled_at',
            'start_date',
            'end_date',
          ]),
          get() {
            if (this.get('canceled_at')) {
              return 'Cancelado';
            }
            if (!this.get('start_date')) {
              return 'Pendente';
            }
            if (!this.get('end_date')) {
              return 'Retirada';
            }
            return 'Entregue';
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Delivery;
