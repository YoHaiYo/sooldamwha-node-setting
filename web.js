/// web.js
const express = require("express");
const path = require("path"); // 주소관련 메서드

const nodeserver = express(); // web.js에만 정의!
const port = process.env.PORT || 8001;

/// 서버에서 쓰는 중요 키워드2개. 보안상의 이유로 이렇게 사용한다.
// __dirname : 디렉토리이름, __filename : 파일이름

// 리액트 build폴더 올리기
nodeserver.use(express.static(path.join(__dirname, 'build')))  // web.js에만 정의!
nodeserver.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
});

// json보내기
nodeserver.use(express.static(path.join(__dirname, ''))) // web.js와 같은 경로상 지정
nodeserver.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname, 'data/sdhdata.json')) // 같은 경로의 있는 sdhdata.json 사용 ! 
});


// 존재하지 않는 URL 접근할때 보여줄 페이지 (404 Error)
// 라우터들 중에 최하위로 써야 됨!
nodeserver.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'html/nopage.html'))
})

// listen 제일아래 쓰기 ! 
nodeserver.listen(port, () => { // web.js에만 정의!
  console.log(`${port} 포트로 정상 구동`);
  console.log(`__dirname : `, __dirname)
});