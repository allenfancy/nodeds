var User = require('../model/user');

// JDBC Replication Driver
module.exports = function(app){
	app.get('/register',function(req,res){
		res.render('register');
	});
	
	app.post('/register',function(req,res){
		var name = req.body.uname;
		User.findOne({name:name},function(error,doc){
			if(error){
				res.send(500);
				req.session.error = '网络异常错误!';
			}else if(doc){
				req.session.error = '用户名已经存在!';
				res.send(500);
			}else{
				var newUser = new User({
					name:name,
					password:req.body.upwd
				});
				User.create(newUser,function(error,doc){
					if(error){
						res.send(500);
					}else{
						req.session.error = '用户创建成功';
						res.send(200);
					}
				});
			}
		});
	});
};