const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//0 PANDDING .1 APPROVE, 2- REJECT, 3 SUSPEND 


const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  status: { type: String, default: 'I am new!' },
  plans: [{
    planId: String,
    durationType: String,
    duration: Number,
    sDate: String,
    expiery: String,
    status: Number
  }]
}, { collection: 'subscriber' });
const mentorSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, default: '2' }
}, { collection: 'mentors' });

const subscriberPlanSchema = new Schema({
  planName: { type: String, required: true },
  price: { type: Number, required: false },

  durationType: { type: String, required: true },
  duration: { type: Number, required: true },
  sDate: { type: Date, required: true },
  expiery: { type: Date, require: true },
  MentorId: { type: String, require: true }
}, { collection: 'subscriberplan' });

const subscribePlanSchema = new Schema({
  subscriberId: { type: String, required: true },
  planId: { type: String, required: true },
  durationType: { type: String, required: true },
  duration: { type: Number, required: true },
  sDate: { type: String, required: true },
  expiery: { type: String, require: true },
  status: { type: Number },
  paymentStatus: { type: Number, default: 1 },
  price: { type: Number, required: false },

}, { collection: 'subscribeplan' });
const subscribeMentorSchema = new Schema({
  subscriberId: { type: String, required: true },
  mentorId: { type: String, required: true },
  status: { type: Number }

}, { collection: 'subscribementors' });
const mentorSignalSchema = new Schema({
  Public: { type: String },
  package_id: { type: String },
  BSE_NSC: { type: String },
  BUY_SELL: { type: String },
  stockName: { type: String, required: true },
  Qty: { type: Number },
  Price: { type: Number },
  MIS_CNC: { type: String },
  orderType: { type: String },
  triggerPrice: { type: Number },
  setStoploss: { type: Boolean },
  stoploss_percent: { type: Number },
  setTarget: { type: Boolean },
  target_price: { type: Number },
  variety: { type: String },
  validity: { type: String },
  mentorId: { type: String, required: true },

  crated_on: { type: Date },
  expier_on: { type: Date },
}, { collection: 'Signal' });

const gatewaysResponceSchema = new Schema({
  gatewayresponse: { type: Object },
  timestemp: { type: Date, default: Date.now },
  subscriberId: { type: String },
  email: { type: String },
  phone: { type: String },
}, { collection: 'gatewaysResponce' });

module.exports.Subscriber = mongoose.model('subscriber', userSchema);
module.exports.Mentor = mongoose.model('mentors', mentorSchema);
module.exports.SubscriberPlan = mongoose.model('subscriberplan', subscriberPlanSchema);
module.exports.SubscribePlan = mongoose.model('subscribeplan', subscribePlanSchema);
module.exports.SubscribeMentor = mongoose.model('subscribementors', subscribeMentorSchema);
module.exports.Signal = mongoose.model('Signal', mentorSignalSchema);
module.exports.gatewaysResponce = mongoose.model('gatewaysResponce', gatewaysResponceSchema);



module.exports.anyt = mongoose.model('anyt');
