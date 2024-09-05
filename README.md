# React(javascript,vite) + SWC 보일러 플레이팅

---

## ⚙️ Installation

```
$ yarn
```

## ▶️ Run

```
$ yarn dev
```

## 💡 Usage

### Routing

#### router

- [react-router](https://reactrouter.com/en/main) v6을 기반으로 작성되었음
- `src/routes/path.js` : 전체 URL 경로 정의
- `src/routes/[대메뉴 단위로 생성한 라우트 파일].jsx` : 메뉴 레벨에 맞게 추가 작성
- `src/routes/index.jsx` : 대메뉴 단위로 생성한 라우트를 `useRoutes()`에 추가

### MUI Customization

#### defaultProps

- `src/theme/overrides/defaultProps.js` : MUI 컴포넌트의 기본 `props` 를 재정의할 수 있음
- https://mui.com/material-ui/customization/theme-components/#theme-default-props

#### styleOverrides

- `src/theme/overrides` : MUI 컴포넌트의 디자인 스타일을 재정의할 수 있음
- https://mui.com/material-ui/customization/theme-components/#theme-style-overrides

#### palette

- [Eva-Design-System](https://colors.eva.design/)
