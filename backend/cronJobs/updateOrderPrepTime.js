import cron from 'node-cron';
import Order from '../models/order.model.js';
import Chef from '../models/chef.model.js';
import Table from '../models/table.model.js';

export const updateOrderTimePrep = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Cron running: updating order time prep');

    try {
      const pendingOrders = await Order.find({ prepTime: { $gt: 0 } });

      if (!pendingOrders.length) {
        console.log('No pending orders to update.');
        return;
      }

      // Build a unique list of chef IDs from orders
      const chefIds = [...new Set(pendingOrders.map(ord => ord.chef.toString()))];
      const chefs = await Chef.find({ _id: { $in: chefIds } });
      const chefMap = new Map(chefs.map(chef => [chef._id.toString(), chef]));

      await Promise.all(pendingOrders.map(async (ord) => {
        const chef = chefMap.get(ord.chef.toString());
        if (!chef) return;

        // Decrease prep and working time
        ord.prepTime = Math.max(0, ord.prepTime - 1);
        chef.workingTime = Math.max(0, chef.workingTime - 1);

        if (ord.prepTime === 0) {
          if (ord.type === 'Dine In') {
            const table = await Table.findOne({ number: ord.table_No });
            if (table) {
              table.status = 'unreserved';
              await table.save();
            }
            ord.status = 'Done';
          } else if (ord.type === 'Take Away') {
            ord.status = 'Not picked up';
          }

          chef.ordersTaken = Math.max(0, chef.ordersTaken - 1);
          chef.workingTime = 0;
        }

        await Promise.all([ord.save(), chef.save()]);
      }));

      console.log('Updating time completed ✅');
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });
};
