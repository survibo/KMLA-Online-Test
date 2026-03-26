# AGENTS.md

## 규칙 우선순위

충돌 시 아래 순서를 따른다.

1. `SCHEME.md`
2. 이 문서
3. 도메인 문서
4. 각 block의 `README.md`

특정 block에만 적용되는 규칙은 해당 block `README.md`가 최종 기준이다.

---

## 절대 금지

아래 행동은 어떤 경우에도 하지 않는다.

- 화면(index.tsx)만 수정하고 `types.ts`, `mock.ts`, `mock.scenarios.ts`, `README.md` 방치
- `mock.scenarios.ts`만 수정하고 `src/ScenarioPreview.jsx`, `src/scenario-registry.jsx` 미확인
- 스키마(`SCHEME.md`)와 어긋나는 컬럼명 임의 사용
- raw ISO 문자열을 formatter 없이 직접 UI에 출력
- preview에 `min-h-screen`, `bg-muted`, `rounded-*`, `border` 등을 조합해 폰/앱 프레임처럼 감싸는 wrapper 추가
- TypeScript를 제거하거나 `.js`로 변환
- 터미널에서 한글이 깨져 보인다는 이유만으로 파일을 재작성하거나 문자열 복구 시도
- 깨진 터미널 출력값을 그대로 복사해 파일에 재사용
- block `mock.ts`에서 raw data를 독립적으로 복제
- `mock.scenarios.ts`에서 projection 계산식을 각 scenario마다 따로 작성 (계산 경로는 하나)
- raw mock data에 join 결과나 화면 전용 계산값을 미리 삽입 (프론트 실험에 꼭 필요한 경우 제외)

---

## 작업 시작 시 반드시 할 것

1. 현재 코드와 관련 문서를 먼저 읽는다.
2. `SCHEME.md`를 확인하고 스키마 기준과 어긋나지 않는지 검토한다.
3. 공통 컴포넌트(`shadcn/ui` 또는 기존 공용 조각)로 해결 가능한지 먼저 본다.
4. 서비스 고유 표현이면 block 단위로 구현한다.
5. 새 합의가 생기면 작업 완료 전에 가장 가까운 위치의 md 파일에 기록한다.

---

## 파일 구조

### 단일 block

```
src/blocks/<block-name>/
  index.tsx
  types.ts          (필요시)
  mock.ts           (필요시)
  mock.scenarios.ts (필요시)
  README.md
```

### 도메인 단위 block

```
src/blocks/<domain>/
  README.md
  types.ts          (도메인 공통 타입, 필요시)
  mock.ts           (도메인 공통 raw mock + selector/helper, 필요시)
  shared.tsx        (도메인 공통 UI 조각, 필요시)
  styles.css        (도메인 공통 스타일 토큰, 필요시)
  <block-name>/
    index.tsx
    types.ts
    mock.ts
    mock.scenarios.ts
    README.md
```

### 각 파일의 책임

- `index.tsx` → block 본체
- `types.ts` → block 전용 타입
- `mock.ts` → raw mock data + 생성 helper (block 수준에서는 projection 계산)
- `mock.scenarios.ts` → raw mock override + projection 재호출로 완성된 실험 케이스
- `README.md` → 규칙, 사용법, 결정사항
- `src/blocks/<domain>/mock.ts` → schema-aligned raw mock + 도메인 공용 selector/helper

### 공용 파일 예시

- `src/blocks/group-post/types.ts` — 공통 타입
- `src/blocks/chat/mock.ts` — 공통 raw mock
- `src/blocks/group-post/shared.tsx` — 공통 UI 조각
- `src/blocks/group-post/styles.css` — 공통 스타일 토큰
- `src/lib/datetime.ts` — 공용 시간 포맷터

---

## 문서 기록 위치 판단

- 프로젝트 전반 공통 규칙 → `AGENTS.md`
- 여러 block이 공유하는 도메인 규칙 → 루트의 별도 md 파일
- 특정 도메인 block 전용 → `src/blocks/<domain>/<block-name>/README.md`
- 단일 block 전용 → `src/blocks/<block-name>/README.md`
- 데이터 구조 기준 → `SCHEME.md`

특정 기능 하나에만 적용되는 상세 정책, 특정 화면의 임시 의사결정, 일회성 메모는 이 문서에 넣지 않는다.

---

## 스키마 규칙

- 컬럼명은 `SCHEME.md`와 최대한 맞춘다.
- 시간 필드는 `created_at`, `updated_at`, `deleted_at` 형태를 유지한다.
- 스키마의 캐시 컬럼은 프론트에서도 그 의미를 존중한다.
- 화면 전용 계산값은 raw data와 분리해서 다룬다.
- `dbdiagram`으로 표현하기 어려운 제약은 `SCHEME.md`의 `Note`에 남기고 구현 단계에서 보완한다.

스키마가 변경되면 아래를 순서대로 점검한다.

1. 공통 타입
2. block 타입
3. mock data
4. 렌더링 로직
5. 관련 문서

---

## TypeScript 규칙

- TypeScript를 유지한다.
- 권장 타입 방향: `schema-aligned type → API DTO type → UI ViewModel`
- 처음부터 완벽히 분리하지 않아도 되지만, 새 기능을 만들수록 위 방향에 가까워져야 한다.

---

## Mock 규칙

### 구조 원칙

- mock data는 "실제 응답 재료(raw data) + 그 재료를 가공한 결과(projection)"로 구성된다. 화면용 더미가 아니다.
- raw data와 UI 전용 계산값을 섞지 않는다.
- id와 정렬 기준 필드를 포함한다.
- 스키마의 캐시 컬럼은 mock에도 반영한다.
- 화면 로직이 해당 mock만 보고도 실제 흐름 전체를 검증할 수 있어야 한다.

### 권장 흐름

```
raw mock data → block mock projection → mock scenario
```

- **raw mock data**: 실제 스키마/API 응답에 최대한 가까운 원재료
- **block mock projection**: raw mock을 block props에 맞게 가공한 값
- **mock scenario**: raw mock 일부를 override하고 projection을 재계산한 완성 케이스

### 도메인 단위 mock 판단

- 단일 block 단기 실험 → block 내부 base mock으로 시작 가능
- 같은 도메인에서 여러 block이 같은 엔티티 공유 → 도메인 루트 raw mock 우선
- unread, latest item, count, 정렬 같은 파생값이 중요 → 반드시 projection helper에서 계산

- 같은 도메인에서 두 번째 block부터는 도메인 루트 raw mock 구조를 우선 검토한다.
- 도메인 루트 `mock.ts`에는 raw data와 이를 조회/계산하는 helper만 둔다.
- unread, latest item, display text, 정렬 결과 같은 파생값은 반드시 projection에서 계산한다.

### 이름 규칙

- `sample...`보다 `base...`, `create...`, `active...Scenario`를 우선한다.
- `mock.scenarios.ts`에는 이름 있는 scenario 상수를 먼저 정의하고, 필요하면 배열로 묶는다.
- preview에서 바꿔볼 수 있도록 `active...ScenarioIndex`와 `active...Scenario`를 둘 수 있다.
- `active...ScenarioIndex` 옆에는 유효 인덱스 범위와 총 scenario 개수를 주석으로 남긴다.

### mock 재점검이 필요한 경우

- 스키마나 타입이 바뀐 경우
- 렌더링 로직이 새 필드를 기대하는 경우
- raw mock과 projection 규칙이 어긋난 경우

---

## UI 규칙

### shadcn/ui 사용 판단

- 범용 상호작용 (버튼, 입력, 다이얼로그 등) → `shadcn/ui` 우선
- 서비스 고유 레이아웃 또는 표현이 중요한 UI → block 직접 구현

우선 검토 컴포넌트: `Button`, `Avatar`, `Card`, `DropdownMenu`, `Dialog`, `Drawer`, `Tabs`, `Popover`, `Separator`, `Input`, `Textarea`

### 스타일 규칙

- 기본 색상과 surface 스타일은 `src/index.css`에 정의된 전역 토큰(`background`, `foreground`, `card`, `text-*`, `border`, `primary` 등)을 우선 사용한다.
- 다크 모드에서도 동일한 색상을 유지해야 하는 경우에만 예외적으로 하드코딩 색상을 사용한다.
- 공용 스타일 토큰은 도메인 폴더 내부 CSS 파일에 모은다.
- block 본체에는 의미 있는 class명과 레이아웃 class만 남기고, 도메인 전용 표현은 도메인 CSS로 분리한다.

### styles.css 생성 판단

생성한다:

- 같은 도메인에서 두 번 이상 반복되는 표현
- drawer 방향 selector, data attribute selector, 복합 hover/focus 상태처럼 JSX에서 읽기 어려운 규칙
- 여러 selector가 얽히거나 JSX에 두면 의미가 흐려지는 규칙이 누적될 때

생성하지 않는다:

- 단일 파일 내 단순 레이아웃
- flex/grid 배치, 국소 spacing

사용자가 명시적으로 요청한 경우 그 방향을 따른다.

### 시간 표시

- raw ISO 문자열을 직접 UI에 출력하지 않는다.
- 절대 시각: `formatIsoDateTime` 사용
- 상대 시각: `formatRelativeTime` 사용

---

## 라우터 규칙

- route 정의는 별도 파일에서 한 번에 관리한다. (예: `src/routes.jsx`)
- 파일명/폴더명 기반 자동 URL 매핑은 기본 선택지로 두지 않는다.
- 필요할 때만 중첩 구조를 추가한다.

### 시나리오 preview 라우팅

- 시나리오 선택 화면과 실제 block 화면을 분리한다.
- block 진입 전 목록 화면에서 block과 scenario를 먼저 선택한다.
- block 안에서는 preview 전용 wrapper를 최소화하고 실제 화면과 동일하게 표시한다.

권장 흐름:

```
/scenarios → /scenarios/group → /scenarios/group/post-card?scenario=2
```

---

## 한글 파일 인코딩 규칙 (Windows 환경)

- PowerShell 터미널 출력만 보고 한글이 깨졌다고 단정하지 않는다.
- 깨진 터미널 출력값을 그대로 복사해 파일에 재사용하지 않는다.
- 구조 수정이 목적이면 ASCII 기준 문맥과 `apply_patch`를 우선 사용한다.
- 터미널에서만 mojibake처럼 보이는 경우 실제 파일은 정상 UTF-8일 수 있다. 이때 "문자열 복구" 작업을 바로 하지 말고, 출력 경로 인코딩 문제인지 먼저 확인한다.
- IDE 표시와 터미널 표시가 다르면 파일 원문 기준으로 판단한다.

권장:

- `Get-Content -Encoding utf8 <path>`
- PowerShell 세션의 입출력 인코딩을 UTF-8로 설정

---

## 작업 완료 전 체크리스트

- [ ] 현재 코드와 관련 문서를 먼저 읽었는가
- [ ] `SCHEME.md` 기준과 어긋나지 않는가
- [ ] 공통 조각으로 해결 가능한 부분을 먼저 검토했는가
- [ ] build가 통과하는가
- [ ] 타입과 mock이 현재 구조와 맞는가
- [ ] block을 수정했다면 각 파일이 현재 상태를 올바르게 반영하는가
  - `types.ts` — 현재 props와 data shape를 아직 설명하는가
  - `mock.ts` — 새 구조와 규칙을 반영하는가
  - `mock.scenarios.ts` — 실험 케이스를 읽기 쉽게 설명하는가
  - `README.md` — 현재 동작과 결정사항을 설명하는가
- [ ] 시나리오를 바꿨다면 `src/ScenarioPreview.jsx`와 `src/scenario-registry.jsx`도 확인했는가
- [ ] 공용 lib를 사용하였는가(`datetime.ts` 등)
- [ ] 새 합의가 생겼다면 가장 가까운 위치의 md 파일에 기록했는가
- [ ] 터미널에서 한글이 깨져 보여도 실제 파일 손상으로 단정하지 않았는가
