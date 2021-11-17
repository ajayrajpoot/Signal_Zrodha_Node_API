
const Subscriber = require('../models/test').Subscriber;
const Mentor = require('../models/test').Mentor;
const SubscriberPlan = require('../models/test').SubscriberPlan;
const SubscribePlan = require('../models/test').SubscribePlan;
const Signal = require('../models/test').Signal;
const SubscribeMentor = require('../models/test').SubscribeMentor;
const gatewaysResponce = require('../models/test').gatewaysResponce;
const anyt = require('../models/test').anyt;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const moment = require('moment');

exports.signup = (req, res, next) => {

  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var phone = req.body.phone;

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const subscriber = new Subscriber({
        email: email,
        password: hashedPw,
        name: name,
        phone: phone,
        status: 1
      });
      return subscriber.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id, Result: true });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

}
exports.addsubscriber = (req, res, next) => {

  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;



  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const subscriber = new Subscriber({
        email: email,
        password: hashedPw,
        name: name,
        status: 0
      });
      return subscriber.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result.id, Result: true });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });


  // subscriber.save()
  // .then(result => {
  //   res.status(201).json({ message: 'User created!', userId: result._id });
  // })
  // .catch(err => {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });

  // res.write("fgd");
  // res.end();
}
exports.updatesubscriber = (req, res, next) => {
  Subscriber.updateOne({ _id: req.body.id }, req.body)
    .then(result => {
      if (result.ok == 1) {
        res.status(201).json({ Message: 'User Updated!', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Note User Updated!', response: result, Result: false });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });


}

exports.addmentor = (req, res, next) => {

  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;

  // const mentor = new Mentor({
  //   email: email,
  //   password: password,
  //   name: name,
  //   status: 0
  // });
  // mentor.save()
  //   .then(result => {
  //     if (result.ok == 1) {
  //     } else {
  //     }
  //     res.status(201).json({ message: 'Mentor created!', menotr: result });
  //   })

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const mentor = new Mentor({
        email: email,
        password: hashedPw,
        name: name,
        status: 0
      });
      return mentor.save();
    })
    .then(result => {
      res.status(201).json({ message: 'Mentor created!', userId: result._id, Result: true });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  // res.write("fgd");
  // res.end();
}

exports.deleteMentor = (req, res, next) => {


  Mentor.deleteOne({ _id: req.query._id })
    .then(result => {
      if (result.ok == 1) {
        res.status(201).json({ Message: 'Mentor Remove!', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Note Mentor Remove!', response: result, Result: false });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

}
exports.updateMentor = (req, res, next) => {


  Mentor.updateOne({ _id: req.body.id }, req.body)
    .then(result => {
      if (result.ok == 1) {
        res.status(201).json({ Message: 'Mentor Updated!', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Note Mentor Updated!', response: result, Result: false });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

}
exports.getallMentor = (req, res, next) => {
  let loadedUser;
  Mentor.find()
    // .select({ "name": 1, "email": 1,_id:1})
    .then(Mentor => {
      res.status(200).json({ mentor: Mentor });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.query.email;
  const password = req.query.password;
  let loadedUser;
  Subscriber.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.status(200).json({ Message: 'A user with this email(' + email + ') could not be found.', Result: false });
        // const error = new Error('A user with this email(' + email + ') could not be found.');
        // error.statusCode = 401;
        // throw error;
      }
      loadedUser = user;
      console.log("user", user)
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      console.log("isEqual", isEqual)
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 200;
        res.status(200).json({ Message: "'Wrong password!'", Result: false });
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()

        },
        // 'somesupersecretsecret',
        'asas',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token, userId: loadedUser._id.toString(), Result: true,
        cdata: {
          email: loadedUser.email,
          // password:loadedUser.password,
          _id: loadedUser._id,
          name: loadedUser.name,
          phone: loadedUser.phone,
          address: loadedUser.address,
          status: loadedUser.status,
          plans: loadedUser.plans,
        }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getallsubscriber = (req, res, next) => {
  let loadedUser;
  Subscriber.find()
    .then(user => {
      loadedUser = user;
      res.status(200).json({ users: loadedUser });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.loginMentor = (req, res, next) => {
  const email = req.query.email;
  const password = req.query.password;
  let loadedUser;
  Mentor.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.status(200).json({ Message: 'A user with this email(' + email + ') could not be found.', Result: false });
        // const error = new Error('A user with this email(' + email + ') could not be found.');
        // error.statusCode = 401;
        // throw error;
      }
      loadedUser = user;
      console.log("user", user)
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 200;
        res.status(200).json({ Message: "'Wrong password!'", Result: false });

        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()

        },
        // 'somesupersecretsecret',
        'asas',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token, userId: loadedUser._id.toString(), Result: true,
        cdata: {
          email: loadedUser.email,
          // password:loadedUser.password,
          _id: loadedUser._id,
          name: loadedUser.name,
          phone: loadedUser.phone,
          address: loadedUser.address,
          status: loadedUser.status,
          plans: loadedUser.plans,
        }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addPlan = (req, res, next) => {
  console.log("dfdf", req.body)
  var subscriberPlan = new SubscriberPlan(req.body);

  subscriberPlan.save()
    .then(result => {
      if (result._id) {
        res.status(201).json({ Message: 'Plan created!', response: result, Result: true });

      } else {
        res.status(201).json({ Message: 'Plan Not created!', response: result, Result: false });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        // err.statusCode = 500;
        res.status(201).json({ response: err, Message: err.message, Result: false });

      }
      next(err);
    });


}
exports.updatePlan = (req, res, next) => {
  SubscriberPlan
    .updateOne({ _id: req.body.id }, req.body)
    .then(result => {
      if (result.ok == 1) {
        res.status(201).json({ Message: 'Plan Updated!', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Note Plan Updated!', response: result, Result: false });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
exports.getPlan = (req, res, next) => {
  console.log(">>>", req.query.MentorId);
  var id = req.query.MentorId;
  var con = {};
  if (id == 0) {
    con = {};
  } else {
    con = { MentorId: id };
  }

  console.log(">>|>", con);
  SubscriberPlan.find(con).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })

}

exports.deletePlan = (req, res, next) => {
  console.log("dfdf", req.body);
  SubscriberPlan.deleteOne({ _id: req.query._id })
    .then(result => {
      if (result.deletedCount == 1) {
        res.status(201).json({ Message: 'Delete Plan !', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Fail to Delete Plan !', response: result, Result: false });
      }
    }).catch(err => {
      res.status(200).send({ Message: err.message, Result: false, data: err });
    })

}
exports.subscribeSubscribedPlan = (req, res, next) => {


  SubscribePlan.find({ subscriberId: req.query.subscriberId })
  SubscribePlan.aggregate([
    { $match: { subscriberId: req.query.subscriberId } },
    // { "$addFields": { "subscriberId0": { "$toString": "$_id" } } },
    { "$addFields": { "planId": { "$toObjectId": "$planId" } } },
    {
      "$lookup": {
        "from": "subscriberplan",
        "localField": "planId",
        "foreignField": "_id",
        "as": "plan"
      }
    },
    { $unwind: "$plan" }
  ])
    .then(myPlan => {
      res.send({ myplans: myPlan });
    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })

}
exports.subscribePlan = (req, res, next) => {


  var durationType = req.body.durationType;
  var duration = req.body.duration;


  var sDate = moment();
  var eDate = "";

  // 1">Day
  if (durationType == "1") {
    eDate = moment(sDate, "DD-MM-YYYY").add('days', duration);
  } // 2">Week
  else if (durationType == "2") {
    eDate = moment(sDate, "DD-MM-YYYY").add('week', duration);
  } // 3">Month
  else if (durationType == "3") {
    eDate = moment(sDate, "DD-MM-YYYY").add('month', duration);
  } // 4">Year
  else if (durationType == "4") {
    eDate = moment(sDate, "DD-MM-YYYY").add('year', duration);
  }


  var pp = {
    duration: req.body.duration,
    durationType: req.body.durationType,
    expiery: eDate,
    planId: req.body.planId,
    sDate: sDate,
    status: req.body.status,
    price: req.body.price,
    subscriberId: req.body.subscriberId
  };
  var subsribePlan = new SubscribePlan(pp);


  SubscribePlan.findOne({ planId: req.body.planId, subscriberId: req.body.subscriberId })
    .then(sPlan => {
      if (sPlan == null) {
        subsribePlan.save().then(data => {
          res.send({ Message: "SubsribePlan", Result: true, subscribePlanId: data._id, data: data });

        }).catch(err => {
          res.status(500).send({ Message: err.message, Result: false, data: data });
        })
      } else {
        res.send({ Message: "Already SubsribePlan", Result: false, data: sPlan });
      }
    }).catch(err => {
      // res.status(500).send({     status: false,        data: err
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })
  // })
  // var subscribePlan = new SubscribePlan(req.body);
  // subscribePlan.save().then(result => {
  //   res.status(200).json({ SubdcribePlanId: result._id, Message: "Plan Subscribed  " })
  // }).catch(error => {
  //   if (!error.statusCode) {
  //     error.statusCode = 500;
  //   }
  //   next(error);
  // })


}
exports.updatesubscribePlan = (req, res, next) => {
  console.log("dfdf", req.body)
  var ppp = {
    "subscriberId": "5fdb1b4890d271394844e20a",
    "planId": "5fdb2d3b4f0e1f26bcbd9b88",
    "durationType": "M",
    "duration": "1",
    "sDate": "20-11-2020",
    "expiery": "20-11-2021",
    "status": "1"
  }
  let id = req.body.subscriberId;
  console.log(">>>>", req.body);
  Subscriber.findOneAndUpdate({ _id: id }, { $set: { plans: req.body } }, { new: true })
    // Subscriber.update(   { _id :id }, { $push: {"plans": req.body }}) 
    .then(subcriber => {
      res.send(
        { status: true, data: subcriber }
      )
    }).catch(err => {
      res.status(500).send({
        status: false,
        data: err
      })
    })
  // var subscribePlan = new SubscribePlan(req.body);
  // subscribePlan.save().then(result => {
  //   res.status(200).json({ SubdcribePlanId: result._id, Message: "Plan Subscribed  " })
  // }).catch(error => {
  //   if (!error.statusCode) {
  //     error.statusCode = 500;
  //   }
  //   next(error);
  // })


}
exports.unsubscribeSubscribedPlan = (req, res, next) => {
  console.log("dfdf", req.body)
  var ppp = {
    "subscriberId": "5fdb1b4890d271394844e20a",
    "planId": "5fdb2d3b4f0e1f26bcbd9b88",
    "durationType": "M",
    "duration": "1",
    "sDate": "20-11-2020",
    "expiery": "20-11-2021",
    "status": "1"
  }


  SubscribePlan.deleteOne({ _id: req.query._id })
    .then(result => {
      if (result.deletedCount == 1) {
        res.status(201).json({ Message: 'Plan Unsubscribe!', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Not Plan Unsubscribe!', response: result, Result: false });
      }
    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })

}

exports.getSubscriberProfile = (req, res, next) => {
  console.log("getSubscriberProfile")
  Subscriber.aggregate([
    { "$addFields": { "subscriberId0": { "$toString": "$_id" } } },
    // { "$addFields": { "_id":  { "$toString": "$_id" } } },
    {
      "$lookup": {
        "from": "subscribeplans",
        "localField": "subscriberId",
        "foreignField": "subscriberId0",
        "as": "palnes"
      }
    }
  ])
    .then(result => {
      res.status(200).json(result);

    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}
exports.getMentorPlans = (req, res, next) => {
  SubscriberPlan.find({ MentorId: req.query.MentorId }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })

}
exports.addSignal = (req, res, next) => {
  var sDate = moment();
  var p = req.body;
  p.crated_on = sDate;
  p.expier_on = moment(sDate, "DD-MM-YYYY").add('days', 1);
  var signal = new Signal(req.body);
  signal.save().then(result => {

    if (result._id) {
      res.status(201).json({ Message: 'Signal Broadcast ! ', response: result, Result: true });

    } else {
      res.status(201).json({ Message: 'Signal Broadcast !', response: result, Result: false });
    }
    // res.status(200).json({ SignalId: result._id, Message: "" })
  }).catch(error => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  })
}

exports.updateSignal = (req, res, next) => {
  Signal.updateOne({ _id: req.body.id }, req.body)
    .then(result => {
      if (result.ok == 1) {
        res.status(201).json({ Message: ' Updated Sognal !', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Not  Updated Signal !', response: result, Result: false });
      }
    })
    .catch(err => {
      // if (!err.statusCode) {
      //   err.statusCode = 500;
      // }
      res.status(500).send({ Message: err.message, Result: false, data: err });

      // next(err);
    });
}
exports.getSignal = (req, res, next) => {
  var id = req.query.MentorId;
  var con = {};
  if (id == 0) {
    con = {};
  } else {
    con = { mentorId: id };
  }

  Signal
    // .find(con)
    .aggregate([
      { "$addFields": { "package_id1": { "$toObjectId": "$package_id" } } },
      { "$match": con },
      {
        "$lookup": {
          "from": "subscriberplan",
          "foreignField": "_id",
          "localField": "package_id1",
          "as": "plan"
        }
      },
      { "$unwind": "$plan" }

      // { "$project": { "subscriberId": 1, "mentorId": 1, "mentor": { name: 1, email: 1, status: 1 } } }
    ])
    .then(result => {
      res.status(200).json(result);
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })

}

exports.getBuyedPlanSignal = (req, res, next) => {
  var subscriberId = req.query.subscriberId;
  var toDate = moment();
  SubscribePlan.aggregate([
    // { $match: { "subscriberId": subscriberId ,"expiery":{ $lte: toDate } } },
    { $match: { "subscriberId": subscriberId } },

    { "$addFields": { "planId1": { "$toString": "$planId" } } },
    { "$addFields": { "planIdObj1": { "$toObjectId": "$planId" } } },
    {
      "$lookup": {
        "from": "Signal",
        // "let": { "planId0": "$package_id", "mentorId": "$mentorId" },
        "let": { "planId0": "$planId" },//privous collection
        "pipeline": [
          { "$match": { "$expr": { "$eq": ["$package_id", "$$planId0"] } } },
          {
            "$lookup": {
              "from": "mentors",
              "let": { "mentorId0": { "$toObjectId": "$mentorId" } }, //privous collection
              "pipeline": [
                { "$match": { "$expr": { "$eq": ["$_id", "$$mentorId0"] } } }
              ],
              "as": "mentorDetail",
            }
          },
          { "$unwind": "$mentorDetail" }
        ],
        "as": "signal",
      }
    },
    { "$unwind": "$signal" },
    {
      "$lookup": {
        "from": "subscriberplan",
        "foreignField": "_id",
        "localField": "planIdObj1",
        "as": "plan"
      }
    },
    { "$unwind": "$plan" }

  ])

    .then(mySignal => {

      res.send({ myPlamSignals: mySignal, toDate: toDate });
    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })

}
exports.getSubscrivedMentorSignal = (req, res, next) => {
  var subscriberId = req.query.subscriberId;
  var toDate = moment();


  Signal
    // .find({ subscriberId: req.query.subscriberId })
    .aggregate([
      { "$addFields": { "mentorId0": { "$toString": "$mentorId" } } },
      { "$addFields": { "mentorIdObj": { "$toObjectId": "$mentorId" } } },
      { "$addFields": { "planIdObj1": { "$toObjectId": "$package_id" } } },
      // { "$match": {"subscriberId": subscriberId } },
      {
        "$lookup": {
          "from": "subscribementors",
          "localField": "mentorId0",
          "foreignField": "mentorId",
          "as": "mentor"
        },
      },
      {
        $match: {
          //  "mentorId": "5fdb1f7b807d6916186428bf",
          "mentor.subscriberId": subscriberId
          //  "mentor.mentorId": "5fdb1f7b807d6916186428bf"
          // }
          // "subscriberId": "5fdb1b4890d271394844e20a"
          // "mentor":[{"subscriberId":subscriberId}]
        }
      },
      {
        "$lookup": {
          "from": "mentors",
          "foreignField": "_id",
          "localField": "mentorIdObj",
          "as": "mentorDetail"
        }
      }, {
        "$lookup": {
          "from": "subscriberplan",
          "foreignField": "_id",
          "localField": "planIdObj1",
          "as": "plan"
        }
      },
      { "$unwind": "$plan" }
      // { "$project":{$cond:{"mentor":{"subscriberId":subscriberId}}} }

      // {"$project":{"subscriberId":1,"mentorId":1,"mentor":{name:1,email:1,status:1}}}
    ])
    .then(mySignal => {

      res.send({ mySignal: mySignal });
    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })

}
exports.deleteSignal = (req, res, next) => {
  console.log("dfdf", req.body)


  Signal.deleteOne({ _id: req.query._id })
    .then(result => {
      if (result.deletedCount == 1) {
        res.status(201).json({ Message: 'Delete Signal !', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Fail to Delete Signal !', response: result, Result: false });
      }
    }).catch(err => {
      res.status(200).send({ Message: err.message, Result: false, data: err });
    })

}

exports.getAllMentorsPlans = (req, res, next) => {
  const MentorId = req.query.MentorId;
  let loadedUser;

  //   WorksnapsTimeEntry.find().populate({
  //     "path": "student",
  //     "match": { "status": "student" }
  // }).exec(function(err,entries) {
  //    // Now client side filter un-matched results
  //    entries = entries.filter(function(entry) {
  //        return entry.student != null;
  //    });
  //    // Anything not populated by the query condition is now removed
  // });
  var con = {};
  if (MentorId == 0) {
    con = {};
  } else {
    con = { "_id1": MentorId };
  }
  Subscriber
    .aggregate([
      // { "$sort": { "_id": 1 ,"name":1 } },
      { "$addFields": { "subscriberId": { "$toString": "$_id" } } },
      { "$match": con },
      // {
      //   "$project": {
      //     "_id": {
      //       "$toString": "$_id"
      //     }
      //   }
      // },
      {
        "$lookup": {
          "from": "subscriberplan",
          "localField": "subscriberId",
          // "localField": "MentorId",
          // "foreignField": "_id",
          "foreignField": "subscriberId",
          "as": "plan"
        }
      },
      { $unwind: '$plan' }
    ])

    // .populate({
    //       "path": "SubscriberPlan",
    //       "match": { "_id": "MentorId" }
    //   }).exec(function(err,entries) {
    //     res.status(200).json({ token: 321656546441132, mentor: entries });
    //   })
    .then(user => {
      //   if (!user) {
      //     const error = new Error('Mentor Not Found.');
      //     error.statusCode = 401;
      //     throw error;
      //   }
      loadedUser = user;
      //   return password == user.password;
      // })
      // .then(isEqual => {
      //   if (!isEqual) {
      //     const error = new Error('Wrong password!');
      //     error.statusCode = 401;
      //     throw error;
      //   } 
      res.status(200).json({ token: 321656546441132, mentor: loadedUser });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getAllMentorsSubscribersPlans = (req, res, next) => {
  const MentorId = req.query.MentorId;
  let loadedUser;
  var con = {};

  Mentor
    .aggregate([
      { "$addFields": { "mentorId": { "$toString": "$_id" } } },
      {
        "$lookup": {
          "from": "subscriberplans",
          "localField": "MentorId",
          "foreignField": "mentorId",
          "as": "palns"
        }
      },
    ])

    .then(user => {
      loadedUser = user;
      res.status(200).json({ token: 321656546441132, mentor: loadedUser });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.mySubscribeMentor = (req, res, next) => {
  SubscribeMentor
    // .find({ subscriberId: req.query.subscriberId })
    .aggregate([
      { "$addFields": { "mentorId": { "$toObjectId": "$mentorId" } } },
      { "$match": { "subscriberId": req.query.subscriberId } },
      {
        "$lookup": {
          "from": "mentors",
          "foreignField": "_id",
          "localField": "mentorId",
          "as": "mentor"
        }
      },
      { "$project": { "subscriberId": 1, "mentorId": 1, "mentor": { name: 1, email: 1, status: 1 } } }
    ])
    .then(mymenotrs => {

      res.send({ myMentors: mymenotrs });
    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })

}
exports.subscribeMentor = (req, res, next) => {

  // let id = req.body.subscriberId; 




  var subscribeMentor = new SubscribeMentor(req.body)
  SubscribeMentor.findOne({ mentorId: req.body.mentorId, subscriberId: req.body.subscriberId })
    .then(sPlan => {
      if (sPlan == null) {
        subscribeMentor.save().then(data => {
          res.send({ Message: "Subsribe Mentor", Result: true, data: data });

        }).catch(err => {
          res.status(500).send({ Message: err.message, Result: false, data: data });
        })
      } else {
        res.send({ Message: "Already Subsribe Mentor", Result: false, data: sPlan });
      }
    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })


}
exports.unsubscribeSubscribedMentor = (req, res, next) => {
  console.log("dfdf", req.body);
  SubscribeMentor.deleteOne({ _id: req.query._id })
    .then(result => {
      if (result.deletedCount == 1) {
        res.status(201).json({ Message: 'Mentor Unsubscribe!', response: result, Result: true });
      } else {
        res.status(201).json({ Message: 'Not Mentor Unsubscribe!', response: result, Result: false });
      }
    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })

}
exports.datetest = (req, res, next) => {
  console.log("dfdf", req.body);
  SubscriberPlan
    .find({ expiery: { $gte: new Date("2020-11-24T18:30:00.000Z") } })
    .then(result => {

      res.status(201).json({ Message: 'Mentor Unsubscribe!', response: result, Result: true });

    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })

}
exports.gatewaysResponce = (req, res, next) => {
  console.log("dfdf", req.body);
  var gatewaysResponce = new gatewaysResponce(req.body);
  gatewaysResponce.save()
    .then(result => {

      res.status(201).json({ Message: 'Payed', response: result, Result: true });

    }).catch(err => {
      res.status(500).send({ Message: err.message, Result: false, data: err });
    })

}


exports.anytAdd = (req, res, next) => {
  console.log(">>>ADDDD")
  var Anyt = new anyt(req.body);

  Anyt.save().then(data=>{
    res.statusCode(202).json({ data: data })
  });
}

exports.updateanyt = (req, res, next) => { 
  console.log(">>>update")

  anyt.update({}, {}).then(data => {
    res.statusCode(202).json({ data: data })
  })
}

exports.getAnyt=(req,res,next)=>{
  console.log(">>>grt")

  anyt.find().then(data=>{
    res.statusCode(202).json({ data: data })

  })
}