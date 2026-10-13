# 프로젝트 구조와 개발 계획

- `src/content/blog/`: Markdown/MDX 원문과 메타데이터
- `src/content.config.ts`: 콘텐츠 스키마
- `src/components/`: 공통 게시글 카드
- `src/layouts/Base.astro`: 사이드바, 공통 SEO 및 테마
- `src/lib/blog.ts`: 게시글 조회와 배포 경로 계산
- `src/pages/`: 홈, 목록, 상세, 태그, About, 프로젝트 준비 페이지, RSS, robots
- `src/styles/`: 반응형·테마·본문 스타일
- `public/`: 정적 자산
- `.github/workflows/`: 승인 후 사용할 Pages 배포 설정

## 1. 로컬 초기 버전
사이드바형 홈 → 글 목록·상세·태그·About → 샘플 글 → 단일 검색창과 카테고리별 정적 목록 → SEO → 타입 검사와 빌드 및 반응형 검증 순서로 진행합니다. 좋아요는 API를 연결하기 전까지 비활성화하며 수치를 표시하지 않습니다. 검색은 현재 목록의 제목·설명·태그·카테고리를 대상으로 합니다. 카테고리 이동은 Posts 메뉴에서 처리합니다.

## 2. 별도 승인 후 이전
원본과 이미지 백업 → 변환 스크립트 → 메타데이터·이미지·코드 검증 → URL 매핑 → 중복 콘텐츠 정책 확정 → 단계적 발행. 현재는 수집·이전 스크립트를 실행하지 않습니다.

## 3. 별도 승인 후 공개
GitHub 저장소 생성 → 실제 SITE_URL과 BASE_PATH 설정 → GitHub Pages 설정 → Actions 배포 → Search Console 인증과 sitemap 제출. 커스텀 도메인과 호스팅 변경은 URL 설정을 중심으로 처리합니다.

## 4. 후속 기능
좋아요 API 호출 로직은 `src/lib/likes.ts`에 분리했습니다. Worker + D1 구축과 중복 방지, 광고는 후속 작업입니다. 댓글·로그인·이력서·포트폴리오 상세는 현재 범위에 포함되지 않습니다.
