const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 첫번째 객체 인수는 테이블 필드에 대한 설정
        userId: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true, // *고유값이므로 unique로 추가
        },
        birthdate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        photoUrl: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: "no-photo.jpg", // *사진첨부를 안할 경우 디폴트경로 설정
        },
        profileMessage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        // 두번째 객체 인수는 테이블 자체에 대한 설정
        sequelize /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */,
        timestamps: true /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */,
        underscored: false /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */,
        modelName: "User" /* 모델 이름을 설정. */,
        tableName: "users" /* 데이터베이스의 테이블 이름. */,
        paranoid: true /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */,
        charset: "utf8" /* 인코딩 */,
        collate: "utf8_general_ci",
      }
    );
  }

  // 다른 모델과의 관계
  static associate(db) {
    // 인자로 index.js에서 만든 여러 테이블이 저장되어있는 db객체를 받을 것이다.

    db.User.hasMany(db.Post);
    db.User.hasMany(db.AttendList);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Friend, { foreignKey: "reqUserId", sourceKey: "id" }); // 이런식의 표현이 되는 지 모르겠네요?
    db.User.hasMany(db.Friend, { foreignKey: "resUserId", sourceKey: "id" });
  }
}

module.exports = User;
