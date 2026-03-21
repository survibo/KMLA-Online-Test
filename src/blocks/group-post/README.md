# Group Post Shared

## Purpose

`group-post` 폴더는 group post 계열 block들이 함께 쓰는 공용 타입, UI 조각, 스타일 토큰을 모아 둔다.

현재 이 폴더는 아래 책임을 가진다.

- `types.ts`: group post 공용 데이터 타입
- `shared.tsx`: 카드와 상세에서 재사용하는 공용 UI 조각
- `styles.css`: 댓글/액션 계열 공용 스타일과 색상 토큰
- `card/`: 목록 카드 block
- `detail/`: 게시글 상세 block
- `list/`: 게시글 목록 block

## Rule

- 여러 block이 함께 쓰는 group post 규칙은 이 폴더 기준으로 관리한다.
- 특정 block 전용 규칙은 각 block의 `README.md`에 남긴다.
- 공용 타입이나 스타일 구조가 바뀌면 이를 사용하는 card/detail/list block도 함께 점검한다.
- 도메인 안의 개별 block은 각 폴더에서 `index.tsx`, `mock.ts`, `mock.scenarios.ts`, `types.ts`, `README.md`를 기본 단위로 유지한다.
