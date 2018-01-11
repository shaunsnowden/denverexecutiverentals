const mongoose = require('mongoose');

// Here is we define the table structure
let Schema = mongoose.Schema;

let PropertiesSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  propertyTitle: {
    type: String,
    trim: true,
    required: "Property name is required"
  },
  propertyAddress: {
    type: String,
    trim: true,
    required: "Property address is required"
  },
  image: {
    type: String,
  },
  occupied: {
    type: Boolean,
    required: "Is the property occupied?"
  },
  tenantName: {
    type: String,
    trim: true,
  },
  tenantEmail: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address."],
  },
  tenantPassword: {
    type: String,
  },
  TenantPhone: {
    type: String,
  },
  leaseStart: {
    type: Date,
    default: null
  },
  leaseEnd: {
    type: Date,
    default: null
  },
  monthlyRent: {
    type: String,
    required: "Please enter the monthly rent value."
  },
  rentDueDate: {
    type: Date,
    default: null
  },
  rentPaid: {
    type: Boolean,
    default: false
  }
});

let Properties = mongoose.model("Properties", PropertiesSchema);

module.exports = Properties;