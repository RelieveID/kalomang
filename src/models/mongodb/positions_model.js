const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const PositionSchema = new Schema({
    uuid: {
        type: String,
        default: uuid.v4,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    geograph: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: Number,
        enum: [10, 20, 30],
        required: true
    },
    is_latest: {
        type: Boolean,
        default: false,
        required: true
    }
}, { versionKey: false, toJSON: { virtuals: true } });

PositionSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'uuid',
    justOne: true
});

module.exports = model('Position', PositionSchema, 'positions');
