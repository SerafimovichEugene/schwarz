import { Schema, model } from 'mongoose';

const orderHistorySchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    orders: {
        type: Array,
        required: true,
    },
    time: {
        type: Date,
        required: true
    },
});

export default model('OrderHistory', orderHistorySchema);
