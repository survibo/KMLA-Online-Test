# Group Post List

## Purpose

`GroupPostList`는 특정 그룹 안의 게시글 목록 화면 레이아웃을 담당하는 block이다.

이 block은 그룹 헤더와 목록 컨테이너를 담당하고, 실제 게시글 내용은 기존 `GroupPostCard`를 그대로 사용한다.
필요하면 상단에 선택형 모드 버튼도 함께 렌더링할 수 있다.

## Data Contract

입력 데이터는 아래 구조를 전제로 한다.

- 그룹 정보: `GroupPostListGroup`
- 각 게시글: `GroupPost`

현재 기준:

- 그룹 필드는 `groups` 스키마를 따라 `name`, `description`, `is_official`, `is_personal`, `created_at`를 유지한다.
- 그룹 안의 각 게시글은 `GroupPostCard`로 렌더링한다.
- 이 block은 게시글 내부 형식을 다시 정의하지 않는다.
- 목록 mock은 `src/blocks/group/mock.ts`의 raw group/post 데이터를 source of truth로 사용한다.
- 따라서 목록은 card mock을 복제하지 않고, 같은 raw post를 목록용으로 projection한다.
- `modes`, `activeModeId`, `postModeById`는 목록 헤더용 UI 상태이므로 block projection에서만 선택적으로 추가한다.

## Rendering Rules

이 block의 로컬 규칙은 아래와 같다.

- 상단 헤더는 그룹 제목과 주요 액션만 보여준다.
- 다크 모드에서 헤더는 본문과 완전히 같은 검정 바탕으로 붙지 않도록 한 톤 올라간 surface로 유지한다.
- 필요할 때만 헤더 아래에 `팝니다 / 삽니다` 같은 거래 모드 버튼을 추가하되, UI는 기존 둥근 버튼 톤을 유지하고 상태만 토글처럼 하나씩 선택되게 둔다.
- 목록 본문은 카드 컴포넌트를 그대로 세로로 쌓는다.
- 댓글 drawer 열림 상태와 `comments=<postId>` query param 동기화는 목록 block이 한 번만 관리하고, 실제 댓글 drawer도 목록 하단에서 단일 인스턴스로 렌더링한다.
- 게시글 `...` menu drawer도 `menu=<postId>` query param과 함께 목록 block이 단일 인스턴스로 관리한다.
- 이 block은 "목록 껍데기" 역할까지만 맡는다.

## Files

- `index.tsx`: 그룹별 게시글 목록 block 본체
- `mock.ts`: 기준 group fixture와 카드 기반 생성 helper
- `mock.scenarios.ts`: 목록 밀도 실험용 시나리오
- `types.ts`: 그룹 목록용 타입
- `README.md`: 목록 block 규칙과 사용법

## Mock Workflow

mock을 바꿔가며 실험할 때는 아래 순서를 권장한다.

1. `mock.ts`는 도메인 raw mock에서 목록용 group/post projection만 계산한다.
2. 목록 길이, 모드 버튼 유무, preview route 기반 로딩 확인 같은 실험은 `mock.scenarios.ts`에서 scenario로 분리해 관리하고, 로딩 확인은 필요할 때만 별도 query flag로 켠다.
3. 카드 구조가 바뀌더라도 목록 mock은 복제가 아니라 같은 raw post를 읽도록 유지한다.
4. preview에서 볼 케이스는 `active...Scenario` 하나만 고르면 되게 유지한다.

## Example

```tsx
import { GroupPostList } from "@/blocks/group/post-list"
import { activeGroupPostListScenario } from "@/blocks/group/post-list/mock.scenarios"

export function Example() {
  return <GroupPostList group={activeGroupPostListScenario.group} />
}
```
