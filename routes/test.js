const express=require('express');
const router=express.Router();
const testController=require('../controllers/test');
const newsController=require('../controllers/news');
const isAuth = require('../middleware/is-auth');
const Subscriber = require('../models/test').Subscriber;
const { body } = require('express-validator/check');



const mql5Routes = require('../routes/mql5'); 
const gudduSignalRoutes = require('../routes/gudduSignal'); 


router.post('/signup',[
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
          console.log(">>>>",value)
        return Subscriber.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
    //   .normalizeEmail(),
    // body('password')
    //   .trim()
    //   .isLength({ min: 5 }),
    // body('name')
    //   .trim()
    //   .not()
    //   .isEmpty()
  ], testController.signup);
router.post('/addsubscriber',isAuth, testController.addsubscriber);
router.post('/updatesubscriber',isAuth, testController.updatesubscriber);
router.get('/getallsubscriber',isAuth, testController.getallsubscriber);

router.get('/login', testController.login);

router.post('/addMentor', isAuth,testController.addmentor); 
router.get('/deleteMentor', isAuth,testController.deleteMentor); 

router.post('/updateMentor',isAuth, testController.updateMentor); 
router.get('/getallMentor', isAuth,testController.getallMentor); 

router.get('/getAllMentorsPlans', testController.getAllMentorsPlans);
router.get('/loginMentor', testController.loginMentor);
router.post('/addPlan',isAuth, testController.addPlan);
router.post('/updatePlan',isAuth, testController.updatePlan);
router.get('/getPlan', testController.getPlan);
router.post('/subscribePlan', isAuth,testController.subscribePlan);
router.get('/subscribeSubscribedPlan', testController.subscribeSubscribedPlan);
router.get('/unsubscribeSubscribedPlan',isAuth, testController.unsubscribeSubscribedPlan);

router.get('/getSubscriberProfile',isAuth, testController.getSubscriberProfile);
router.get('/getAllMentorsSubscribersPlans', testController.getAllMentorsSubscribersPlans);
router.get('/getMentorPlan', testController.getMentorPlans);
router.post('/addSignal', isAuth,testController.addSignal);
router.get('/getSignal', testController.getSignal);
router.get('/getSubscrivedMentorSignal', testController.getSubscrivedMentorSignal);
router.get('/getBuyedPlanSignal', testController.getBuyedPlanSignal);

router.get('/deleteSignal', testController.deleteSignal); 
router.post('/updateSignal', testController.updateSignal); 

router.get('/mySubscribeMentor', testController.mySubscribeMentor); 
router.post('/subscribeMentor', testController.subscribeMentor); 
router.get('/unsubscribeSubscribedMentor', testController.unsubscribeSubscribedMentor); 

router.get('/feed', newsController.getnews); 
router.get('/datetest', testController.datetest); 

router.get('/gatewaysResponce', testController.gatewaysResponce); 

router.use('/mql', mql5Routes);
router.use('/guddu', gudduSignalRoutes);

router.post('/anytAdd', testController.anytAdd);
router.post('/updateanyt', testController.updateanyt);
router.get('/getAnyt', testController.getAnyt);

module.exports=router;
