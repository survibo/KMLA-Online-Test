# Project Guide

## Purpose

이 문서는 프로젝트 전체에 공통으로 적용되는 작업 규칙을 정의한다.

목표:

- 작업 순서 통일
- 파일 구조 통일
- 타입, mock, 문서 업데이트 강제
- block 작업 시 점검 항목 누락 방지

특정 기능이나 화면에만 적용되는 규칙은 여기 넣지 않는다.

## Scope

포함:

- 프로젝트 전반의 작업 원칙
- 파일 구조 규칙
- 타입, mock, 문서화 기준
- UI 구성 기준
- 스키마 변경 절차
- block 수정 시 공통 점검 항목

제외 (별도 문서로 분리):

- 특정 기능 하나에만 적용되는 상세 정책
- 특정 화면의 임시 의사결정
- 일회성 메모

## Rule Priority

규칙 충돌 시 우선순위:

1. `SCHEME.md`
2. 이 문서
3. 도메인 문서
4. 각 block의 `README.md`

특정 block에만 적용되는 규칙은 해당 block `README.md`가 최종 기준이다.

## Session Start Rule

새 작업이나 요청이 들어오면 먼저 `AGENTS.md` 기준으로 판단하고 진행한다.
중요한 전역 규칙은 이 문서를 우선 기준으로 재확인한다.

## Documentation Rule

새 합의가 생기면 가장 가까운 위치의 md 파일에 기록한다.

기록 위치:

- block 전용 규칙: `src/blocks/<block-name>/README.md`
- 도메인 내부 block 전용: `src/blocks/<domain>/<block-name>/README.md`
- 여러 block이 공유하는 도메인 규칙: 루트의 별도 md 파일
- 전체 프로젝트 공통 규칙: `AGENTS.md`
- 데이터 구조 기준: `SCHEME.md`

판단:

- 여러 기능에 공통 → `AGENTS.md`
- 특정 도메인에만 해당 → 도메인 문서
- 특정 block에만 해당 → 해당 block의 `README.md`

## Naming Rule

그룹 게시글 관련 block과 타입은 `community` 대신 `group` 접두어를 사용한다.

예:

- `group-post-card`, `group-post-detail`, `group-post-list`
- `GroupPost`, `GroupComment`, `GroupPostHeader`
- `src/blocks/group-post/types.ts`, `src/blocks/group-post/shared.tsx`

## Working Style

작업 순서:

1. 현재 코드와 관련 문서를 먼저 읽는다.
2. 스키마나 구조 기준이 있으면 그것을 우선한다.
3. 공통 컴포넌트로 해결 가능한지 먼저 본다.
4. 서비스 고유 표현이면 block 단위로 구현한다.
5. 변경 후에는 타입, mock, 문서까지 함께 맞춘다.

금지:

- 화면만 고치고 끝내기
- block만 고치고 mock이나 문서 방치
- 스키마와 어긋나는 이름 임의 사용

## Encoding Rule

Windows 환경에서 한글 파일을 다룰 때, 터미널 출력 깨짐과 실제 파일 손상을 동일하게 취급하지 않는다.

반드시 지킬 것:

- PowerShell 출력만 보고 한글이 깨졌다고 단정하지 않는다.
- 깨져 보이는 터미널 출력값을 그대로 복사해 재사용하지 않는다.
- 구조 수정이 목적이면 ASCII 기준 문맥과 `apply_patch`를 우선 사용한다.
- 한글 파일은 가능하면 UTF-8 기준으로 읽는다.

권장:

- `Get-Content -Encoding utf8 <path>`
- PowerShell 세션의 입출력 인코딩을 UTF-8로 설정
- IDE 표시와 터미널 표시가 다르면 파일 원문 기준으로 판단

터미널에서만 mojibake처럼 보이는 경우 실제 파일은 정상 UTF-8일 수 있다.
이때 "문자열 복구" 작업을 바로 하지 말고, 출력 경로 인코딩 문제인지 먼저 확인한다.

## Schema First

데이터 shape는 `SCHEME.md`를 우선 기준으로 삼는다.

반드시 지킬 것:

- 컬럼명은 스키마와 최대한 맞춘다.
- 시간 필드는 `created_at`, `updated_at`, `deleted_at` 형태를 유지한다.
- 스키마의 캐시 컬럼은 프론트에서도 그 의미를 존중한다.
- 화면 전용 계산값은 raw data와 분리해서 다룬다.
- `dbdiagram`으로 표현하기 어려운 제약은 `SCHEME.md`의 `Note`에 남기고, 구현 단계에서 보완한다.

## TypeScript Rule

TypeScript는 유지한다.

이유:

- 스키마 기준 구조와 UI 전용 계산값을 구분하기 쉽다.
- mock data와 실제 응답 구조의 차이를 빨리 발견할 수 있다.
- 리팩터링 시 깨지는 지점을 빨리 찾을 수 있다.

권장 방향: schema-aligned type → API DTO type → UI ViewModel

처음부터 완벽히 분리하지 않아도 되지만, 새 기능을 만들수록 위 방향에 가까워져야 한다.

## Data and Mock Rule

mock data는 단순 샘플이 아니라 실제 응답을 흉내 내는 테스트 데이터다.

반드시 지킬 것:

- 실제 API 응답처럼 작성하며, id와 정렬 기준 필드를 포함한다.
- 스키마의 캐시 컬럼은 mock에도 반영한다.
- 화면 로직이 해당 mock만 보고도 실제 흐름을 검증할 수 있어야 한다.
- raw data와 UI 전용 계산값을 섞지 않는다.
- mock은 "화면용 더미"가 아니라 "실제 응답 재료 + 그 재료를 가공한 결과"로 본다.

권장 흐름:

```
raw mock data → block mock projection → mock scenario
```

각 단계:

- raw mock data: 실제 스키마/API 응답에 최대한 가까운 원재료
- block mock projection: raw mock을 block props에 맞게 가공한 값
- mock scenario: raw mock 일부를 바꾸고 projection을 재계산한 완성 케이스

도메인 단위 mock 구조:

- 여러 block이 같은 데이터를 공유하면 각 block마다 base mock을 복제하지 않는다.
- 도메인 루트에 schema-aligned raw mock data를 둔다. (`src/blocks/<domain>/mock.ts`)
- 도메인 루트 `mock.ts`에는 raw data와 이를 조회/계산하는 helper를 둔다.
- raw mock에는 join 결과나 화면 전용 계산값을 미리 넣지 않는다. (프론트 실험에 꼭 필요한 경우에만 제한적으로 허용)
- unread, latest item, display text, 정렬 결과 같은 파생값은 반드시 projection에서 계산한다.

파일 역할:

- 도메인 루트 `mock.ts`: raw mock data + 도메인 공용 selector/helper
- block `mock.ts`: raw mock을 block props에 맞는 projection으로 가공
- block `mock.scenarios.ts`: raw mock override + projection 조합으로 완성된 실험 케이스

반드시 지킬 것:

- block `mock.ts`는 raw data를 독립적으로 복제하지 않는다.
- block `mock.ts`는 "렌더링 직전 형태" 계산에 집중한다.
- `mock.scenarios.ts`는 raw mock 일부만 바꾸고 projection helper를 다시 호출해 결과를 만든다.
- 어떤 경우에도 projection 계산 경로는 한 곳으로 유지한다. (scenario마다 계산식을 흩뿌리지 않는다.)
- edge case는 base mock이 아닌 scenario에서 표현한다.
- 같은 도메인의 두 번째 block부터는 도메인 루트 raw mock 구조를 우선 검토한다.

판단 기준:

- 단일 block 단기 실험 → block 내부 base mock으로 시작 가능
- 같은 도메인에서 여러 block이 같은 엔티티 공유 → 도메인 루트 raw mock 우선
- unread, latest item, count, 정렬 같은 파생값이 중요 → 반드시 projection helper에서 계산

이름 규칙:

- `sample...`보다 `base...`, `create...`, `active...Scenario`를 우선한다.
- `mock.scenarios.ts`에는 이름 있는 scenario 상수를 먼저 정의하고, 필요하면 배열로 묶는다.
- preview에서 바꿔볼 수 있도록 `active...ScenarioIndex`와 `active...Scenario`를 둘 수 있다.
- `active...ScenarioIndex` 옆에는 유효 인덱스 범위와 총 scenario 개수를 주석으로 남긴다.

mock 재점검이 필요한 경우:

- 스키마나 타입이 바뀐 경우
- 렌더링 로직이 새 필드를 기대하는 경우
- raw mock과 projection 규칙이 어긋난 경우

## UI Rule

`shadcn/ui`는 공통 인터랙션 레이어로 사용한다.

우선 검토: `Button`, `Avatar`, `Card`, `DropdownMenu`, `Dialog`, `Drawer`, `Tabs`, `Popover`, `Separator`, `Input`, `Textarea`

직접 구현이 적절한 경우:

- 서비스 고유 레이아웃
- block 중심 화면
- 표현 자체가 중요한 UI

판단: 범용 상호작용 → `shadcn/ui` / 서비스 표현 → block 조합

추가 규칙:

- preview에서 모바일 기기 화면이나 앱 캔버스를 흉내 내는 바깥 wrapper를 임의로 추가하지 않는다.
- 예: `min-h-screen`, `bg-muted`, `px-*`, `py-*`, `max-w-*`, `rounded-*`, `border` 조합으로 "폰 프레임처럼 보이게" 감싸는 패턴
- block UI를 보여주는 목적이면 우선 block 자체를 그대로 렌더링한다.

## Router Rule

라우팅은 당분간 명시적 route 설정 파일 방식을 우선한다.

- route 정의는 별도 파일에서 한 번에 관리한다. (예: `src/routes.jsx`)
- 파일명/폴더명 기반 자동 URL 매핑은 기본 선택지로 두지 않는다.
- 읽기 쉬운 수동 선언을 우선하고, 필요할 때만 중첩 구조를 추가한다.

시나리오 preview 라우팅:

- 시나리오 선택 화면과 실제 block 화면을 분리한다.
- block 진입 전 목록 화면에서 block과 scenario를 먼저 선택한다.
- block 안에서는 preview 전용 wrapper를 최소화하고 실제 화면과 동일하게 표시한다.

권장 흐름:

```
/scenarios → /scenarios/group → /scenarios/group/post-card?scenario=2
```

## Block Structure

기본 구조:

```text
src/blocks/<block-name>/
  index.tsx
  mock.ts
  mock.scenarios.ts
  types.ts
  README.md
```

도메인 단위 block 구조:

```text
src/blocks/<domain>/
  README.md
  mock.ts        (필요시)
  shared.tsx     (필요시)
  types.ts       (필요시)
  styles.css     (정말 꼭 필요시)
  something/
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
- `README.md`: 규칙, 사용법, 결정사항

추가 원칙:

- 공통 타입이나 공용 조각은 block 바깥으로 분리할 수 있다.
- 같은 도메인 안에서 강하게 결합된 block은 `src/blocks/<domain>/` 아래로 묶는다.
- 이때 도메인 공용 타입, UI 조각, 스타일 토큰은 도메인 폴더 루트에 둔다.
- 도메인 안의 개별 block도 각자 기본 파일 구조를 유지한다.

공용 파일 예:

- `src/blocks/group-post/types.ts` (공통 타입)
- `src/blocks/chat/mock.ts` (공통 raw mock)
- `src/blocks/group-post/shared.tsx` (공통 UI 조각)
- `src/blocks/group-post/styles.css` (공통 스타일 토큰)
- `src/lib/datetime.ts` (공용 시간 포맷터)

스타일 구조 원칙:

- 공용 스타일 토큰은 도메인 폴더 내부 CSS 파일에 모은다.
- block 본체에는 의미 있는 class명과 레이아웃 class만 남기고, 도메인 전용 표현은 도메인 CSS로 분리한다.
- 기본 색상과 surface 스타일은 `src/index.css`에 정의된 전역 토큰(`background`, `foreground`, `card`, `text-*`, `border`, `primary` 등)을 우선 사용한다.
- 다크 모드에서도 동일한 색상을 유지해야 하는 경우에만 예외적으로 하드코딩 색상을 사용한다.
- 단일 block 작업에서 JSX/Tailwind로 충분히 읽히면 `styles.css`를 만들지 않는다.
- `styles.css`는 여러 selector가 얽히거나, JSX에 두면 의미가 흐려지는 규칙이 누적될 때만 만든다.

CSS로 분리하는 기준:

- 같은 도메인에서 두 번 이상 반복되는 표현
- 색상, radius, hover/focus 톤처럼 한 번에 바뀔 가능성이 큰 값
- drawer 방향 selector, data attribute selector, 복합 hover/focus 상태처럼 JSX에서 읽기 어려운 규칙
- 버튼, 댓글 박스, 입력창, surface 등 의미 있는 UI 표현

JSX/Tailwind에 남겨도 되는 것: 단일 파일 내 단순 레이아웃, flex/grid 배치, 국소 spacing

공용 CSS는 꼭 필요할 때만 사용한다. 사용자가 명시적으로 요청한 경우에는 그 방향을 따른다.

시간 표시 규칙:

- raw ISO 문자열을 직접 UI에 뿌리지 않는다.
- 공용 formatter를 우선 사용한다. (절대 시각: `formatIsoDateTime` / 상대 시각: `formatRelativeTime`)

## Block Change Rule

`src/blocks` 아래 파일을 수정할 때 항상 함께 점검:

- `types.ts` — 현재 props와 data shape를 아직 설명하는가
- `mock.ts` — 새 구조와 규칙을 반영하는가
- `mock.scenarios.ts` — 실험 케이스를 읽기 쉽게 설명하는가
- `README.md` — 현재 동작과 결정사항을 설명하는가

preview 연동:

- 시나리오가 추가되거나 이름/구조가 바뀌면 preview 진입점도 함께 점검한다.
- 시나리오 선택 페이지: `src/ScenarioPreview.jsx`
- block 예시 진입점: `src/Example.jsx`

`mock.scenarios.ts`만 수정하고 preview 연결을 빠뜨리지 않는다.
block 변경은 `index.tsx`만 수정하고 끝내지 않는다.

## Local Decision Rule

특정 기능에만 적용되는 규칙은 이 문서가 아닌 해당 위치에 문서화한다.

예:

- 댓글 depth 처리 방식
- 특정 카드의 이미지 정책
- 특정 block의 카운트 계산 방식
- 특정 mock의 데이터 의미

기록 위치:

- 기본은 해당 block의 `README.md`


## When Updating Schema

`SCHEME.md`가 바뀌면 함께 점검:

1. 공통 타입
2. block 타입
3. mock data
4. 렌더링 로직
5. 관련 문서

스키마 변경은 문서 한 파일 수정으로 끝내지 않는다.

## Before Finishing Work

- build가 통과하는가
- 타입과 mock이 맞는가
- 문서가 현재 합의와 어긋나지 않는가
- block을 수정했다면 `types.ts`, `mock.ts`, `mock.scenarios.ts`, `README.md`를 확인했는가

## Fast Checklist

- 코드와 문서를 먼저 읽었는가
- `SCHEME.md` 기준과 어긋나지 않는가
- 공통 조각으로 해결 가능한 부분을 먼저 봤는가
- block을 건드렸다면 `types.ts`, `mock.ts`, `mock.scenarios.ts`, `README.md`까지 확인했는가
- 시나리오를 바꿨다면 `src/ScenarioPreview.jsx`와 `src/Example.jsx`도 확인했는가
- 시간 문자열을 직접 뿌리지 않고 formatter를 썼는가
- build와 mock 정합성을 마지막에 확인했는가
- 터미널에서 한글이 깨져 보여도 실제 파일 손상으로 단정하지 않았는가

## Summary

이 문서는 전체 흐름을 위한 공통 가이드다.
세부 정책은 작업할 때마다 관련 위치의 md 파일에 남긴다.

새 규칙 추가 전 판단:

- 프로젝트 전반에 공통인가 → `AGENTS.md`에 추가
- 특정 도메인/block에만 해당하는가 → 해당 기능 문서에 추가
