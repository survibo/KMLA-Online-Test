# Group Post List

## Purpose

`GroupPostList`는 특정 그룹 안의 게시글 목록 화면 레이아웃을 담당하는 block이다.

이 block은 그룹 헤더와 목록 컨테이너를 담당하고, 실제 게시글 내용은 기존 `GroupPostCard`를 그대로 사용한다.

## Data Contract

입력 데이터는 아래 구조를 전제로 한다.

- 그룹 정보: `GroupPostListGroup`
- 각 게시글: `GroupPost`

현재 기준:

- 그룹 필드는 `groups` 스키마를 따라 `name`, `description`, `is_official`, `is_personal`, `created_at`를 유지한다.
- 그룹 안의 각 게시글은 `GroupPostCard`로 렌더링한다.
- 이 block은 게시글 내부 형식을 다시 정의하지 않는다.
- 목록 mock도 `group-post/card`에서 쓰는 `GroupPost` mock을 재사용한다.
- 따라서 카드에서 쓰는 `post_comments`, `comment_count` 같은 댓글 관련 mock도 함께 복제된다.

## Rendering Rules

이 block의 로컬 규칙은 아래와 같다.

- 상단 헤더는 그룹 제목과 주요 액션만 보여준다.
- 목록 본문은 카드 컴포넌트를 그대로 세로로 쌓는다.
- 이 block은 "목록 껍데기" 역할까지만 맡는다.

## Files

- `index.tsx`: 그룹별 게시글 목록 block 본체
- `mock.ts`: 기준 group fixture와 카드 기반 생성 helper
- `mock.scenarios.ts`: 목록 밀도 실험용 시나리오
- `types.ts`: 그룹 목록용 타입
- `README.md`: 목록 block 규칙과 사용법

## Mock Workflow

mock을 바꿔가며 실험할 때는 아래 순서를 권장한다.

1. `mock.ts`는 base group fixture와 `group-post/card` 기반 생성 helper만 둔다.
2. 목록 길이나 밀도 실험은 `mock.scenarios.ts`에 이름 있는 scenario로 추가한다.
3. 카드 mock 구조가 바뀌면 목록 mock도 그 구조를 그대로 복제하는지 함께 점검한다.
4. preview에서 볼 케이스는 `active...Scenario` 하나만 고르면 되게 유지한다.

## Example

```tsx
import { GroupPostList } from "@/blocks/group-post/list"
import { activeGroupPostListScenario } from "@/blocks/group-post/list/mock.scenarios"

export function Example() {
  return <GroupPostList group={activeGroupPostListScenario.group} />
}
```
