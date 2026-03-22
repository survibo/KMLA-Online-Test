# Chat Message

## Purpose

`message` block은 채팅 화면 전체가 아니라 메시지 박스 배열 영역만 표현하는 block이다.

## Rule

- 기본 규칙은 `chat` 도메인 공용 타입과 UI 조각을 따른다.
- 다만 이 block은 긴 대화 데이터 확인이 중요하므로 mock 길이에 한해 예외를 둔다.
- 즉, `message/mock.ts`는 다른 block보다 데이터가 길어져도 괜찮고, 긴 대화 흐름 검증을 위해 block-local base thread data를 직접 가질 수 있다.
- 이 block의 mock은 `src/blocks/chat/mock.ts`를 직접 source of truth로 삼지 않아도 되며, 긴 메시지 실험을 위한 독립 샘플 세트를 유지할 수 있다.
- 이 예외는 `message` block 전용 규칙이며 전역 mock 규칙을 바꾸지 않는다.
- `room` block은 이 메시지 흐름을 그대로 감싸는 화면이므로, `message/mock.ts`를 재사용하는 상위 shell로 취급한다.
- 상단 헤더와 하단 입력창은 이 block 책임에 포함하지 않는다.
- 시간 문자열은 raw ISO를 직접 노출하지 않고 formatter로 보여준다.
- 연속된 같은 발신자 메시지는 세로 간격을 거의 붙여서 보여주고, 새 묶음이 시작될 때만 간격을 크게 둔다.
- 연속 메시지 묶음에서는 벽 쪽 corner radius를 줄여서 버블 흐름이 이어져 보이게 만든다.
- 메시지 버블 폭은 가능한 한 텍스트 길이에 맞추고, 아바타는 버블 밀도를 해치지 않는 작은 크기를 유지한다.
- 텍스트 크기는 가능하면 `rem` 기반으로 유지해 전역 font scale 조절에 함께 반응하도록 한다.
