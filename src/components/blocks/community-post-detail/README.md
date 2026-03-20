# Community Post Detail

`CommunityPostDetail`은 게시글 상세와 댓글 목록을 함께 렌더링하는 블록입니다.

## Files

- `index.tsx`: 상세 컴포넌트 본체
- `mock.ts`: 상세 화면 예시 게시글과 댓글 데이터
- `types.ts`: 이 컴포넌트에서 사용하는 로컬 타입 별칭

## Example

```tsx
import { CommunityPostDetail } from "@/components/blocks/community-post-detail"
import {
  sampleCommunityPostDetailComments,
  sampleCommunityPostDetailPost,
} from "@/components/blocks/community-post-detail/mock"

export function Example() {
  return (
    <CommunityPostDetail
      post={sampleCommunityPostDetailPost}
      commentItems={sampleCommunityPostDetailComments}
    />
  )
}
```
