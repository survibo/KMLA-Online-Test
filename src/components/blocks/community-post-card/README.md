# Community Post Card

`CommunityPostCard`는 게시글 목록에서 사용하는 요약 카드입니다.

## Files

- `index.tsx`: 카드 컴포넌트 본체
- `mock.ts`: 단일 카드 렌더링용 예시 데이터
- `types.ts`: 이 컴포넌트에서 사용하는 로컬 타입 별칭

## Example

```tsx
import { CommunityPostCard } from "@/components/blocks/community-post-card"
import { sampleCommunityPostCardPost } from "@/components/blocks/community-post-card/mock"

export function Example() {
  return <CommunityPostCard post={sampleCommunityPostCardPost} />
}
```
