// 시퀄라이즈 선언
const Sequelize = require('sequelize');

// 앱 환경 설정
const env = process.env.NODE_ENV || 'development';
// 환경 별로 설정
const config = require('../config/config')[env];

// 외부 입력 -> 맵핑된 테이블 모델 가져오기
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

// 빈 객체 설정
const db = {};

// 시퀄라이즈 연결 설정
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

// 연결 설정된 시퀄라이즈
db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;


