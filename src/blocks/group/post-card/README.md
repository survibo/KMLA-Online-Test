# Group Post Card

## Purpose

`GroupPostCard`는 그룹 게시글 목록에서 사용하는 요약형 block이다.

이 block은 게시글의 핵심 정보만 보여준다.

- 작성자
- 작성 시각
- 제목
- 본문 일부
- 대표 이미지 1장
- 최신 댓글 1개 미리보기
- 반응 수와 댓글 수

## Data Contract

이 block은 `GroupPost` 기반 데이터를 받는다.

현재 기준:

- `post.reaction_count`가 있으면 좋아요 수는 그 값을 우선 사용한다.
- `post.comment_count`는 `post.post_comments`의 최상위 댓글 수와 맞춰 유지한다.
- `post.post_comments`는 drawer용 전체 댓글을 유지하고, 카드 안의 최신 댓글 1개 미리보기는 최상위 댓글만 대상으로 렌더링 단계에서 계산한다.
- 대표 이미지는 `post_images.sort_order asc` 기준 첫 번째 항목을 사용한다.
- block mock은 `src/blocks/group/mock.ts`의 raw post/comment/reaction을 source of truth로 사용한다.

권장:

- `post_images`는 mock/API에서 미리 `sort_order asc` 기준으로 정렬되어 있거나,
- 필요하면 렌더링 직전에 정렬해서 사용한다.

## What Stays Local To This Block

아래 규칙은 이 block 가까이에 유지한다.

- 목록 카드에서 보여줄 정보 범위
- 대표 이미지 선택 방식
- 최신 댓글 미리보기 방식
- 댓글 버튼을 눌렀을 때 여는 댓글 drawer UI
- 댓글 drawer에서 답글을 기본 접기 상태로 둘지와 `답글 보기` 토글 방식
- 카드와 댓글 drawer가 공유하는 스타일 토큰과 CSS class 이름
- 카드 본체와 댓글 drawer의 책임 분리 방식
- 목록 카드의 타이포 밀도
- 목록용 mock data shape

이 규칙들은 공통 가이드가 아니라 이 block 문서에서 관리한다.

## Files

- `index.tsx`: 목록 카드 본체
- `comments-drawer.tsx`: 카드에서 여는 댓글 drawer 전용 컴포넌트
- `mock.ts`: 기준이 되는 base mock과 생성 helper
- `mock.scenarios.ts`: 이미지 유무 같은 실험용 시나리오 mock
- `types.ts`: 목록 카드용 타입 alias
- `../types.ts`: group 공용 타입

## Mock Workflow

mock을 바꿔가며 실험할 때는 아래 순서를 권장한다.

1. `mock.ts`는 도메인 raw mock에서 카드용 projection만 계산한다.
2. 이미지 유무, 댓글 미리보기 유무 같은 변형은 `mock.scenarios.ts`에서 raw override 후 projection을 다시 계산한다.
3. 목록 레이아웃 검증은 scenario 이름만 보고도 상태를 알 수 있어야 한다.

## Example

```tsx
import { GroupPostCard } from "@/blocks/group/post-card"
import {
  activeGroupPostCardScenario,
} from "@/blocks/group/post-card/mock.scenarios"

export function Example() {
  return <GroupPostCard post={activeGroupPostCardScenario.post} />
}
```
