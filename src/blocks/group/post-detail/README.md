# Group Post Detail

## Purpose

`GroupPostDetail`은 그룹 게시글 상세 화면과 댓글 목록을 함께 렌더링하는 block이다.

이 block은 단순 표시 컴포넌트가 아니라, 댓글 트리와 화면 전용 파생값을 함께 다룬다.

## Data Contract

입력 데이터는 아래 구조를 전제로 한다.

- 게시글: `GroupPost`
- 댓글 목록: `GroupComment[]`

현재 스키마 기준에서 우선 사용하는 값:

- 게시글 좋아요 수: `reaction_count`
- 게시글 댓글 수: `comment_count` (최상위 댓글 수)
- 댓글 답글 수: `reply_count` (직계 답글 수)
- 이미지 정렬 기준: `post_images.sort_order`

캐시 컬럼이 없을 때만 화면에서 fallback 계산을 허용한다.

## Rendering Rules

이 block의 로컬 규칙은 아래와 같다.

- 댓글 트리는 `parent_id` 기준으로 구성한다.
- 댓글은 `created_at asc` 기준으로 정렬해서 렌더링한다.
- 대댓글의 대댓글 작성 시에는 최상위 댓글에 대한 답글로 정규화한다고 가정한다.
- 따라서 UI는 실질적으로 한 단계 답글까지만 다루는 단순 구조를 유지한다.
- 댓글 아이콘 숫자는 direct child count 기준이다.
- 대표 액션 버튼은 `shadcn/ui`의 `Button` 기반으로 유지한다.
- 상세 제목 타이포는 목록 카드와 과하게 벌어지지 않도록 같은 밀도 범위를 유지한다.
- 게시글 헤더, 본문, 이미지, 액션 영역은 `src/blocks/group/shared.tsx`의 공용 post summary를 카드와 같은 폭/패딩 기준으로 그대로 사용한다.

이 규칙은 공통 가이드가 아니라 이 block에서 관리한다.

## Transformation Boundary

이 block에서는 화면 전용 계산만 수행한다.

포함:

- 댓글 트리 평탄화
- depth 기반 들여쓰기 제어
- `reply_count` fallback 계산
- 상세 화면용 댓글 순서 계산

포함하지 않음:

- 권한 필터링
- 서버 조인
- soft delete 정책 결정
- 캐시 컬럼 계산

그런 책임은 서버 또는 API 계층에 둔다.

## Files

- `index.tsx`: 상세 화면 본체
- `mock.ts`: 기준이 되는 base mock과 생성 helper
- `mock.scenarios.ts`: 실험용 시나리오 preset 모음
- `types.ts`: 상세 화면용 타입 alias

## Mock Workflow

mock을 바꿔가며 실험할 때는 아래 순서를 권장한다.

1. `mock.ts`는 `src/blocks/group/mock.ts`의 raw mock을 상세 props로 projection하는 역할에 집중한다.
2. 실험 케이스는 `mock.scenarios.ts`에 별도 scenario로 추가한다.
3. 새 시나리오는 무엇을 검증하려는지 `label`과 `description`으로 드러낸다.
4. 렌더링 fallback을 시험할 때만 count 캐시를 의도적으로 비운다.

즉, 기본 샘플을 계속 덮어쓰지 않고 "기준 mock + 실험용 시나리오"로 나눠서 관리한다.

## Example

```tsx
import {
  activeGroupPostDetailScenario,
} from "@/blocks/group/post-detail/mock.scenarios"
import { GroupPostDetail } from "@/blocks/group/post-detail"

export function Example() {
  return (
    <GroupPostDetail
      post={activeGroupPostDetailScenario.post}
      commentItems={activeGroupPostDetailScenario.commentItems}
    />
  )
}
```
