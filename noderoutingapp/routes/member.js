// member.js 라우터 파일용도 : 각종 회원 정보 관리용 웹페이지에 대한 사용자 요청과 응답 처리 전용 라우터 파일
// member.js 라우터 파일의 기본 접속 주소 경로는 localhost://3000/members/~
// member.js 라우터 파일내에 정의된 라우팅 메소드의 기본 주소 경로는 localhost:3000/members/~

const express = require('express');
const router = express.Router();

// 라우팅 메소드 구현

// 회원가입 웹페이지 요청과 응답 처리 라우팅 메소드
// localhost:3000/members/regist
// 클라이언트에서 get 방식으로 요청이 오면 라우팅메소드도 get()메소드로 받아야 하고
// post 방식으로 클라이어트 주소를 요청해 오면 post 메소드로 받아야한다.
// 클라이언트가 get 방식으로 요청한다는것은 최초로 웹브라우저 주소창에 직접 url 주소를 입력해서 요청하는 경우
router.get('/regist',(req, res) => {
    res.render('member/regist.ejs')
});

// 회원가입 페이지에서 잔달되는 회원 가입 정보를 추출해서 회원 정보를 등록 처리 요청에 응답하는 라우팅 메소드
// localhost:3000/members/regist
// 라우팅 메소드는 반드시 동일 호출주소 체계와 호출 방식이 동일해야한다
router.post('/regist',(req, res)=>{
//     사용자가 회원가입폼에서 입력힌 데이터를 추출해서 DB 에 저장하고 완료하면 특정 웹페이지로 브라우저 웹페이지를 이동시킨다.
//     form 태그에 post 방식으로 전달되는 폼데이터는 req 객체의 body 속성으로 추출할수 있씁니다.
//     req 는 httpRequest 객체로 웹브라우저에서 넘어오는 모든 정보를 서버에서 추출할수 있어요.
//     req.body 폼태그내 html name 속성값으로 입력값을 추출한다.
    let email = req.body.email;
    let name = req.body.name;
    let pw = req.body.password;

//     모델을 통해서 DB 에 저장했다고 칩시다.
//     회원가입후에는 메인페이지로 사용자 브라우저로 이동시킨다.
//     redirect(이동시킬 주소 url) 뷰파일 경로 x
    res.redirect('/')
    // res.redirect('https://www.naver.com')
});

// 가입회원 목록 웹페이지 요청 및 응답 처리 라우팅 메소드
router.get('/list',(req,res)=>{
    res.render('member/list.ejs');
})

// 로그인 웹페이지 요청과 응답처리 라우팅 메소드
// localhost:3000/members/login
router.get('/login',(req, res)=>{
    res.render('member/login')
});
// 로그인후 보여줄 사용자 프로필 웹페이지 요청및 응답처리 라우팅 메소드 정의
// localhost:3000/members/profile

router.get('/profile',(req,res)=>{
    // req.query 라는 속성을 통해 url 내 쿼리스트링 방식으로 전달되는 키의 값을 추출합니다.
    let userId = req.query.uid;
    let test = req.query.test;

    // res.render('뷰파일의 경로','뷰파일에 전달할 json 객체(생략가능))
    res.render('member/profile.ejs',({uid : userId, userName : '이지수', email : 'test@tset.com'}))
});
// 로그인후 보여줄 사용자 프로필 웹페이지 요청 및 응답처리 라우팅 메소드 정의 : 파라미터 방식

// localhost:3000/members/profile/1
// 파라미터 방식으로 url 을 통해 데이터가 전달되는 경우 와일드 카드를 정의해서 데이터를 추출한다.
// 와일드 카드란 주소체계 안에 /:키 명 전달 하는 방식을 말한다.
router.get('/profile/:uid',(req,res)=>{
    // 와일드 카드에 정의된 키값으로 url 에 전달된 1이란 값을 추출합니다.
    // 파라미터 방식으로 값이 전달되면 req.params 라는 속성에 와일드 카드 키명으로 값을 추출한다
    let uid = req.params.uid
    let userName = '이지수2';
    let email = 'test2@test.com'
    res.render('member/profile.ejs',({uid,userName,email}))
});
// 단일 회원정보 데이터 요청과 응답을 처리하는 REST API 라우팅 메소드 정의
// localhost:3000/members/data/profile?uid=1
router.get('/data/profile',(req,res)=>{
    let uid = req.query.uid;

    // DB 에서 uid 기준으로 소화해온 단일 사용자 json 데이터
    let userData = {
        uid : uid,
        userName : '이지수',
        email : 'test@test.com',
    };

//     DB 에서 가져온 userData 를 클라이언트에게 응답 결과물로 제공한다.
    res.json(userData);
});

// 모든 회원 데이터 요청과 응답을 처리하는 RESTAPI 라우팅 메소드 정의
// localhost:3000/members/data/users/all
router.get('/data/users/all',(req,res)=>{
    // DB 에서 ORM 통해 전체 회원 데이터를 조회해줍니다.
    let userList = [
        {
            uid : 1,
            userName : '이지수1',
            email : 'test1@test.com',
        },
        {
            uid : 2,
            userName : '이지수2',
            email : 'test2@test.com',
        },
        {
            uid : 3,
            userName : '이지수3',
            email : 'test3@test.com',
        },
    ];
    res.json(userList);
});


module.exports = router;
