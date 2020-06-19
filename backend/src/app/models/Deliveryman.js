import Sequelize, { Model } from 'sequelize';
import { format } from 'date-fns';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        joined_at: {
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
        tableName: 'deliverymen',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliveryman;
