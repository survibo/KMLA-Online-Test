# Main Content Footer

## Purpose

`MainContentFooter`는 헤더 없이 `content + footer`만 필요한 화면을 위한 메인 shell block이다.

`profile`처럼 독립 block을 메인 하단 navigation과 함께 보고 싶을 때 이 shell 안에 넣는다.

## Data Contract

- 입력 데이터: `MainContentFooterData`
- footer 데이터는 `main/footer` block과 같은 `MainFooterData`를 사용한다.
- 본문은 block data가 아니라 `children`으로 주입한다.

## Rendering Rules

- shell은 `min-h-screen` column layout을 사용한다.
- 본문 영역은 `flex-1`과 `overflow-y-auto`를 가져 footer와 스크롤 책임을 분리한다.
- footer는 `main/footer`를 `embedded` 모드로 조합한다.

## Files

- `index.tsx`: content + footer shell
- `mock.ts`: 기본 footer 조합 데이터
- `mock.scenarios.ts`: 기본 shell 시나리오
- `types.ts`: shell 입력 타입
- `README.md`: shell 목적과 로컬 규칙

