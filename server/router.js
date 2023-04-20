const Router = require('koa-router');
const controller = require('./controllers/BU.controller');

const router = new Router();

// GETS
router.get('/board-ups', controller.showall);
// POSTS
router.post('/board-ups', controller.postBU); //BU = Board-Up

module.exports = router;