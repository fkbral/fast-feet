import Sequelize, { Model } from 'sequelize';
import { format } from 'date-fns';

class DeliveryProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        date: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, ['created_at']),
          get() {
            const date = this.get('created_at');
            if (!date) return null;
            return format(date, 'dd/MM/yyyy');
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
    this.belongsTo(models.Delivery, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    });
  }
}

export default DeliveryProblems;
