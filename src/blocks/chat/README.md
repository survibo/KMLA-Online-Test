# Chat Shared

## Purpose

`chat` 폴더는 채팅 계열 block들이 함께 쓰는 공용 타입, 공용 UI 조각, 스타일 토큰을 관리한다.

현재 기본 구조는 아래 책임을 가진다.

- `types.ts`: chat room, member, message 공용 데이터 타입
- `mock.ts`: chat 도메인 공용 raw mock data와 selector/helper
- `shared.tsx`: 아바타, 방 제목, 시간 표시 같은 공용 UI 조각
- `styles.css`: bubble, unread badge, surface 같은 공용 표현
- `message/`: 긴 채팅 대화 흐름 block
- `room-card/`: 채팅방 목록 카드
- `room-list/`: 채팅방 목록 화면
- `room/`: 채팅방 전체 화면

## Rule

- 공통 데이터 shape는 `scheme.md`의 `chat_rooms`, `chat_room_members`, `messages`를 우선 기준으로 둔다.
- 공용 mock은 실제 API 응답처럼 room/member/message를 분리한 raw data를 먼저 유지한다.
- 공용 raw mock에는 가능하면 join 결과를 미리 넣지 않고, helper에서 `user`, `sender` 같은 projection을 계산한다.
- 각 block mock은 공용 raw mock에서 최신 메시지, unread 여부 같은 UI projection을 계산해서 쓴다.
- `message` block은 대화 흐름 확인이 중요하므로 mock 길이와 샘플 구성에 한해 block-local 예외를 둘 수 있다.
- 이 예외에서는 `message/mock.ts`가 도메인 raw mock을 그대로 재사용하지 않고, 긴 대화 검증을 위한 독립 base thread data를 직접 가질 수 있다.
- `room` block은 화면 shell보다 메시지 흐름 재현을 우선하므로, 이 경우에 한해 `message/mock.ts`를 그대로 재사용하는 파생 block으로 둔다.
- 위 두 예외는 `chat` 도메인 전체 규칙을 뒤집는 것이 아니라 `message`와 `room` block에만 적용되는 로컬 규칙이다.
- block 전용 계산값은 각 block의 `types.ts`에서 분리한다.
- 공용 스타일이나 타입이 바뀌면 이를 사용하는 `room-card`, `room-list`, `room`, `message`를 함께 점검한다.
- 공용 아바타는 `shared.tsx`에서 표시 방식만 통일하고, 실제 크기는 각 사용처의 `className`에서 결정한다.
- 시간 문자열은 raw ISO를 직접 뿌리지 않고 공용 formatter를 사용한다.
- 라이트/다크 모드를 함께 고려해야 하는 surface/border는 `background`, `muted`, `border`, `primary` 같은 의미 토큰을 우선 사용한다.
- 일반 텍스트 계층은 surface 토큰과 분리해서 `text-strong`, `text-soft`, `text-faint` 같은 전용 텍스트 토큰을 우선 사용한다.
