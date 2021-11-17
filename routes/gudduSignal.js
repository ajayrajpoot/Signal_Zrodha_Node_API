const express = require('express');
const router = express.Router();
 
const tabletojson = require('tabletojson').Tabletojson;

router.get("/economy-calendar",(req , res) =>{

  let queryParm = req.query.DateRange

  tabletojson.convertUrl(
    'https://www.fxempire.com/tools/economic-calendar?date-range='+queryParm+'&timezone=Asia%2FCalcutta',
    // 'https://www.fxempire.com/tools/economic-calendar?date-range=next-month&timezone=asia%2Fcalcutta',
    // 'https://www.fxempire.com/tools/economic-calendar?date-range=next-day&timezone=asia%2Fcalcutta',
    // 'https://www.fxempire.com/tools/economic-calendar?date-range=current-day&timezone=Asia%2FCalcutta',
    function(tablesAsJson) {
      res.send({
        status:true,
        data:tablesAsJson
      });
    }
);

})

router.get("/economy-calendar/ByDate",(req , res) =>{

  let queryParm = req.query.DayRange

  tabletojson.convertUrl(
    'https://www.fxempire.com/tools/economic-calendar?date-from='+queryParm+'&date-to='+queryParm+'&timezone=asia%2Fcalcutta',
    function(tablesAsJson) {
      res.send({
        status:true,
        data:tablesAsJson
      });
    }
);

})

router.get("/forex/",(req , res) =>{

  tabletojson.convertUrl(
    'https://tradingeconomics.com/currencies',
    function(tablesAsJson) {
      res.send({
        status:true,
        data:tablesAsJson[0]
      });
    }
);

})

router.get("/allForexSignal/",(req , res) =>{
  
  tabletojson.convertUrl(
    'https://tradingeconomics.com/currencies',
    function(tablesAsJson) {
        // console.log(tablesAsJson[1]);
        res.send({
          status:true,
          data:tablesAsJson
        });
    }
);

})

router.get("/testing/",(req , res) =>{
  
  tabletojson.convertUrl(
    'https://tradingeconomics.com/calendar#',
    function(tablesAsJson) {
        // console.log(tablesAsJson[1]);
        res.send({
          status:true,
          data:tablesAsJson
        });
    }
);

})


// app.use('/trading',router);

module.exports=router;