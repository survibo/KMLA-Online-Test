# Group Photo Viewer

## Purpose

`GroupPhotoViewer`는 group post gallery에서 연 이미지 확대 보기 화면이다.

현재는 `group` 도메인 raw mock과 route query (`/photo?image=<imageId>`)에 직접 연결된 group 전용 viewer로 본다.

## Rule

- viewer 데이터는 `src/blocks/group/mock.ts`의 image/post raw mock projection을 사용한다.
- 닫기 동작은 가능하면 browser history back을 우선 사용하고, 불가능할 때만 fallback path로 이동한다.
- 상단 다운로드 버튼은 현재 UI만 유지하고 실제 다운로드 로직은 붙이지 않는다.
