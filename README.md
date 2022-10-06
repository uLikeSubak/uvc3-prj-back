# metacamp-backend2

메타캠프 백엔드2 - MVC패턴 버전

# 전체 구조
```
.
├── .vscode
│   └── settings.json               # /.vscode/settings.json: VScode사용에 따른 환경 설정 파일
├── bin
│   └── www                         # /bin/www: 앱 실행 파일
├── config
│   └── corsConfig.json             # cors 설정 파일
├── dao                             # DB를 사용하는 sequelize의 쿼리 함수용 폴더
│   ├── departmentDao.js
│   ├── deviceDao.js
│   └── userDao.js
├── lib                             # 자체 제작한 라이브러리 모음 폴더
│   ├── hashUtil.js                 # hash함수용 유틸
│   ├── logger.js                   # 로그처리용 유틸
│   ├── middleware.js               # 미들웨어 함수 모음
│   └── tokenUtil.js                # 토큰 처리용 함수 모음
├── log                             # 로그 폴더
│   └── ...
├── models                          # DB를 모델링하는 sequelize의 모델 함수용 폴더
│   ├── connection.js               # DB연결 처리 함수
│   ├── department.js
│   ├── device.js
│   ├── index.js                    # sequelize를 이용한 DB설정 파일
│   └── user.js
├── node_modules                    # npm install후 생성되는 라이브러리 모음 폴더
│   └── ...
├── public                          # express에서 생성한 정적파일 영역
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── routes                          # Router 폴더
│   ├── auth.js
│   ├── department.js
│   ├── device.js
│   ├── index.js                    # Router 설정 인덱스 파일
│   └── user.js
├── service                         # 비즈니스 로직 폴더
│   ├── departmentService.js
│   ├── deviceService.js
│   └── userService.js
├── views                           # express에서 생성한 프론트용 화면(사용하지 않음)
│   ├── error.ejs
│   └── index.ejs
├── .env                            # (개발용)환경설정 파일(직접 생성)
├── .eslintrc.json                  # eslint 설정 파일
├── .gitignore                      # eslint 설정 파일
├── app.js                          # 앱 실행 메인 파일
├── package-lock.json
├── package.json
└── README.md
```

# 1. 시작

## 개발환경
개발용 PC의 OS는 `windows 10`을 사용 한다.
개발용 디렉토리는 다음과 같다.
`c:\Workspace`
```console
> cd C:\Workspace
```
위 디렉토리로 이동 한다.


## node.js 설치
version: v14.15.4
(nvm을 이용하여 버전관리 할 것. (윈도우용 nvm: [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases) ))

```console
> nvm install 14.15.4 64
> nvm use 14.15.4 64
> nvm list
  * 14.15.4 (Currently using 64-bit executable)
    12.20.0
```

## express 설치
`express-generator`를 이용하여 기본 구조를 생성 한다.
https://expressjs.com/ko/starter/generator.html

(참고로 현재 디렉토리는 `C:\Workspace` 이다)

```console
> npm install express-generator -g
> express --ejs nodeproj
```
(프로젝트 이름을 `nodeproj`로 설정 하였다.)

## npm 패키지 설치
위에 생성된 프로젝트 폴더로 이동 한 후 npm을 이용해서 nodejs패키지들을 설치 한다.

```console
> cd nodeproj
> npm install
```

## nodemon 서비스 실행
소스 스크립트를 수정하면 이를 적용하기 위해서는 `node`서비스를 재시작 시켜야 한다.
매번 개발할때 그렇게 할 수 없으니 자동으로 재시작 해주는 `nodemon`서비스를 설치해서 사용하도록 한다.

### nodemon 설치
```console
> npm install nodemon -g
```
(-g 옵션으로 설치해야 한다.)

### nodemon 적용
다음과 같이 `package.json`파일에 `dev`를 추가하여 `nodemon`을 등록시킨다.
> /package.json
```json
...
"scripts": {
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www"
},
...
```

### nodemon을 통한 node서비스 실행
이제 앞으로 개발할때에는 다음과 같이 `nodemon`을 통해 실행 시키도록 한다.
```console
> npm run dev
```
(**주의!**  실 운영시에는 `npm run start`를 실행 시켜야 한다. nodemon은 테스트용이다.)


## eslint style
코드의 통일성을 위해 eslint style을 맞춰준다.
(eslint강제적용을 위해 VScode의 Extensions에서 **ESLint**를 반드시 설치할 것!!)

### eslint 설치
eslint를 -g 옵션으로 설치해 준다.
```console
> npm install -g eslint
```
### eslint 초기화 세팅
eslint를 다음 설정값을 참고해서 세팅해 보자
코드 스타일은 Airbnb 스타일로 맞추도록 한다.

(겁먹지 말고 차분히 읽어보면서 도전해 보자.. 기껏해야 환경 세팅이다. 망하면 다시할 수 있다.)
```console
> eslint --init
cs.son@DESKTOP-JLQT4EH C:\Workspace\nodeproj
$ eslint --init
√ How would you like to use ESLint? · To check syntax, find problems, and enforce code style
√ What type of modules does your project use? · CommonJS (require/exports)
√ Which framework does your project use? · None of these
√ Does your project use TypeScript? · No
√ Where does your code run? · Node
√ How would you like to define a style for your project? · Use a popular style guide
√ Which style guide do you want to follow? . Airbnb: https://github.com/airbnb/javascript
√ What format do you want your config file to be in? · JSON
Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2
√ Would you like to install them now with npm? · Yes

Installing eslint-config-airbnb-base@latest, eslint@^7.32.0 || ^8.2.0, eslint-plugin-import@^2.25.2
npm WARN notsup Unsupported engine for eslint@8.6.0: wanted: {"node":"^12.22.0 || ^14.17.0 || >=16.0.0"} (current: {"node":"14.15.4","npm":"6.14.10"})
...(중간생략)...
npm WARN notsup Not compatible with your version of node/npm: eslint-visitor-keys@3.1.0

+ eslint-plugin-import@2.25.4
+ eslint@8.6.0
+ eslint-config-airbnb-base@15.0.0
added 61 packages from 27 contributors, updated 1 package and audited 207 packages in 6.615s

33 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Successfully created .eslintrc.json file in C:\Workspace\nodeproj
```

eslint의 설정 파일은 다음과 같다.
> /.eslintrc.json
```json
{
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb-base"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "linebreak-style": 0,
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
  }
}
```
`linebreak-style: 0`설정을 꼭 추가 하도록 한다.  
(그렇지 않으면 **Expected linebreaks to be ‘LF’ but found**에러를 맛보게 됨.)

## VScode 설정
VSCode의 설정은 다음과 같이 생성해 준다.

> /.vscode/settings.json
```json
{
  "eslint.validate": ["javascript", "html"],
  "eslint.alwaysShowStatus": true,
  "editor.tabSize": 2,
  "git.ignoreLimitWarning": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```
(**editor.codeActionsOnSave**를 통해서 eslint를 강제적용/자동변환(AutoFix) 시킬 수 있다.)

## 자동 변환(AutoFix) 처리
express가 자동으로 만들어준 몇가지 js파일을 eslint규칙에 맞도록 자동변환 시켜주자.
다음의 파일을 VScode에서 오픈한 후 저장을 하면 자동 변환이 될 것이다.
##### 자동변환 처리할 파일목록
`/app.js`
`/routes/index.js`
`/routes/users.js`

**주의** `/bin/www`파일은 자동변환 되지 않도록 `eslint-disable` 설정을 하도록 한다.
> /bin/www
```javascript
#!/usr/bin/env node
/* eslint-disable */
...(이하 생략)...
```

## 접속 확인
웹브라우저를 통해 다음의 URL에 접속해 보자.
http://localhost:3000

# 환경설정
다음과 같이 `.env`파일을 통해 환경 설정을 한다. (만들어 두자)

> /.env
```
NODE_ENV=development
PORT=3000
LOGGER_LEVEL=debug
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=metacamp_dev
DB_ID=postgres
DB_PASS=postgres
DB_DIALECT=postgres
```

`NODE_EVN`: nodejs 프로젝트의 실행 환경을 선택 한다. (개발: development, 테스트: test, 운영: production)
`PORT`: node프로젝트의 실행 포트를 설정 한다.
`LOGGER_LEVEL`: 로깅레벨을 선택 한다. (개발: debug, 운영: info)
`DB_*`: 데이터베이스 관련 세팅


# 라이브러리 설치
필수적인 라이브러리들을 다음과 같이 설치해서 사용하도록 한다.

## dotenv
`.env`파일을 사용하기 위해 `dotenv` 라이브러리를 설치한다.

### dotenv 설치
```console
> npm install dotenv --save
```

### dotenv 사용
`.env`환경을 사용하려면 다음과 같이 사용할 수 있다.
```javascript
const dotenv = require('dotenv');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
```


## bodyparser

### bodyparser 설치
```console
> npm install body-parser --save
```

### bodyparser 설정
> /app.js
```javascript
...
const logger = require('morgan');
const bodyParser = require('body-parser');

...(중간생략)...
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
...
```
(적당히 위와 같은 위치에 넣어주자.)

## logger
로그를 잘 관리할 수 도록 `winston`을 설치해서 로깅처리를 하도록 한다.

### 로깅처리를 위한 winston 설치
```console
> npm install winston --save
```

### 로그파일 작성을 위한 winston-daily-rotate-file 설치
매일 날짜에 맞춰 로그를 자동으로 생성해 주는 라이브러리를 설치 한다.

```console
> npm install winston-daily-rotate-file --save
```

### logger 설정
다음과 같이 로그전용 라이브러리를 생성해서 로깅처리를 하도록 한다.
(콘솔 출력과 로그파일 출력을 설정할 수 있다.)

> /lib/logger.js
```javascript
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// logger level 세팅
const loggerLevel = process.env.LOGGER_LEVEL || 'info';

// const { env } = envConfig;
const logDir = 'log';

// Log only if info.level less than or equal to this level
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

// log directory
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// log file
const dailyRotateFileTransport = new transports.DailyRotateFile({
  // 로그파일 출력 세팅
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  format: format.combine(
    format.printf(
      (info) => `${info.timestamp}[${info.level}] ${info.message}`,
    ),
  ),
});

const logger = createLogger({
  // 로거 환경 세팅(기본 세팅)
  level: loggerLevel,
  format: format.combine(
    // format.label( { label: 'label123' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      // 콘솔 출력 세팅
      level: loggerLevel,
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp}[${info.level}] ${info.message}`,
        ),
      ),
    }),
    dailyRotateFileTransport,
  ],
});

module.exports = logger;
```

### logger 관련 구 코드 삭제
로그관련 구코드는 삭제하고 새로만든 라이브러리를 넣도록 한다.

> /app.js
```javascript
...
// const logger = require('morgan'); // 구코드 삭제
const logger = require('./lib/logger');
... (중간생략)...

const app = express();
logger.info('app start');
... (중간생략)...
// app.use(logger('dev')); // 구코드 삭제
...
```

app을 실행시키고 콘솔과 로그파일에 동일하게 출력되는지 확인해 보자.
```console
> npm run dev

> nodeproj@0.0.0 dev C:\Workspace\nodeproj
> nodemon ./bin/www

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./bin/www`
2022-01-12 11:44:50.266[info] app start 
```

(다음의 로그파일을 확인한다.)
> /log/2022-01-12.log
```
2022-01-12  11:44:50.266[info] app start
```
로그파일의 내용과 콘솔 출력의 내용이 같은지 확인 해 볼 것.
(로그파일 및 디렉토리는 자동으로 생성 된다.)

### logger 사용 예제
logger는 다음과 같이 사용할 수 있다.
> /routes/index.js
```javascript
const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// logTest
router.get('/log-test', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log test');
});

module.exports = router;
```
로그 테스트를 위한 URL에 방문해 보자
http://localhost:3000/log-test

생성된 로그파일 및 콘솔 출력을 확인해 보자.
> /log/2021-01.12.log
```
2022-01-12 11:49:31.054[error] This message is error
2022-01-12 11:49:31.056[warn] This message is warn
2022-01-12 11:49:31.056[info] This message is info
2022-01-12 11:49:31.057[verbose] This message is verbose
2022-01-12 11:49:31.057[debug] This message is debug
```

**주의** 로그 출력은 `.env`의 `LOGGER_LEVEL`에 따라 결정 된다.
(`LOGGER_LEVEL=info`인 경우 `error`, `warn`, `info`만 출력 됨)

## cors
cors를 처리하기 위해 `cors`를 설치한다.

### cors 설치
```console
> npm install cors --save
```

### cors 환경 설정
환경설정 파일을 다음과 같이 생성한다.

> /config/corsConfig.json
```json
{
  "origin": ["http://localhost:3000"],
  "methods": ["OPTIONS", "GET", "POST", "HEAD", "PUT", "DELETE"]
}
```
**주의**
cors정책에서 `origin`은 등록하지 말고 전부 막도록 해야 한다. 
(front에서 접근할때 proxy를 이용해서 접근하도록 해야 한다. 모든 프론트 서버를 열어줄 수 없다.)

### cors 적용
다음과 같이 일괄로 적용시키도록 한다.  
(각 라우터마다 따로 적용하는 방법도 있으나 관리포인트가 늘어난다.)

> /app.js
```javascript
...
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const logger = require('./lib/logger');
...(중간생략)...

app.use(cors(corsConfig));
app.use(express.json());
...
```

# DB연동

## DB준비
DB는 다음과 같이 (별도로) 준비한다. 

**PostgreSQL 11.4**
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=metacamp_dev
DB_ID=postgres
DB_PASS=postgres

## sequelize
ORM 방식을 사용하기 위해 `sequelize`를 설치 한다.  (버전은 6를 선택 한다.)
[https://sequelize.org/v6/](https://sequelize.org/v6/)

### DB 클라이언트 설치
nodejs에서 DB를 연결해서 사용하려면 해당 DB의 클라이언트 프로그램이 설치되어야 한다.

다음과 같이 각 데이터베이스 종류별로 설치할 수 있다. (아직 설치하지 말고)
```console
> npm install pg pg-hstore --save
> npm install mysql2 --save
> npm install mariadb --save
> npm install sqlite3 --save
> npm install tedious --save
```

> DB종류 참고
> `pg pg-hstore`: PostgreSQL
> `tedious`: Microsoft SQL Server

우리는 이 중 PostgreSQL을 설치하도록 한다. (이제 설치하자)
```console
> npm install pg pg-hstore --save
```

### sequelize 설치
```console
> npm install sequelize --save
```

### sequelize 접속 설정
sequelize를 통한 DB접속을 위해 다음과 같이 DB접속 파일을 생성 한다.

> /models/connection.js
```javascript
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const db = {
  username: process.env.DB_ID,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};

// sequelize 생성
const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
  },
);

exports.sequelize = sequelize;
```

## 모델 생성

다음의 필드를 갖는 `department` 모델을 생성해 보자.

**department**
|속성명|필드명|타입|
|------|---|---|
|pk|id|int|
|부서이름|name|varchar(50)|
|부서코드|code|varchar(50)|
|상세설명|description|text|
|등록일시|created_at|datetime|
|수정일시|updated_at|datetime|
|삭제일시|deleted_at|datetime|

### 모델 파일 생성

> /models/department.js
```javascript
const Sequelize = require('sequelize');

module.exports = class Department extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(50),
      },
      code: {
        type: Sequelize.STRING(50),
      },
      description: {
        type: Sequelize.TEXT,
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }
};
```

Model의 요소는 다음과 같다.
> **첫번째 요소**는 다음과 같이 Table Schema와 매핑되는 정보이다.
> 
> `type` : Data type  
> `allowNull` : NOT NULL 조건인지 아닌지 (default: true)  
> `unique` : Unique조건인지 아닌지에 대한 옵션. column하나로만 이루어진 unique라면 true/false로 지정한다. 복수개의 column이라면 동일한 문자열을 각 column의 unique속성에 넣어준다.  
> `comment` : column에 대한 comment  
> `validate` : 각 column에 대한 validation check옵션을 넣어준다.
> 
> ----------
> 
> **두번째 요소**는 config 옵션이 들어간다. 대표적인 옵션은 이와같다.
> 
> `timestamps` : Sequelize는 테이블을 생성한 후 자동적으로 createdAt, updatedAt column을 생성한다.  
> Database에 해당 테이블이 언제 생성되었고 가장 최근에 수정된 시간이 언제인지 추적할 수 있도록 해준다. 기능을 끄려면 false로 설정한다.  
> `paranoid` : paranoid가 true이면 deletedAt column이 table에 추가된다.  
> 해당 row를 삭제시 실제로 데이터가 삭제되지 않고 deletedAt에 삭제된 날짜가 추가되며 deletedAt에 날짜가 표기된 row는 find작업시 제외된다.  
> 즉 데이터는 삭제되지 않지만 삭제된 효과를 준다.(timestamps 옵션이 true여야만 사용할 수 있다.)  
> `underscored` : true면 column이름을 camalCase가 아닌 underscore방식으로 사용한다.  
> `freezeTableName` : true면 table 이름의 복수형 생성을 막는다.  
> `tableName` : table 이름을 수동으로 생성 한다. 
> `comment` : table 에 대한 comment

### 모델 index 파일 생성
모델을 생성하기 위해 index파일을 생성 한다.
> /models/index.js
```javascript
const { sequelize } = require('./connection');
const Department = require('./department');

const db = {};

db.sequelize = sequelize;

// model 생성
db.Department = Department;

// model init
Department.init(sequelize);

module.exports = db;
```
생성된 index파일에 위와 같이 `Department`를 등록해야 `Department`모델을 사용할 수 있다.


### 모델 초기화(= 테이블 생성)
모델을 초기화하면 테이블을 생성할 수 있다.

> /app.js
```javascript
...
const models = require('./models/index');
const logger = require('./lib/logger');
...(중간생략)...

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// DB 연결 확인 및 table 생성
models.sequelize.authenticate().then(() => {
  logger.info('DB connection success');

  // sequelize sync (table 생성)
  models.sequelize.sync().then(() => {
    logger.info('Sequelize sync success');
  }).catch((err) => {
    logger.error('Sequelize sync error', err);
  });
}).catch((err) => {
  logger.error('DB Connection fail', err);
});
...
```

다음과 같이 쿼리가 자동으로 생성 된다.
```console
Executing (default): SELECT 1+1 AS result
Executing (default): CREATE TABLE IF NOT EXISTS "departments" ("id"   SERIAL , "name" VARCHAR(50), "code" VARCHAR(50), "description" TEXT, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'departments' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
```

# CRUD 구조

본 프로젝트는 자바스프링의 MVC 구조를 모방한다.
프로세스의 흐름은 Controller --> Service --> DAO의 순서를 따르며
각 구조별 파일명은 다음과 같다. (예: Department)

> **Model** (테이블 정의 파일): /models/department.js  
> **Controller** (라우터 파일): /routes/department.js  
> **Service** (비즈니스 로직 파일): /service/departmentService.js  
> **DAO** (데이터 액세스 파일): /dao/departmentDao.js
(참고: 아직 만들어지지 않은 파일이 있으니 찾지 말 것.)

코딩 순서는 Model --> DAO --> Service --> Router 순으로 한다.

부서 등록에 대해서 코드를 짜보자.

## 1) DAO
Model파일은 이미 만들었으니 DAO를 만들도록 하자.
DAO파일에는 DB처리에 관련된 사항만 넣도록 한다.(sequelize 함수 위주로 코딩 한다.)

다음과 같은 파일을 생성 한다.

> /dao/departmentDao.js
```javascript
const { Department } = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Department.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
```

## 2) Service
Service 파일에는 모든 비즈니스 로직을 넣도록 한다.
비즈니스 로직이 순차 진행인 경우 async/await를 사용해야 한다.

> /service/departmentService.js
```javascript
const logger = require('../lib/logger');
const departmentDao = require('../dao/departmentDao');

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await departmentDao.insert(params);
      logger.debug(`(departmentService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(departmentService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
};

module.exports = service;
```
**주의** 로깅처리는 `.debug`와 `.error`를 반드시 구분하여 출력하도록 한다.
특히 `.error`로그는 반드시 운영 상태인 경우에도 파일로 출력해 두도록 한다.


## 3) Router
Controller에 해당하는 라우터는 사용자의 request요청을 최초로 받고 response를 최종 리턴해 주는 부분으로써 입력 파라미터를 체크하고 응답을 보내준다.

### Router 파일 생성

> /routes/department.js
```javascript
const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const departmentService = require('../service/departmentService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await departmentService.reg(params);
    logger.info(`(department.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
```

### Router 등록
위 파일을 라우터에 등록한다.
> /routes/index.js
```javascript
const express = require('express');
const logger = require('../lib/logger');
const departmentRouter = require('./department');

const router = express.Router();

...(중간생략)...

// department
router.use('/departments', departmentRouter);

module.exports = router;
```
**주의** RESTFull API를 위해 복수형(/departments)을 사용함

### 부서등록 API
다음과 같은 API문서를 보고 Postman을 이용해서 입력 테스트를 할 수 있다.

> 부서 등록
```
method: POST
url: http://localhost:3000/departments
body: 
{
    "name": "개발팀",
    "code": "dev",
    "desctiption": null
}
```


## 완성된 CRUD 코드
같은 방식으로 department의 CRUD를 모두 생성해 주자.
sequelize의 사용법은 해당 사이트의 문서를 참조 할 것 (https://sequelize.org/v6/manual/model-querying-finders.html)

최종 완성된 코드는 다음과 같다.

### 완성된 DAO 코드
> /dao/departmentDao.js
```javascript
const { Op } = require('sequelize');
const { Department } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Department.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Department.findAndCountAll({
        ...setQuery,
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Department.findByPk(
        params.id,
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Department.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Department.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
```

### 완성된 Service 코드
> /service/departmentService.js
```javascript
const logger = require('../lib/logger');
const departmentDao = require('../dao/departmentDao');

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await departmentDao.insert(params);
      logger.debug(`(departmentService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(departmentService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // selectList
  async list(params) {
    let result = null;

    try {
      result = await departmentDao.selectList(params);
      logger.debug(`(departmentService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await departmentDao.selectInfo(params);
      logger.debug(`(departmentService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await departmentDao.update(params);
      logger.debug(`(departmentService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await departmentDao.delete(params);
      logger.debug(`(departmentService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
```

### 완성된 Router 코드
> /routes/department.js
```javascript
const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const departmentService = require('../service/departmentService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await departmentService.reg(params);
    logger.info(`(department.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      name: req.query.name,
    };
    logger.info(`(department.list.params) ${JSON.stringify(params)}`);

    const result = await departmentService.list(params);
    logger.info(`(department.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(department.info.params) ${JSON.stringify(params)}`);

    const result = await departmentService.info(params);
    logger.info(`(department.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.update.params) ${JSON.stringify(params)}`);

    const result = await departmentService.edit(params);
    logger.info(`(department.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(department.delete.params) ${JSON.stringify(params)}`);

    const result = await departmentService.delete(params);
    logger.info(`(department.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
```

### 완성된 부서관리 API

#### 부서 등록
> request
```
method: POST
url: /departments
body: 
{
    "name": "개발팀",
    "code": "dev",
    "desctiption": null
}
```

> response
```json
{
    "id": 1,
    "name": "개발팀",
    "code": "dev",
    "description": null,
    "createdAt": "2022-01-17T06:26:51.072Z",
    "updatedAt": "2022-01-17T06:26:51.072Z",
    "deletedAt": null
}
```

#### 부서 리스트
> request
```
method: GET
url: /departments
query: name
```

> response
```json
{
    "count": 3,
    "rows": [
        {
            "id": 3,
            "name": "마케팅팀",
            "code": "marketing",
            "description": null,
            "createdAt": "2022-01-19T00:17:15.765Z",
            "updatedAt": "2022-01-19T00:17:15.765Z",
            "deletedAt": null
        },
        {
            "id": 2,
            "name": "영업팀",
            "code": "sales",
            "description": null,
            "createdAt": "2022-01-19T00:15:54.041Z",
            "updatedAt": "2022-01-19T00:15:54.041Z",
            "deletedAt": null
        },
        {
            "id": 1,
            "name": "개발팀-",
            "code": "dev-",
            "description": null,
            "createdAt": "2022-01-17T06:26:51.072Z",
            "updatedAt": "2022-01-19T01:28:26.703Z",
            "deletedAt": null
        }
    ]
}
```
**주의** limit, offset을 사용하는 경우(즉, 페이징 처리를 하는 경우) `count`와 `rows.length`는 다를 수 있다.
(`count`: 해당 조건에 속하는 전체 리스트 수, `rows`: 현재 페이지에 나타나는 리스트 수)


#### 부서 상세정보
> request
```
method: GET
url: /departments/<:id>
```

> response
```json
{
    "id": 1,
    "name": "개발팀",
    "code": "dev",
    "description": null,
    "createdAt": "2022-01-17T06:26:51.072Z",
    "updatedAt": "2022-01-17T06:26:51.072Z",
    "deletedAt": null
}
```

#### 부서 수정
> request
```
method: PUT
url: /departments/<:id>
body:
{
    "name": "개발팀",
    "code": "dev",
    "desctiption": null
}
```

> response
```json
{
    "updatedCount": 1
}
```

#### 부서 삭제
> request
```
method: DELETE
url: /departments/<:id>
```

> response
```json
{
    "deletedCount": 1
}
```

# users관련 구코드 삭제
express를 통해 프로젝트를 생성한 경우 `users`라는 것이 이미 존재한다.
따라서 이를 제거해서 우리가 사용할 사용자 코드와 중복되거나 헷갈리지 않도록 하자.

##### 1) app.js에서 users 삭제
다음과 같은 코드를 제거 한다.

> /app.js
```javascript
...(중간생략)...
const  indexRouter = require('./routes/index');
// const  usersRouter = require('./routes/users'); // 구코드 삭제
...(중간생략)...
app.use('/', indexRouter);
// app.use('/users', usersRouter); // 구코드 삭제
...(중간생략)...
```

##### 2) /routes/users.js 파일 삭제
다음의 파일을 삭제 한다. (물리적 파일 삭제)
삭제파일: `/routes/users.js`


# Table Join

사용자 테이블을 생성해 보자.
사용자는 부서에 속해있는 구조로 하여 부서 테이블과 조인을 한다.

사용자 테이블은 다음과 같다
**user**
|속성명|필드명|타입|기타|
|------|---|---|---|
|pk|id|int||
|부서PK|department_id|int|FK(department.id)|
|이름|name|varchar(100)||
|아이디|userid|varchar(255)|unique, not null|
|비밀번호|password|varchar(500)|not null|
|사용자권한|role|varchar(20)||
|이메일|email|varchar(255)||
|전화번호|phone|varchar(255)||
|비밀번호 변경일|updated_pw_date|datetime||
|등록일시|created_at|datetime||
|수정일시|updated_at|datetime||
|삭제일시|deleted_at|datetime||

부서PK(department_id)는 부서테이블(department)의 PK(id)와 FK를 맺고 있다.

## 사용자 모델 생성
사용자 모델 파일을 생성 한다.

> /models/user.js
```javascript
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      departmentId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      userid: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      updatedPwDate: {
        type: Sequelize.DATE,
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(db) {
    db.User.belongsTo(db.Department, { foreignKey: { name: 'departmentId', onDelete: 'SET NULL', as: 'Department' } });
  }
};
```
하단의 `assoicate`부분에서 `Department`와의 관계를 설정 하였다. 
`User.belongsTo(Department`의 뜻은 `User`가 하나의 `Department`에 속해있다는 뜻이다. 

부서모델(Department)에서도 User와의 관계를 설정해 주도록 한다.
> /models/department.js
```javascript
...(중간생략)...
  static associate(db) {
    db.Department.hasMany(db.User, { foreignKey: { name: 'departmentId' }, onDelete: 'SET NULL', as: 'Users' });
  }
};
```
`Department.hasMany(User`의 뜻은 `Department`하나에 여러개의 `User`가 소속될 수 있다는 뜻이다.

즉, **User : Department = N : 1**의 관계이다.

**참고** User와 Department가 서로 관계가 있을때 둘 중 하나만 관계를 써주면 어떻게 되는가?
--> 둘 중 하나만 관계를 써줘도 FK가 맺어진다. 다만, sequelize를 통해 해당 모델을 사용할때 관계를 맺어주지 않으면 join(`include기능`)을 사용할 수 없다. 

## 모델 index파일 설정

생성한 모델을 index파일에 등록하고 FK관계 설정을 등록해 준다.

> /models/index.js
```javascript
const { sequelize } = require('./connection');
const Department = require('./department');
const User = require('./user');

const db = {};

db.sequelize = sequelize;

// model 생성
db.Department = Department;
db.User = User;

// model init
Department.init(sequelize);
User.init(sequelize);

// association(관계 생성)
Department.associate(db);
User.associate(db);

module.exports = db;
```


## Table JoinQuery

사용자(User)관리 기능을 생성해 보자.
테이블 조인을 확인하기 위해서 등록과 리스트조회만 생성 하였다.

### User Dao
> /dao/userDao.js
```javascript
const { Op } = require('sequelize');
const { User, Department } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        // password는 제외하고 리턴함
        const insertedResult = { ...inserted };
        delete insertedResult.dataValues.password;
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }
    if (params.userid) {
      setQuery.where = {
        ...setQuery.where,
        userid: params.userid, // '='검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // password 필드 제외
        include: [
          {
            model: Department,
            as: 'Department',
          },
        ],
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
```
위와 같이 사용자 리스트(`selectList`)함수에서 `include`를 통해 join관계를 표시할 수 있다.

### User Service 파일
> /service/userService.js
```javascript
const logger = require('../lib/logger');
const userDao = require('../dao/userDao');

const service = {
  // user 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await userDao.insert(params);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // selectList
  async list(params) {
    let result = null;

    try {
      result = await userDao.selectList(params);
      logger.debug(`(userService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
```

### User Router 파일
> /routes/user.js
```javascript
const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      departmentId: req.body.departmentId,
      name: req.body.name,
      userid: req.body.userid,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name || !params.userid || !params.password) {
      const err = new Error('Not allowed null (name, userid, password)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      name: req.query.name,
      userid: req.query.userid,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
```

### User Router 등록
> /routes/index.js
```javascript
const express = require('express');
const logger = require('../lib/logger');
const departmentRouter = require('./department');
const userRouter = require('./user');

const router = express.Router();

...(중간생략)...

router.use('/departments', departmentRouter);
router.use('/users', userRouter);

module.exports = router;
```

### User API

#### 사용자 등록
> request
```
method: POST
url: /users
body: 
{
    "departmentId": 1,
    "name": "김개발",
    "userid": "kim",
    "password": "1",
    "role": "member",
    "email": "kim@email.com",
    "phone": "010-1234-5678"
}
```

> response
```json
{
    "id": 1,
    "departmentId": 1,
    "name": "김개발",
    "userid": "kim",
    "role": "member",
    "email": "kim@email.com",
    "phone": "010-1234-5678",
    "updatedAt": "2022-01-20T06:40:15.500Z",
    "createdAt": "2022-01-20T06:40:15.500Z",
    "updatedPwDate": null,
    "deletedAt": null
}
```

#### 사용자 리스트
> request
```
method: GET
url: /users
query: name, userid
```

> response
```json
{
    "count": 1,
    "rows": [
        {
            "id": 1,
            "departmentId": 1,
            "name": "김개발",
            "userid": "kim",
            "role": "member",
            "email": "kim@email.com",
            "phone": "010-1234-5678",
            "updatedPwDate": null,
            "createdAt": "2022-01-20T06:40:15.500Z",
            "updatedAt": "2022-01-20T06:40:15.500Z",
            "deletedAt": null,
            "Department": {
                "id": 1,
                "name": "개발팀",
                "code": "dev",
                "description": null,
                "createdAt": "2022-01-20T06:27:10.315Z",
                "updatedAt": "2022-01-20T06:27:10.315Z",
                "deletedAt": null
            }
        }
    ]
}
```
`userDao.js`파일에서 사용한 `include`에 대한 내용이 
위와 같이 `Department`객체에 Join된 부서정보로 출력 된다.

**참고** 이 때 sequelize에 의해 자동으로 생성되는 쿼리는 다음과 같다.
```sql
SELECT "User"."id", "User"."department_id" AS "departmentId", "User"."name", "User"."userid", "User"."role", "User"."email", "User"."phone", "User"."updated_pw_date" AS "updatedPwDate", "User"."created_at" AS "createdAt", "User"."updated_at" AS "updatedAt", "User"."deleted_at" AS "deletedAt", "Department"."id" AS "Department.id", "Department"."name" AS "Department.name", "Department"."code" AS "Department.code", "Department"."description" AS "Department.description", "Department"."created_at" AS "Department.createdAt", "Department"."updated_at" AS "Department.updatedAt", "Department"."deleted_at" AS "Department.deletedAt" 
FROM "users" AS "User" 
LEFT OUTER JOIN "departments" AS "Department" ON "User"."department_id" = "Department"."id" 
AND ("Department"."deleted_at" IS NULL) 
WHERE ("User"."deleted_at" IS NULL) 
ORDER BY "User"."id" DESC;
```

#### 사용자 상세정보
> request
```
method: GET
url: /users/<:id>
```

> response
```json
{
    "id": 1,
    "departmentId": 1,
    "name": "김개발",
    "userid": "kim",
    "role": "member",
    "email": "kim@email.com",
    "phone": "010-1234-5678",
    "updatedPwDate": null,
    "createdAt": "2022-01-20T06:40:15.500Z",
    "updatedAt": "2022-01-20T06:40:15.500Z",
    "deletedAt": null
}
```

#### 사용자 정보 수정
> request
```
method: PUT
url: /users/<:id>
body:
{
    "departmentId": 1,
    "name": "김개발",
    "role": "member",
    "email": "kim@email.com",
    "phone": "010-1234-5678"
}
```

> response
```json
{
    "updatedCount": 1
}
```

#### 사용자 삭제
> request
```
method: DELETE
url: /users/<:id>
```

> response
```json
{
    "deletedCount": 1
}
```

**참고** 사용자 삭제처리 시 실제 데이터가 삭제되지 않고 `deleted_at`에 삭제날짜가 기록 된다.


# 비밀번호 암호화
사용자 생성 시 비밀번호를 암호화 한다.

### crypto 설치

비밀번호 암호화는 `sha256`으로 처리할 예정이며 이를 위해 다음의 라이브러리를 설치 한다.
```console
> npm install crypto
```

### hash 처리 함수 만들기
hash(비번만들기용)을 만들고 이를 확인(비번확인용)하는 함수를 만들어 보자.

> /lib/hashUtil.js
```javascript
const crypto = require('crypto');

const iterations = 1005; // 반복횟수(1000번 이상)

const hashUtil = {
  // hash함수 생성
  makePasswordHash(password) {
    return new Promise((resolve, reject) => {
      if (!password) {
        reject(new Error('Not allowed null (password)'));
      }

      // 1. salt 생성
      const salt = crypto.randomBytes(64).toString('base64');

      // 2. hash 생성
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;

        const hash = derivedKey.toString('hex');

        // 최종 패스워드 (password=salt.hash)
        const encryptedPassword = `${salt}.${hash}`;

        resolve(encryptedPassword);
      });
    });
  },
  // 비밀번호 확인
  checkPasswordHash(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      if (!password || !encryptedPassword) {
        reject(new Error('Not allowed null (password)'));
      }

      // 1. salt와 hash 분리
      const encryptedPasswordSplit = encryptedPassword.split('.');
      const salt = encryptedPasswordSplit[0];
      const encryptedHash = encryptedPasswordSplit[1];

      // 2. 입력된 password로부터 hash생성
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;

        const hash = derivedKey.toString('hex');

        // 입력된 password와 암호화된 password를 비교한다.
        if (hash === encryptedHash) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
};

module.exports = hashUtil;
```

### 사용자 입력 시 비밀번호 암호화 처리
위에서 만든 hash함수를 이용해서 사용자 입력 처리 시 비밀번호 부분을 암호화 처리 하도록 한다.
> /service/userService.js
```javascript
...(중간생략)...
  // user 입력
  async reg(params) {
    let inserted = null;

    // 1. 비밀번호 암호화
    let hashPassword = null;
    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
      logger.debug(`(userService.makePassword) ${JSON.stringify(params.password)}`);
    } catch (err) {
      logger.error(`(userService.makePassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 2. 사용자 등록 처리
    const newParams = {
      ...params,
      password: hashPassword,
    };

    try {
      inserted = await userDao.insert(newParams);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
...(중간생략)...
```
위와 같이 사용자 등록 함수를 호출하기 전에 비밀번호 암호화 처리를 해 주면 된다.

#### hash password
암호화된 비밀번호는 다음과 같은 모습을 보인다.
```
eyUBfgtGGfkvZCYu3PG/jgJeww97gtKvLsQGKQrEsAh2/1bw5Wnd+RKf3atw5zB0k5FiJA/i6TKUBy5uBW6ieg==.d148e776e958fe445aa877bfd82ca8f9f69950b12e6b65b01baaf07a63d86588fc20f9b7e69c30bc6e73579647aaa7b1428aecaeb736cc7a6268f7ed4a95952f
```

**참고** 비밀번호 정책 체크(`password-validator`)는 따로 적용해 보도록 할 것.


# 토큰 관리

## 토큰 정책

### 토큰 발행 정책
- 토큰 발행 시 만료 시간은 2시간으로 정한다.
- 토큰의 payload에는 사용자의 pk, 이름, 아이디, 권한 정보를 넣는다.
- 토큰 발행은 응답헤더의 `token`으로 한다.

### 토큰 검증 정책
- 클라이언트에서 발송하는 토큰 정보는 요청헤더의 `token`으로 한다.
- 토큰 검증이 확인 되면 매번 새로운 토큰을 갱신 발급해 준다.
- 토큰 갱신은 응답헤더의 `token`으로 한다.

### 토큰 폐기 정책
- 토큰 폐기시 로그아웃에 대한 후속 처리는 별도로 하지 않는다.


## 토큰 발행
아이디/비밀번호가 맞으면 토큰을 발행해 준다.

### jsonwebtoken 설치
```console
> npm install jsonwebtoken --save
```

### 토큰용 secretKey생성
토큰에서 사용할 secretKey를 생성해야 한다.
secretKey를 생성할때에는 키 생성 전용 서비스를 이용하는 것이 좋다.
https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx

생성할 시크릿 키는 `64 hex characters(=256 binary bits)`로 만들어 준다.
```
2B4D6251655468566D597133743677397A24432646294A404E635266556A586E
```

### 토큰 처리 유틸 생성
토큰을 생성하고 확인해주는 유틸리티를 만들어 준다.
위에서 생성한 시크릿 키를 넣어 준다. (시크릿 키 절대 노출 금지)
> /lib/tokenUtil.js
```javascript
const jwt = require('jsonwebtoken');

const secretKey = '2B4D6251655468566D597133743677397A24432646294A404E635266556A586E';
const options = {
  expiresIn: '2h', // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
};

module.exports = tokenUtil;
```

### 로그인 처리용 프로세스
#### dao 처리
> /dao/userDao.js
```javascript
...(중간생략)...
  // 로그인을 위한 사용자 조회
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userid', 'password', 'name', 'role'],
        where: { userid: params.userid },
      }).then((selectedOne) => {
        resolve(selectedOne);
      }).catch((err) => {
        reject(err);
      });
    });
  },
...(중간생략)...
```

#### service 처리
> /user/userService.js
```javascript
...(중간생략)...
  // login 프로세스
  async login(params) {
    // 1. 사용자 조회
    let user = null;
    try {
      user = await userDao.selectUser(params);
      logger.debug(`(userService.login) ${JSON.stringify(user)}`);

      // 해당 사용자가 없는 경우 튕겨냄
      if (!user) {
        const err = new Error('Incorect userid or password');
        logger.error(err.toString());

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      logger.error(`(userService.login) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 2. 비밀번호 비교
    try {
      const checkPassword = await hashUtil.checkPasswordHash(params.password, user.password);
      logger.debug(`(userService.checkPassword) ${checkPassword}`);

      // 비밀번호 틀린 경우 튕겨냄
      if (!checkPassword) {
        const err = new Error('Incorect userid or password');
        logger.error(err.toString());

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      logger.error(`(userService.checkPassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(user);
    });
  },
...(중간생략)...
```

#### router 처리
router는 `auth`로 새로 만들어 준다.
> /routes/auth.js
```javascript
const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const tokenUtil = require('../lib/tokenUtil');
const userService = require('../service/userService');

// user 토큰 발행
router.post('/token', async (req, res) => {
  try {
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(auth.token.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.userid || !params.password) {
      const err = new Error('Not allowed null (userid, password)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.login(params);
    logger.info(`(auth.token.result) ${JSON.stringify(result)}`);

    // 토큰 생성
    const token = tokenUtil.makeToken(result);
    res.set('token', token); // header 세팅

    // 최종 응답
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
```

#### router index 등록
`/auths`라는 이름으로 라우터에 등록한다.
> /routes/index.js
```javascript
...(중간생략)...
const  userRouter = require('./user');
const  authRouter = require('./auth');

...(중간생략)...
router.use('/users', userRouter);
router.use('/auths', authRouter);
...(중간생략)...
```

## 토큰 검증(middleware)
백엔드의 API를 호출했을때 로그인 여부를 확인(토큰 검증)하여 로그인이 된 상태에서만 프로세스가 동작 하도록 하자.
(권한 체크도 가능하지만 여기서는 로그인 여부만 확인 한다.)

### 토큰검증 함수 생성
토큰 검증을 위한 함수를 생성 한다.

> /lib/tokenUtil.js
```javascript
const jwt = require('jsonwebtoken');
...(중간생략)...

const tokenUtil = {
  ...(중간생략)...
  // 토큰 검증
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
```

### 미들웨어(middleware) 함수 생성
위에서 생성한 토큰 검증 함수를 미들웨어를 통해 사용할 수 있다.
미들웨어 전용 함수를 만들어 보자.

> /lib/middleware.js
```javascript
const logger = require('./logger');
const tokenUtil = require('./tokenUtil');

const middleware = {
  // 로그인 체크
  isLoggedIn(req, res, next) {
    const token = req.headers && req.headers.token;

    if (token) {
      // 토큰이 있는 경우 토큰 검증을 수행 한다.
      const decoded = tokenUtil.verifyToken(token);

      if (decoded) {
        // 1. 토큰 검증이 성공한 경우 새로 갱신해 준다.
        const newToken = tokenUtil.makeToken(decoded);
        res.set('token', newToken); // header 세팅

        next(); // 미들웨어 통과(계속 진행)
      } else {
        // 2. 토큰 검증이 실패한 경우 401에러를 응답 한다.
        const err = new Error('Unauthorized token');
        logger.error(err.toString());

        res.status(401).json({ err: err.toString() });
      }
    } else {
      // 토큰이 없는 경우 401에러 응답
      const err = new Error('Unauthorized token');
      logger.error(err.toString());

      res.status(401).json({ err: err.toString() });
    }
  },
};

module.exports = middleware;
```
미들웨어는 프로세스 진행 중간에 체크할 사항이 있는 경우 위와 같이 함수를 만들어서 사용하면 편리하다.
미들웨어 사용방법에 대해서는 다음 항목인 **장비관리**에서 확인해 보도록 하자.

## 토큰 폐기
토큰 폐기에 대한 별도의 후속 처리는 없으므로 토큰 폐기에 대한 백엔드는 만들지 않아도 된다.
(프론트에서 자체 보유한 토큰을 폐기하면 됨)

## 토큰 관리 API

#### 토큰 발행
> request
```
method: POST
url: /auths/token
```

> response.headers
```
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcmlkIjoia2ltMiIsIm5hbWUiOiLquYDqsJzrsJwiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNjQyOTE2MDE5LCJleHAiOjE2NDI5MjMyMTl9.ctoZAPnIxxdhNeFPK0SKRo47ZRrda_FRVLlssVf30sQ
```

#### 토큰 검증
> request
```
method: <METHOD>
url: <URL>
headers: token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcmlkIjoia2ltMiIsIm5hbWUiOiLquYDqsJzrsJwiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNjQyOTE2MzY5LCJleHAiOjE2NDI5MjM1Njl9.xIESdfpJitQZ5fOMx2XfyY_efgQfyRybMVWB1viDsw8
```

> response.headers
```
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcmlkIjoia2ltMiIsIm5hbWUiOiLquYDqsJzrsJwiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNjQyOTE2MDE5LCJleHAiOjE2NDI5MjMyMTl9.ctoZAPnIxxdhNeFPK0SKRo47ZRrda_FRVLlssVf30sQ
```


## 장비 관리 (with token)
장비 관리 프로세스를 토큰 검증을 넣어서 만들어 보자.

장비관리 테이블은 다음과 같다
**device**
|속성명|필드명|타입|기타|
|------|---|---|---|
|pk|id|int||
|이름|name|varchar(100)|not null, unique|
|장비이름|device_model_name|varchar(100)||
|모델명|manufacturer|varchar(100)||
|설치위치|location|varchar(255)||
|엣지 시리얼 번호|edge_serial_number|varchar(20)||
|통신 인터페이스|network_interface|varchar(20)||
|통신 설정정보|network_config|text||
|상세정보|description|text||
|등록일시|created_at|datetime||
|수정일시|updated_at|datetime||
|삭제일시|deleted_at|datetime||


### Router에 middlware를 이용해서 토큰 검증(로그인 확인) 하기
Dao와 Service는 동일한 로직으로 만들면 되고 Router에서 다음과 같이 미들웨어 방식으로 `isLoggedIn`함수를 사용하면 된다.

> /routes/device.js
```javascript
const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const { isLoggedIn } = require('../lib/middleware');
const deviceService = require('../service/deviceService');

...(중간생략)...

// 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      name: req.query.name,
    };
    logger.info(`(device.list.params) ${JSON.stringify(params)}`);

    const result = await deviceService.list(params);
    logger.info(`(device.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

...(중간생략)...

module.exports = router;
```

##### 토큰 테스트 팁
postman을 이용해서 백엔드를 테스트 할때에는 토큰 검증이 들어가게 되면 2시간마다 토큰을 교체해야 하는 불편함이 따른다. 이를 대체하기 위해 1년짜리 토큰을 발행해서 테스트 하면 편리하게 이용할 수 있다.

> /lib/tokenUtil.js
```javascript
...(중간생략)...
const  options = {
  expiresIn:  '8760h', // 만료시간
};
...(중간생략)...
```
위와 같이 만료시간을 1년으로 하고 발급한 토큰을 postman에 세팅하면 편리하다.
(토큰 누출 시 보안 위험이 있으니 주의 할 것)


