const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
  car_brand: {
    type: String,
    require: [true, 'Please add a brand'],
    maxlength: [50, 'Brand can not be more than 50 characters']
  },
  car_model: {
    type: String,
    require: [true, 'Please add a model'],
    maxlength: [50, 'Model can not be more than 50 characters']
  },
  color: {
    type: String,
    require: [true, 'Please add a color'],
  },
  license: {
    type: String,
    require: [true, 'Please add a license'],
    unique: true,
    maxlength: [10, 'License can not be more than 10 characters'],
  },
  provider_name: {
    type: String,
    require: [true, 'Please add a provider name'],
  }
},
{
  JSON: {virtuals:true},
  toObject: {virtuals:true}
})

CarSchema.pre('deleteOne', {document:true, query:false}, async function(next) {
  console.log(`Appointments being removed from car ${this._id}`);
  await this.model('Appointment').deleteMany({car: this._id});
  next();
})

// Reverse populate with virtuals
CarSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'car',
  justOne: false
})

module.exports = mongoose.model('Car', CarSchema);
