var Commodity = require('../model/commodity');

module.exports = function(app){
	app.get('/home',function(req,res){
		if(req.session.user){
			Commodity.find({},function(error,docs){
				res.render('home',{Commoditys:docs})
			});
		}else{
			req.session.error = '请先登录';
			res.redirect('/login');
		}
	});
	
	app.get('/addcommodity',function(req,res){
		res.render('addcommodity');
	});
	
	app.post('/addcommodity',function(req,res){
		Commodity.create({
			name:req.body.name,
			price:req.body.price,
			imgSrc:req.body.imgSrc
		},function(error,doc){
			if(doc){
				res.send(200);
			}else{
				res.send(404);
			}
		});
	});
	
	
}