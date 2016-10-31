/**
 * Created by CAN on 2016/10/22.
 */
var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;