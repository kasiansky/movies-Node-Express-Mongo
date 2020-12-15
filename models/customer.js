const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, require: true, maxlength: 50 },
  phone: { type: String, require: true, minlength: 5, maxlength: 50 },
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required().max(50),
    phone: Joi.string().required().min(5).max(50),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

(exports.Customer = Customer), (exports.validate = validateCustomer);
