# Project Guide

## Goal

이 프로젝트의 목표는 학교 커뮤니티/채팅 서비스를 빠르게 화면으로 검증할 수 있는 프론트엔드 기반을 만드는 것이다.

우리는 다음을 지향한다.

- 실제 서비스에 가까운 UI를 빠르게 만든다.
- 단순 데모가 아니라 나중에 API 연결로 자연스럽게 이어질 수 있게 만든다.
- 컴포넌트 구조, 목데이터 구조, 파일 구조를 일관되게 유지한다.
- 디자인 자유도를 잃지 않으면서도 반복 구현 비용은 줄인다.

## UI Philosophy

이 프로젝트는 `shadcn/ui`를 "완성된 화면 라이브러리"로 쓰지 않는다.

대신 다음처럼 사용한다.

- `shadcn/ui`는 버튼, 카드, 다이얼로그, 토스트, 드롭다운처럼 접근성과 상호작용이 중요한 기본 부품에 사용한다.
- 실제 서비스 화면은 Tailwind와 도메인 컴포넌트로 직접 조합해서 만든다.
- 커뮤니티 카드, 게시글 상세, 채팅 버블, 피드 레이아웃 같은 것은 우리 서비스에 맞게 직접 만든다.

즉, `shadcn`은 기반이고 화면 자체는 우리가 만든다.

## When To Use Shadcn

다음 상황에서는 `shadcn/ui`를 우선 검토한다.

- `Button`
- `Input`
- `Textarea`
- `Dialog`
- `Sheet`
- `Popover`
- `DropdownMenu`
- `Tabs`
- `Select`
- `Toast`
- `Card`
- `Badge`

다음 상황에서는 직접 구현을 우선한다.

- 서비스 고유 레이아웃
- 카드 조합형 피드 UI
- 게시글/댓글/채팅처럼 도메인 맥락이 강한 블록
- 화면별 이미지 배치
- 복합적인 모바일 레이아웃

원칙은 간단하다.

- 접근성/상호작용 난이도가 높은 공통 UI는 `shadcn`
- 서비스 표현 자체는 직접 구현

## Component Structure

블록 컴포넌트는 폴더 단위로 관리한다.

기본 구조는 아래를 따른다.

```text
src/components/blocks/<component-name>/
  index.tsx
  mock.ts
  types.ts
  README.md
```

각 파일의 역할은 다음과 같다.

- `index.tsx`: 컴포넌트 본체
- `mock.ts`: 예시 데이터
- `types.ts`: 이 컴포넌트에서 쓰는 로컬 타입 별칭 또는 전용 타입
- `README.md`: 사용 목적과 예시

공통 타입과 공용 조합 컴포넌트는 폴더 밖에 둔다.

- `src/components/blocks/community-post-types.ts`
- `src/components/blocks/community-post-shared.tsx`

## Data Principle

목데이터는 단순히 화면만 맞추는 더미가 아니라 실제 DB/API와 이어질 수 있는 형태를 지향한다.

가능하면 다음 원칙을 따른다.

- 필드명은 실제 스키마와 가깝게 유지한다.
- `created_at`, `updated_at`, `deleted_at` 같은 DB 스타일 필드명을 그대로 쓴다.
- `post_images`, `post_reactions`, `comment_reactions`처럼 관계 구조를 드러내는 이름을 선호한다.
- 화면 렌더링 편의를 위해 필요한 경우 조인 결과 형태의 `author` 같은 객체는 허용한다.

즉, "DB row 그대로"보다 "실제 프론트에서 받을 법한 응답"에 가깝게 만든다.

## Styling Principle

- Tailwind를 기본 스타일 도구로 사용한다.
- 한 번만 쓰는 레이아웃은 컴포넌트 안에서 직접 표현한다.
- 반복되는 스타일 패턴만 공통 컴포넌트로 승격한다.
- 스타일보다 의미가 먼저다. 이름은 도메인 기준으로 짓는다.

## Current Direction

현재 방향은 다음과 같다.

- `shadcn/ui`는 기반 부품으로 사용
- 서비스 화면은 직접 설계
- 컴포넌트는 폴더 단위로 관리
- 목데이터는 실제 스키마와 최대한 비슷하게 유지
- 나중에 API 연결 시 목데이터를 교체하기 쉽게 설계

## Nice To Have Later

- 공통 블록 템플릿 추가
- 목데이터 네이밍 규칙 통일
- `scheme.md`와 실제 타입 간 매핑 문서 추가
- 컴포넌트 추가 체크리스트 문서화
