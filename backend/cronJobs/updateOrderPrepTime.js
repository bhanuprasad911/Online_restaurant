import cron from 'node-cron';
import Order from '../models/order.model.js';
import Chef from '../models/chef.model.js';
import Table from '../models/table.model.js';

export const updateOrderTimePrep = ()=>{
    cron.schedule('* * * * *', async()=>{
        console.log('Cron running: updating order time prep');
        try {
            const pendingOrders = await Order.find({prepTime:{$gt:0}});
            for (let ord of pendingOrders){
                const chef = await Chef.findById(ord.chef);
                ord.prepTime = Math.max(0,ord.prepTime-1)
                chef.workingTime = Math.max(0, chef.workingTime-1)
                if (ord.prepTime === 0){
                    if(ord.type === 'Dine In'){
                        const table = await Table.findOne({number:ord.table_No});
                        table.status='unreserved'
                        await table.save();
                    }
                    chef.ordersTaken= chef.ordersTaken-1;
                    chef.workingTime=0
                    if (ord.type === 'Dine In'){
                        ord.status = 'Done'
                    }
                    else if(ord.type === 'Take Away'){
                        ord.status = 'Not picked up'
                    }
                    
                }
                await ord.save();
                await chef.save();
            }
            console.log('updating time completed')
            
        } catch (error) {
            console.error("Error in cron job:", error);
            
        }
    })
}