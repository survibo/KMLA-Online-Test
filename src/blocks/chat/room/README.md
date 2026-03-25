# Chat Room

## Purpose

`room` block은 채팅방 전체 화면을 담당한다.

## Rule

- 대화 내용 자체는 `message` block을 재사용한다.
- `room/mock.ts`는 `message/mock.ts`를 source of truth로 사용한다.
- 이 의존 관계는 의도된 block-local 예외다.
- 즉, `room`은 `chat` 도메인 raw mock에서 다시 projection하는 block이 아니라, 긴 대화 검증용 `message` 데이터를 감싸는 화면 shell 역할을 우선한다.
- 따라서 `message/mock.ts`가 독립 base thread data를 가질 때 `room/mock.ts`도 그 데이터를 그대로 재사용한다.
- 이 규칙은 `room` block 전용이며, `room-card`나 `room-list` 같은 다른 chat block의 raw mock 구조 기준을 바꾸지 않는다.
- room은 상단 header와 하단 입력 shell만 책임지고, 메시지 배치 로직은 `message` block에 두는 것을 우선한다.
- 하단 입력창은 모바일/패드 가상 키보드에서 엔터 키를 전송 동작에 기대지 않도록 `textarea + 전송 버튼` 조합을 기본으로 둔다.
