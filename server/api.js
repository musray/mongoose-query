'use strict';
const
  express = require('express'),
  _ = require('underscore'),
  after = require('after'),
  async = require('async'),
  status = require('http-status');

module.exports = function(wagner) {
  var api = express.Router();

  var routeUrl = '/guidance/related-to/index/:index';
  api.get(routeUrl, wagner.invoke(function(Doc) {
    return function(req, res) {

      var relatedTo = [];
      var targetDoc = [];
      // var cb = after(relatedTo.length, function() {
      //   res.json({targetDoc: targetDoc});
      // })
      function firstQuery (index) {
        var query = Doc.find( { index: index }, {_id: 0, title: 1, rev: 1, relationship: 1});
          // , function(err, doc) 
          // {
          // // console.log(req.param.index);
          // if (err) {
          //   return res.
          //     status(status.INTERNAL_SERVER_ERROR).
          //     json({ error: err.toString() });
          // }
          // if (!doc) {
          //   return res.
          //     status(status.NOT_FOUND).
          //     json({ error: 'Not Found' });
          // }

          // var relatedDocs = doc[0] ? doc[0]._doc.relationship : [];
          // // console.log({ innerRelatedTo: relatedTo });
        // });
          // var relatedDocs = query[0] ? query[0]._doc.relationship : [];
        return query;
      }


      async.series([
        // the first task ==========================
        function(cb) {
          var queryObj = firstQuery(req.params.index);
          console.log({ queryObj: queryObj });
          cb(null, 'one');
        }

        // the second task ==========================
        , function(cb) {

            var afterNTimes = after(relatedTo.length, function () {
              res.json({targetDoc: targetDoc});
            })

            console.log({secondRelatedTo: relatedTo});
            relatedTo.forEach(function(t) {
              console.log({t: t});
              Doc.find({ index: t }
                , {_id: 0, title: 1, rev: 1}
                , function (related_doc) {
                    // console.log(related_doc);
                    if (related_doc) {
                      targetDoc.push(related_doc[0]._doc);
                    } else {
                      var notFound = {};
                      notFound[t] = '无此文件的记录';
                      targetDoc.push(notFound);
                    }
                    afterNTimes();
                    console.log({ targetDoc: targetDoc });
              });
            });
            cb(null, 'two');
        } 

      ], function(err) {
        if (err) {
          console.log('error happend');
          res.send('Oops! I can\'t work very well.');
        }
        console.log('User\'s happy', targetDoc);
      });
    };
  }));

  return api;
};

