const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');

const Joi = BaseJoi.extend(Extension);
const validator = require('../request-handler/validator');

const COOR_REGEX = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;

const schemas = {
    list: Joi.object({
        query: Joi.object({
            type: Joi.string().default('recent').valid('recent', 'daily', 'weekly', 'monthly')
        }).required()
    }),
    check: Joi.object({
        query: Joi.object({
            coordinates: Joi.string().regex(COOR_REGEX).required()
        }).required()
    })
};

module.exports = method => [
    (req, res, next) => {
        req.schema = schemas[method]; next();
    }, validator
];
