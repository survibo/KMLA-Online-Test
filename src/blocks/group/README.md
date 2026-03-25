# Group Shared

## Purpose

`group` 폴더는 group 도메인 block들이 함께 쓰는 공용 타입과 raw mock data를 관리한다.

현재 이 폴더는 아래 책임을 가진다.

- `types.ts`: group 공용 데이터 타입
- `mock.ts`: group, post, image, comment, reaction 공용 raw mock data와 projection helper
- `shared.tsx`: group post 계열 block이 함께 쓰는 공용 UI 조각
- `photo-viewer/`: group post gallery에서 여는 이미지 viewer route
- `post-card/`: 목록 카드 block
- `post-detail/`: 게시글 상세 block
- `post-list/`: 게시글 목록 block

## Rule

- 여러 block이 함께 쓰는 group 도메인 규칙은 이 폴더 기준으로 관리한다.
- 특정 block 전용 규칙은 각 block의 `README.md`에 남긴다.
- 여러 block이 같은 post/comment를 공유하므로 도메인 루트 `mock.ts`를 raw data source of truth로 사용한다.
- post-card/post-detail/post-list block의 `mock.ts`는 raw mock을 block props 형태로 projection하는 역할에 집중한다.
- post-card 기준으로 재사용 가능한 post UI는 `shared.tsx`로 올리고, block 전용 표현만 각 block 내부에 둔다.
- post header의 공용 trailing action이 여러 block에서 같다면 `shared.tsx`에 올리고, 특정 block만 다를 때만 로컬 override를 둔다.
- post header는 바깥을 클릭 가능한 큰 버튼으로 감싸지 않고, 아바타 버튼과 trailing `...` 버튼처럼 실제 액션 단위로 분리한다.
- 공용 post action이 modal, dialog, drawer를 열면 trigger focus가 루트에 남지 않도록 열기 직전에 blur 처리한다.
- 목록이나 상세처럼 post가 여러 개이거나 route와 강하게 묶인 화면에서는 post menu drawer를 부모에서 단일 인스턴스로 관리하고, 뒤로가기 UX가 필요하면 `menu` 같은 짧은 query param으로 열림 상태를 동기화한다.
- 공용 gallery 이미지는 클릭 시 `/photo?image=<imageId>` route 기반 viewer를 열고, 여러 장이면 같은 viewer 안에서 순서대로 이동할 수 있게 두며, viewer 상단 액션에서 현재 이미지를 바로 다운로드할 수 있게 둔다.
- 여러 block이 같은 댓글 트리 계산을 공유하면 도메인 루트 helper로 올려서 정렬/맵/카운트 경로를 한 곳에 둔다.
- 공용 타입이나 raw mock 구조가 바뀌면 이를 사용하는 post-card/post-detail/post-list block도 함께 점검한다.
- 도메인 안의 개별 block은 각 폴더에서 `index.tsx`, `mock.ts`, `mock.scenarios.ts`, `types.ts`, `README.md`를 기본 단위로 유지한다.
- 라이트/다크 모드를 함께 고려해야 하는 surface/border는 `background`, `muted`, `border` 같은 의미 토큰을 우선 사용한다.
- 일반 텍스트 계층은 surface 토큰과 분리해서 `text-strong`, `text-soft`, `text-faint` 같은 전용 텍스트 토큰을 우선 사용한다.
