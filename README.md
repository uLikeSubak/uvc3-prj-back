# TodayMate BackEnd

&nbsp;&nbsp;
# 환경설정

```
npm i 
```
```
npx sequelize db:create //  DB가 없을 경우 먼저 DB 생성
```
```
// .env 설정
PORT=포트번호
JWT_SECRET=비밀번호
```
```
npm start 
```


&nbsp;&nbsp;
****

&nbsp;&nbsp;


# 설계하기


## ●기능 명세
   
#### &nbsp;0. 회원정보 추가 / 조회 / 수정 / 삭제 
##### &nbsp;&nbsp;&nbsp;0-1. E-mail 본인인증 
#### &nbsp;1. 로그인
##### &nbsp;&nbsp;&nbsp;1-1. ID,PW찾기   
##### &nbsp;&nbsp;&nbsp;1-1. 구글, 네이버, 카카오 로그인    
#### &nbsp;2. 게시글 작성 / 조회 / 수정 / 삭제
#### &nbsp;2. 댓글 작성 / 조회 / 수정 / 삭제
#### &nbsp;2. 친구 요청 / 조회 / (수락/거절) / 삭제
#### &nbsp;2. (관리자 전용) 카테고리 추가 / 수정 / 삭제
&nbsp;&nbsp;

****


&nbsp;&nbsp;

# ●사용한 기술 스택

## &nbsp; - 언어 : JavaScript
## &nbsp; - 플랫폼 : node.js
## &nbsp; - 프레임워크 : express.js
## &nbsp; - 데이터 베이스 : Mysql


&nbsp;&nbsp;

## ●사용한 라이브러리 및 API

#### &nbsp;-회원가입 본인인증  - 네이버 sms - api 
#### &nbsp;-로그인 인증 - JasonWebToken
#### &nbsp;-데이터 베이스 처리 - sequelize
#### &nbsp;-이미지 데이터 처리 - multer
&nbsp;&nbsp;

********
