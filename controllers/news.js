const fs = require('fs');
// var os = require("os");
const https = require('https');
const http = require('http');
const HTML = require('html-parse-stringify')
const DomParser = require('dom-parser');


exports.getnews=(req, res, next) => {
    var qr=req.query;
    console.log('m:',qr.d);
    if(qr.name==undefined){
        res
        .status(200)
        .json({msg:'name=Stocks/FX/Commodity/Bonds'});
        return null;
    }
  let result=  (async (url) => {
        let a = await getScript(url);
        var parser = new DomParser();
        var dom = parser.parseFromString(a);
        let el = dom.getElementsByClassName('FL rightCont')[0];
        let el1 = dom.getElementById(qr.name);
        let d = HTML.parse(el1.innerHTML);
        let resp=[]; 
        let dataRow=d[0].children[2].children;

        for(let i=0;i<dataRow.length;i++){
            let cd=dataRow[i]
            let response={

                Name:'',
                Actual:'',
                Chg:'',
                PChg:''
            }
            try{response.Name =dataRow[i].children[1].children[1].children[0].content;}catch(e){}
            try{response.Actual =dataRow[i].children[2].children[0].content;}catch(e){}
            try{response.Chg =dataRow[i].children[3].children[2].content}catch(e){}
            try{response.PChg =dataRow[i].children[4].children[0].content;;}catch(e){}

                resp.push(response);

        }
        // console.log('>>>resp:',resp);
        res
        .status(200)
        .json({data:resp,msg:'name=Stocks/FX/Commodity/Bonds'});
    //    resolve(resp);
    })('https://tradingeconomics.com/calendar');
}
// exports.getnews = class {

//     constructor() { console.log('News Controller Constructed....');  }


//     async getnews(req, mod) {
// 		let err = mod.validate(mod.params, ['op'], mod.method.GET);
//         let p = mod.params;
//         return new Promise(resolve => {
//             const getScript = (url) => {
//                 return new Promise((resolve, reject) => {
//                     const http = require('http'),
//                         https = require('https');

//                     let client = http;

//                     if (url.toString().indexOf("https") === 0) {
//                         client = https;
//                     }

//                     client.get(url, (resp) => {
//                         let data = '';

//                         // A chunk of data has been recieved.
//                         resp.on('data', (chunk) => {
//                             data += chunk;
//                         });

//                         // The whole response has been received. Print out the result.
//                         resp.on('end', () => {
//                             resolve(data);
//                         });

//                     }).on("error", (err) => {
//                         reject(err);
//                     });
//                 });
//             };

//             (async (url) => {
//                 let a = await getScript(url);
//                 // let p = HTML.parse(a);
//                 var parser = new DomParser();
//                 var dom = parser.parseFromString(a);
//                 let el = dom.getElementsByClassName('FL rightCont')[0];
//                 // let el1 = el.getElementsByClassName('MT15');
//                 let el1 = dom.getElementById('Stocks');
//                 // let el1 = dom.getElementsByTagName('table');
//                 let d = HTML.parse(el1.innerHTML);
//                 let resp=[];
//                 // console.log(">>>dom",dom)
//                 // console.log(">>>",el1)
//                 // console.log(">>>d.children:",d.children)
//                 console.log(">>>d[0].children[2]:",d[0].children[2].children)
//                 // resp.push(el1);
//                 // resolve(d[0].children[2].children);
//                 let dataRow=d[0].children[2].children;

//                 for(let i=0;i<dataRow.length;i++){
//                     let cd=dataRow[i]
//                     let response={

//                         Name:'',
//                         Actual:'',
//                         Chg:'',
//                         PChg:''
//                     }
//                     try{response.Name =dataRow[i].children[1].children[1].children[0].content;}catch(e){}
//                     try{response.Actual =dataRow[i].children[2].children[0].content;}catch(e){}
//                     try{response.Chg =dataRow[i].children[3].children[2].content}catch(e){}
//                     try{response.PChg =dataRow[i].children[4].children[0].content;;}catch(e){}

//                         resp.push(response);

//                 }
//                 // for(let i=0;i<el1.length;i++){
//                 //     let d = HTML.parse(el1[i].innerHTML);
//                 //     let response={
//                 // //         link:'',
//                 // //         image:'',
//                 // //         content:'',
//                 // //         title:'',
//                 //         data:'f'+d.children
//                 //     };
//                 // //     try{response.link ='https://tradingeconomics.com/calendar'+ d[0].children[0].attrs.href;}catch(e){}
//                 // //     try{response.title = d[0].children[0].attrs.title;}catch(e){}
//                 // //     try{response.image = d[0].children[0].children[0].attrs['data-original'];}catch(e){ console.log('Err',e)}
//                 // //     try{response.content = d[1].children[3].children[0].content;}catch(e){ console.log('Err',e)}
//                 // //     if(response.title!=''){
//                 //         resp.push(response);
//                 // //     }
//                 // }
//                 resolve(resp);
//             })('https://tradingeconomics.com/calendar');
//         })

//     }
//     async get1(req, mod) {
// 		let err = mod.validate(mod.params, ['op'], mod.method.GET);
//         let p = mod.params;
//         return new Promise(resolve => {
//             const getScript = (url) => {
//                 return new Promise((resolve, reject) => {
//                     const http = require('http'),
//                         https = require('https');

//                     let client = http;

//                     if (url.toString().indexOf("https") === 0) {
//                         client = https;
//                     }

//                     client.get(url, (resp) => {
//                         let data = '';

//                         // A chunk of data has been recieved.
//                         resp.on('data', (chunk) => {
//                             data += chunk;
//                         });

//                         // The whole response has been received. Print out the result.
//                         resp.on('end', () => {
//                             resolve(data);
//                         });

//                     }).on("error", (err) => {
//                         reject(err);
//                     });
//                 });
//             };

//             (async (url) => {
//                 let a = await getScript(url);
//                 // let p = HTML.parse(a);
//                 var parser = new DomParser();
//                 var dom = parser.parseFromString(a);
//                 let el = dom.getElementsByClassName('FL rightCont')[0];
//                 // let el1 = el.getElementsByClassName('MT15');
//                 let el1 = dom.getElementById('Stocks');
//                 // let el1 = dom.getElementsByTagName('table');
//                 let d = HTML.parse(el1.innerHTML);
//                 let resp=[];
//                 // console.log(">>>dom",dom)
//                 // console.log(">>>",el1)
//                 // console.log(">>>d.children:",d.children)
//                 console.log(">>>d[0].children[2]:",d[0].children[2].children)
//                 // resp.push(el1);
//                 // resolve(d[0].children[2].children);
//                 let dataRow=d[0].children[2].children;

//                 for(let i=0;i<dataRow.length;i++){
//                     let cd=dataRow[i]
//                     let response={

//                         Name:'',
//                         Actual:'',
//                         Chg:'',
//                         PChg:''
//                     }
//                     try{response.Name =dataRow[i].children[1].children[1].children[0].content;}catch(e){}
//                     try{response.Actual =dataRow[i].children[2].children[0].content;}catch(e){}
//                     try{response.Chg =dataRow[i].children[3].children[2].content}catch(e){}
//                     try{response.PChg =dataRow[i].children[4].children[0].content;;}catch(e){}

//                         resp.push(response);

//                 }
//                 // for(let i=0;i<el1.length;i++){
//                 //     let d = HTML.parse(el1[i].innerHTML);
//                 //     let response={
//                 // //         link:'',
//                 // //         image:'',
//                 // //         content:'',
//                 // //         title:'',
//                 //         data:'f'+d.children
//                 //     };
//                 // //     try{response.link ='https://tradingeconomics.com/calendar'+ d[0].children[0].attrs.href;}catch(e){}
//                 // //     try{response.title = d[0].children[0].attrs.title;}catch(e){}
//                 // //     try{response.image = d[0].children[0].children[0].attrs['data-original'];}catch(e){ console.log('Err',e)}
//                 // //     try{response.content = d[1].children[3].children[0].content;}catch(e){ console.log('Err',e)}
//                 // //     if(response.title!=''){
//                 //         resp.push(response);
//                 // //     }
//                 // }
//                 resolve(resp);
//             })('https://tradingeconomics.com/calendar');
//         })

//     }
// }
