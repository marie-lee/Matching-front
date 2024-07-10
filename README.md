# React(javascript,vite) + SWC 보일러 플레이팅

---

### 패키지 다운로드

```
$ yarn
```

### 실행

```
$ yarn dev
```

### src 폴더 구조

```
assets : 폰트, 이미지등 파일 모아둔 페이지
components : 큰 컴포넌트 추가 되어있음. 페이지에서 쓰는 컴포넌트들은 page안에 폴더에서 컴포넌트 폴더 새로 만들어서 거기다 추가하기
contexts : X
hooks  : X
layouts : 헤더 메인페이지 게스트 페이지 등의 레이아웃을 잡아둔 페이지 따로 더 작업할 필요 없음
pages : 각종 페이지들 만들 때 여기서 만들기 기존에 있던거면 페이지만 추가하고 새로운거면 폴더생성해서 작업하기
routes : 각 페이지 또는 폴더별 이동 루트 정리되어 있는곳. 루트 설정 또는 루트 주소 보려면 여기서 보기
services : API리스트들 모아둔곳 스웨거에 있는 api쓸때 해당 위치에서 먼저 만들고나서 export해서 가져다 쓰기
store : 상태관리를 위한 리덕스 관련 내용들이 들어있음.
style : X
theme : 각종 공통 코드들 모아둔곳 (ex : 텍스트 사이즈, 크기 등, 색상 등등)
```
