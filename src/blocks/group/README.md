# Group Shared

## Purpose

`group` 폴더는 group 도메인 block들이 함께 쓰는 공용 타입과 raw mock data를 관리한다.

현재 이 폴더는 아래 책임을 가진다.

- `types.ts`: group 공용 데이터 타입
- `mock.ts`: group, post, image, comment, reaction 공용 raw mock data와 projection helper
- `shared.tsx`: group post 계열 block이 함께 쓰는 공용 UI 조각
- `post-card/`: 목록 카드 block
- `post-detail/`: 게시글 상세 block
- `post-list/`: 게시글 목록 block

## Rule

- 여러 block이 함께 쓰는 group 도메인 규칙은 이 폴더 기준으로 관리한다.
- 특정 block 전용 규칙은 각 block의 `README.md`에 남긴다.
- 여러 block이 같은 post/comment를 공유하므로 도메인 루트 `mock.ts`를 raw data source of truth로 사용한다.
- post-card/post-detail/post-list block의 `mock.ts`는 raw mock을 block props 형태로 projection하는 역할에 집중한다.
- post-card 기준으로 재사용 가능한 post UI는 `shared.tsx`로 올리고, block 전용 표현만 각 block 내부에 둔다.
- 간격은 `space-x-*`, `space-y-*`보다 `gap`, `margin`, `padding`으로 명시적으로 표현한다.
- 공용 타입이나 raw mock 구조가 바뀌면 이를 사용하는 post-card/post-detail/post-list block도 함께 점검한다.
- 도메인 안의 개별 block은 각 폴더에서 `index.tsx`, `mock.ts`, `mock.scenarios.ts`, `types.ts`, `README.md`를 기본 단위로 유지한다.
