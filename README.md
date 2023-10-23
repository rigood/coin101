# 💰 Coin101

- https://rigood.github.io/coin101
- `Coinpaprika API`를 이용하여 상위 `101개 코인 순위`와 해당 코인에 대한 `차트, 가격 정보`를 제공합니다.

<br>

|                     메인                      |                         차트                         |                         가격                         |
| :-------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: |
| <img src="readme/main.png" alt="메인페이지"/> | <img src="readme/chart.png" alt="상세페이지(차트)"/> | <img src="readme/price.png" alt="상세페이지(가격)"/> |

<br>

## 1. 프로젝트 소개

- `react-query` 사용법을 익히고, `apexcharts`를 통해 데이터 시각화를 연습하기 위한 프로젝트입니다.

#### 개발 일정

- 2022.09.06~2022.09.09 개발
- 2023.07.11~2023.07.12 리팩토링

<br>

## 2. 주요 기능

<img src="readme/메인화면.gif" width="300"/>

- **API 요청**을 통해 상위 101개 코인 목록을 가져옵니다.
- 최초에는 **로딩 이미지**가 표시되며, 그 이후에는 **데이터가 캐싱**됩니다.
- CSS animation으로 상단 **배너 슬라이드**(앱 로고+유튜브 링크)를 구현하였습니다.
- 페이지 우측 하단에 스크롤 맨 위로 이동할 수 있는 **TOP 버튼**을 배치하였습니다.
- **styled-components, recoil**를 이용하여 **다크모드**를 구현하였으며, 부드럽게 전환되도록 transition을 적용하였습니다.
  - recoil을 통해 다크모드 상태값(isDark atom)을 전역 관리하고,
  - styled-components의 ThemeProvider에 다크모드 상태값에 따라 theme 적용

<br>

<img src="readme/코인상세화면.gif" width="300"/>

- URL에서 coinID를 추출하여, **API 요청**을 통해 코인 상세정보를 가져옵니다.
- 최초에는 **로딩 이미지**가 표시되며, 그 이후에는 **데이터가 캐싱**됩니다.
- **apexcharts**를 이용하여 최근 2주간의 가격 흐름을 **Candlestick**로 나타냈습니다.
- Candlestick 정보가 없는 경우, **에러 문구를 표시**하였습니다.
- Price 탭에서는 상세 가격정보를 확인할 수 있으며, 상승/하락 여부에 따라 색상을 적용하였습니다.
- **react-tooltip**을 사용하여, 용어 설명을 나타내었습니다.

<br>

## 3. 기술 스택

- React
- TypeScript
- React-query
- Apexcharts
- React-router-dom
- Recoil
- Styled-components
- React-tooltip

<br>

## 4. 폴더 구조

```
📦 root
├─ 📦 public
│  ├─ 📂 assets
│  └─ 📜 index.html
└─ 📦 src
   ├─ 📂 assets
   │  └─ 📂 images
   ├─ 📂 components
   │  └─ 📂 Buttons
   │  └─ 📂 CardSlide
   │  └─ 📂 Chart
   │  └─ 📂 Layout
   │  └─ 📂 Loader
   │  └─ 📂 Price
   ├─ 📂 pages
   │  ├─ 📜 Coin.tsx
   │  ├─ 📜 Coins.tsx
   ├─ 📂 styles
   │  ├─ 📜 GlobalStyle.tsx
   │  ├─ 📜 theme.ts
   ├─ 📂 types
   ├─ 📂 utils
   ├─ 📜 App.tsx
   └─ 📜 index.tsx
   └─ 📜 Router.tsx
   └─ 📜 api.ts // react-query에서 사용할 data 모음
   └─ 📜 atoms.ts // recoil 상태값 모음
   └─ 📜 utils.ts
```

<br>

## 5. 업데이트 기록

### 2023.07.11 업데이트 내역

#### 리팩토링

- 컴포넌트 분리
- 폴더 구조 정리
- 삼항연산자를 사용하여 조건문 축약
- react-query의 select 옵션을 사용하여 응답받은 63,100개 코인 목록 중 101개 코인만 추출  
  (기존: 컴포넌트를 렌더링 할 때 slice 메서드를 이용하여 101개 추출)

#### 기능 추가

- 코인 상세페이지 진입 시 차트 바로 보여주기 (기존: 차트 탭 클릭 시 차트 표시)
- Candlestick x축에 날짜 레이블 표시
- Candlestick에 최근 2주간의 가격 자료만 표시
- useQuery의 select를 통해 응답 받은 데이터 가공(최근 2주일 자료만 필터링)
- 다크모드 전환 시 트랜지션 적용

#### 버그 수정

- [react-query의 refetchInterval 옵션 삭제 (API 한도량 초과 방지)](https://github.com/rigood/coin101/issues/1)
- [차트 정보가 존재하지 않는 코인에 대한 API 에러 핸들링](https://github.com/rigood/coin101/issues/2)
