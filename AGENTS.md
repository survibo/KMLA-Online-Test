# Project Guide

## Purpose

이 문서는 프로젝트 전체에 공통으로 적용되는 작업 규칙을 정의한다.

이 문서의 목표:

- 작업 순서를 통일한다.
- 파일 구조를 통일한다.
- 타입, mock, 문서 업데이트를 함께 강제한다.
- block 작업 시 빠뜨리기 쉬운 점검 항목을 줄인다.

이 문서는 "공통 규칙"만 다룬다.
특정 기능이나 특정 화면에만 적용되는 규칙은 여기 넣지 않는다.

## Scope

이 문서에 포함할 것:

- 프로젝트 전반의 작업 원칙
- 파일 구조 규칙
- 타입, mock, 문서화 기준
- UI 구성 기준
- 스키마 변경 시 따라야 할 절차
- block 수정 시 공통 점검 항목

이 문서에 포함하지 않을 것:

- 특정 기능 하나에만 적용되는 상세 정책
- 특정 화면의 임시 의사결정
- 일회성 메모

위 내용은 별도 문서로 분리한다.

## Rule Priority

규칙 충돌 시 아래 우선순위를 따른다.

1. `scheme.md`
2. 이 문서
3. 도메인 문서
4. 각 block의 `README.md`

단, 어떤 규칙이 특정 block에만 적용된다면 그 규칙은 block `README.md`가 정답이다.

## Session Start Rule

새 작업이나 새 요청이 들어오면 먼저 `AGENTS.md` 기준으로 판단하고 진행한다.

기억이 흐려질 수 있으므로, 중요한 전역 규칙은 이 문서를 우선 기준으로 다시 확인한다.

## Documentation Rule

새 합의가 생기면 가장 가까운 위치의 md 파일에 기록한다.

기록 위치 기준:

- block 전용 규칙: `src/blocks/<block-name>/README.md`
- 도메인 내부 block 전용 규칙: `src/blocks/<domain>/<block-name>/README.md`
- 여러 block이 공유하는 도메인 규칙: 루트의 별도 md 파일
- 전체 프로젝트 공통 규칙: `AGENTS.md`
- 데이터 구조 기준: `scheme.md`

판단 기준:

- 여러 기능에 공통이면 `AGENTS.md`
- 특정 도메인에만 해당하면 도메인 문서
- 특정 block에만 해당하면 해당 block의 `README.md`

## Naming Rule

그룹 게시글 관련 block과 타입은 `community` 대신 `group` 접두어를 사용한다.

예:

- `group-post-card`
- `group-post-detail`
- `group-post-list`
- `GroupPost`
- `GroupComment`
- `GroupPostHeader`

공용 조각도 같은 기준을 따른다.

예:

- `src/blocks/group-post/types.ts`
- `src/blocks/group-post/shared.tsx`

## Working Style

모든 작업은 가능하면 아래 순서를 따른다.

1. 현재 코드와 관련 문서를 먼저 읽는다.
2. 스키마나 구조 기준이 있으면 그것을 우선한다.
3. 공통 컴포넌트로 해결 가능한지 먼저 본다.
4. 서비스 고유 표현이면 block 단위로 구현한다.
5. 변경 후에는 타입, mock, 문서까지 함께 맞춘다.

핵심 원칙:

- 화면만 고치고 끝내지 않는다.
- block만 고치고 mock이나 문서를 방치하지 않는다.
- 스키마와 어긋나는 이름을 임의로 만들지 않는다.

## Encoding Rule

Windows 환경에서 한글 파일을 읽거나 점검할 때는 "터미널 출력이 깨져 보이는 것"과 "실제 파일이 깨진 것"을 같은 의미로 취급하지 않는다.

반드시 지킬 것:

- PowerShell 출력만 보고 한글 문자열이 깨졌다고 단정하지 않는다.
- 한글 문자열을 수정할 때는 깨져 보이는 터미널 출력값을 그대로 복사해 재사용하지 않는다.
- 구조 수정이 목적이면 한글 본문보다 ASCII 기준 문맥과 `apply_patch`를 우선 사용한다.
- 한글이 포함된 파일을 읽을 때는 가능하면 UTF-8 기준으로 읽는다.

권장 방식:

- `Get-Content -Encoding utf8 <path>`
- PowerShell 세션의 입력/출력 인코딩을 UTF-8로 맞춘다.
- IDE에서 정상 표시되는 문자열과 터미널 표시가 다르면, 터미널 출력 대신 파일 원문 기준으로 판단한다.

주의:

- 터미널에서만 mojibake처럼 보이는 경우에도 실제 파일은 정상 UTF-8일 수 있다.
- 이 경우 "문자열 복구" 작업을 바로 하지 말고, 먼저 출력 경로 인코딩 문제인지 확인한다.

## Schema First

데이터 shape는 가능하면 `scheme.md`를 우선 기준으로 삼는다.

반드시 지킬 것:

- 컬럼명은 스키마와 최대한 맞춘다.
- 시간 필드는 `created_at`, `updated_at`, `deleted_at` 같은 이름을 유지한다.
- 스키마에 있는 캐시 컬럼은 프론트에서도 그 의미를 존중한다.
- 화면 전용 계산값은 raw data와 분리해서 다룬다.

보완 원칙:

- `dbdiagram`으로 표현하기 어려운 제약은 `scheme.md`의 `Note`에 남긴다.
- 실제 구현 단계에서는 그 제약을 별도로 보완한다.

## TypeScript Rule

TypeScript는 유지한다.

이유:

- 스키마 기준 구조와 UI 전용 계산값을 구분하기 쉽다.
- mock data와 실제 응답 구조의 차이를 빨리 발견할 수 있다.
- 리팩터링 시 깨지는 지점을 빨리 찾을 수 있다.

권장 방향:

- schema-aligned type
- API DTO type
- UI ViewModel

현재 원칙:

- 처음부터 완벽히 분리하지 않아도 된다.
- 하지만 새 기능을 만들수록 위 방향에 가까워져야 한다.

## Data and Mock Rule

mock data는 단순 샘플이 아니라 실제 응답을 흉내 내는 테스트 데이터다.

반드시 지킬 것:

- 실제 API 응답처럼 작성한다.
- 가능한 한 id를 포함한다.
- 정렬 기준이 필요한 필드는 mock에도 넣는다.
- 스키마에 있는 캐시 컬럼은 mock에도 반영한다.
- 화면 로직이 그 mock만 보고도 실제 흐름을 검증할 수 있어야 한다.

구조 규칙:

- `mock.ts`는 "재료" 파일이다.
- `mock.ts`에는 base mock과 생성 helper만 둔다.
- `mock.scenarios.ts`는 "완성된 실험 케이스" 파일이다.
- 실험용 변형은 `mock.scenarios.ts`에 둔다.
- base mock은 실제 응답에 가깝게 유지한다.
- edge case는 scenario에서 표현한다.

이름 규칙:

- 가능하면 `sample...`보다 `base...`, `create...`, `active...Scenario`를 우선한다.
- `mock.scenarios.ts`에는 이름 있는 scenario 상수를 먼저 만들고, 필요하면 배열로 묶는다.
- preview에서 바로 바꿔볼 수 있도록 `active...ScenarioIndex`와 `active...Scenario`를 둘 수 있다.
- `active...ScenarioIndex` 옆에는 가능한 인덱스 범위와 총 scenario 개수를 주석으로 남긴다.

mock을 반드시 다시 점검해야 하는 경우:

- 스키마가 바뀐 경우
- 타입이 바뀐 경우
- 렌더링 로직이 새 필드를 기대하는 경우

## UI Rule

`shadcn/ui`는 공통 인터랙션 레이어로 사용한다.

우선 검토 대상:

- `Button`
- `Avatar`
- `Card`
- `DropdownMenu`
- `Dialog`
- `Drawer`
- `Tabs`
- `Popover`
- `Separator`
- `Input`
- `Textarea`

직접 구현이 더 적절한 경우:

- 서비스 고유 레이아웃
- block 중심 화면
- 표현 자체가 중요한 UI

판단 기준:

- 범용 상호작용은 `shadcn/ui`
- 서비스 표현은 block 조합

## Block Structure

block 기본 구조:

```text
src/blocks/<block-name>/
  index.tsx
  mock.ts
  mock.scenarios.ts
  types.ts
  README.md
```

도메인 단위 block 구조를 쓰는 경우 권장 기본 구조:

```text
src/blocks/<domain>/
  README.md
  shared.tsx 필요시
  types.ts 필요시
  styles.css 필요시
  something/
    index.tsx
    mock.ts
    mock.scenarios.ts
    types.ts
    README.md
  something2/
    index.tsx
    mock.ts
    mock.scenarios.ts
    types.ts
    README.md
```

파일 역할:

- `index.tsx`: block 본체
- `mock.ts`: 기준 샘플과 생성 helper
- `mock.scenarios.ts`: 실험용 preset mock
- `types.ts`: block 전용 타입
- `README.md`: block 규칙, 사용법, 결정사항

추가 원칙:

- `mock.scenarios.ts`는 선택 사항이다.
- 하지만 mock을 자주 바꿔가며 실험하는 block이면 두는 쪽을 권장한다.
- 공통 타입이나 공용 조각은 block 바깥으로 분리할 수 있다.
- 여러 block이 같은 도메인 안에서 강하게 결합되어 있으면 `src/blocks/<domain>/...` 아래로 함께 묶는다.
- 이 경우 도메인 공용 타입, 공용 UI 조각, 공용 스타일 토큰은 도메인 폴더 루트에 둔다.
- 도메인 안에 있는 개별 block도 각자 `index.tsx`, `mock.ts`, `mock.scenarios.ts`, `types.ts`, `README.md`를 기본 단위로 유지한다.

공용 파일 예:

- 공통 타입: `src/blocks/group-post/types.ts`
- 공통 UI 조각: `src/blocks/group-post/shared.tsx`
- 공통 스타일 토큰: `src/blocks/group-post/styles.css`
- 공용 시간 포맷터: `src/lib/datetime.ts`

스타일 구조 원칙:

- 공용 스타일 토큰은 도메인 폴더 내부 CSS 파일에 모은다.
- 반복되는 색상, surface, action button, drawer 같은 표현은 가능한 한 그 CSS에서 이름 있는 class로 관리한다.
- block 본체에는 의미 있는 class 이름과 레이아웃 class만 남기고, 도메인 전용 표현은 도메인 CSS로 모은다.

CSS로 분리하는 기준:

- 같은 도메인 안에서 두 번 이상 반복되는 표현이면 CSS로 분리한다.
- 핵심 색상, radius, hover/focus 톤처럼 한 번에 바뀔 가능성이 큰 값은 CSS 토큰이나 이름 있는 class로 둔다.
- drawer 방향 selector, data attribute selector, 복합 hover/focus 상태처럼 JSX에서 읽기 어려운 규칙은 CSS로 둔다.
- 버튼, 댓글 박스, 입력창, surface처럼 의미 있는 UI 표현은 CSS class 이름으로 관리한다.
- 반대로 파일 하나에서만 쓰는 단순 레이아웃, flex/grid 배치, 국소 spacing은 JSX/Tailwind에 남겨도 된다.

시간 표시 규칙:

- raw ISO 문자열을 직접 UI에 뿌리지 않는다.
- 공용 formatter를 우선 사용한다.

예:

- 절대 시각: `formatIsoDateTime`
- 상대 시각: `formatRelativeTime`

## Block Change Rule

`src/blocks` 아래 파일을 수정할 때는 아래 항목을 항상 함께 점검한다.

필수 점검 파일:

- `types.ts`
- `mock.ts`
- `mock.scenarios.ts` (있다면)
- `README.md`

필수 질문:

- 타입이 현재 props와 데이터 shape를 아직 설명하는가
- base mock이 새 구조와 새 규칙을 반영하는가
- scenario mock이 실험 케이스를 읽기 쉽게 설명하는가
- README가 현재 동작과 결정사항을 설명하는가

preview 연동 규칙:

- 시나리오가 추가되거나 이름/구조가 바뀌면 preview 진입점도 함께 점검한다.

현재 기준:

- 시나리오 선택 페이지: `src/ScenarioPreview.jsx`
- block 예시 진입점: `src/Example.jsx`

즉, `mock.scenarios.ts`만 수정하고 preview 연결을 빼먹지 않는다.

핵심:

- block 변경은 `index.tsx`만 수정하고 끝내지 않는다.

## Local Decision Rule

특정 기능에만 적용되는 규칙이 생기면 이 문서에 추가하지 말고 해당 위치에 문서화한다.

예:

- 댓글 depth 처리 방식
- 특정 카드의 이미지 정책
- 특정 block의 카운트 계산 방식
- 특정 mock의 데이터 의미

기록 위치:

- 기본은 해당 block의 `README.md`
- 여러 block이 공유하면 루트 별도 문서

예:

- `group-guidelines.md`
- `chat-guidelines.md`
- `data-contracts.md`

## When Updating Schema

`scheme.md`가 바뀌면 아래를 같이 점검한다.

1. 공통 타입
2. block 타입
3. mock data
4. 렌더링 로직
5. 관련 문서

핵심:

- 스키마 변경은 문서 한 파일 수정으로 끝내지 않는다.

## Before Finishing Work

가능하면 아래를 확인한다.

- build가 통과하는가
- 타입과 mock이 맞는가
- 문서가 현재 합의와 어긋나지 않는가
- block을 수정했다면 관련 `types.ts`, `mock.ts`, `mock.scenarios.ts`, `README.md`를 확인했는가

## Fast Checklist

작업 중 빠르게 확인할 때는 아래만 보면 된다.

- 먼저 코드와 문서를 읽었는가
- `scheme.md` 기준과 어긋나지 않는가
- 공통 조각으로 해결 가능한 부분을 먼저 봤는가
- block을 건드렸다면 `types.ts`, `mock.ts`, `mock.scenarios.ts`, `README.md`까지 같이 봤는가
- 시나리오를 바꿨다면 `src/ScenarioPreview.jsx`와 `src/Example.jsx`도 확인했는가
- 시간 문자열을 직접 뿌리지 않고 formatter를 썼는가
- build와 mock 정합성을 마지막에 확인했는가

- 터미널에서 한글이 깨져 보여도 실제 파일 손상으로 단정하지 않았는가

## Summary

이 문서는 전체 흐름을 위한 공통 가이드다.

세부 정책은 작업할 때마다 관련 위치의 md 파일에 남긴다.

새 규칙을 추가할 때는 먼저 아래를 판단한다.

- 이 규칙이 프로젝트 전반에 공통인가
- 아니면 특정 도메인, 특정 block에만 해당하는가

후자라면 `AGENTS.md`가 아니라 해당 기능 문서에 적는다.
