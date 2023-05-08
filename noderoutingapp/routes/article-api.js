// 게시글 정보처기 전용 RESTFUL API 라우터 파일
// 기본 주소 경로는 localhost:3000/api/articles

const express = require('express');
const router = express.Router();

// 게시글 저체목록조회 요청/응답 API 라우팅 메소드
router.get('/list',async (req, res) =>{
    let article = [
        {
            aid : 1,
            title : '게시글 제목1',
            content : '게시글 내용 1',
            view_cnt : 10,
            ip_address:'111.111.111.111',
            display_yn : 'Y',
            modify_date : Date.now(),
            modify_userid : 'eddy'
        },{
            aid : 2,
            title : '게시글 제목2',
            content : '게시글 내용2',
            view_cnt : 20,
            ip_address:'222.222.222.222',
            display_yn : 'Y',
            modify_date : Date.now(),
            modify_userid : 'eddy2'
        },{
            aid : 3,
            title : '게시글 제목3',
            content : '게시글 내용3',
            view_cnt : 10,
            ip_address:'333.333.333.333',
            display_yn : 'N',
            modify_date : Date.now(),
            modify_userid : 'eddy3'
        },
    ]
//     클라이언트에 JSON 데이터 응답처리
    res.json(article);
})
// 단일 게시글 등록 처리 요청/응답 API 라우팅 메소드
router.post('/create',async (req, res) =>{
//     프론트엔드에서 단일 게시글 json 데이터 전달
    console.log(req.body.title)
    let title = req.body.title;
    let contents = req.body.content;
    let display_yn = req.body.display_yn;

    let article = {
        aid : 100,
        title : title,
        content : contents,
        view_cnt : 0,
        ip_address:'111.111.111.111',
        display_yn : display_yn,
        modify_date : Date.now(),
        modify_userid : 'eddy'
    }

    res.json(article)
})
// 단일 게시글 정보 조회 요청 및 응답 API 라우팅 메소드
// 와일드 카드 형식으로 정의되는 API 는 최하단에 정의한다.
router.get('/modify',async (req, res) =>{
    let articles = req.query.aid
    let article = {
        aid : 1,
        title : '제목1',
        content : '내용1',
        view_cnt : 0,
        ip_address:'111.111.111.111',
        display_yn : 'N',
        modify_date : Date.now(),
        modify_userid : 'eddy'
    }
    res.json(article)
})
// 단일 게시글 수정 처리 요청/응답 API 라우팅 메소드
router.post('/modify',async (req, res) =>{
    let articleIdx = req.query.aid;
    let title = req.body.title;
    let content = req.body.content;
    let display_yn = req.body.display_yn;

    let article = {
        aid : articleIdx,
        title,
        content,
        display_yn,
        modify_date : Date.now(),
        modify_userid : 'eddy'
    }
    let result = {
        code:200,
        message:'수정 완료',
        data : null
    }
    res.json(result);
})
// 단일 게시글 삭제 처리 요청/응답 API 라우팅 메소드
router.post('/api/article/delete',(req, res) =>{

})

module.exports = router;