# dayon.log — Astro starter

사이드바형 소프트 핑크 개발 블로그의 **초기 버전**입니다. 제공된 시안에서 영감을 받았지만 원본 구조를 독자적으로 구현합니다. C안 원본 이미지는 확인하지 못했고, 요청서의 사이드바·색상 기준을 적용했습니다.

## 로컬 실행

```bash
npm install
npm run dev
npm run build
```

Node.js 22.12+ 권장. 사이트 기본 주소는 `http://localhost:4321`입니다.

## 현재 포함

- 반응형 사이드바, 6개 카테고리별 목록, 라이트/다크 모드, 홈·글 목록·글 상세·태그·About
- Markdown/MDX 콘텐츠 컬렉션, 목차, 코드 구문 강조, 코드 복사, 간단한 클라이언트 검색
- RSS, sitemap, robots.txt, 기본 SEO/OG 메타데이터
- GitHub Actions Pages 워크플로우 (배포는 수행하지 않음)
- 좋아요 UI는 비활성 상태로 표시 (서버 집계/저장 없음, 임의 수치 없음)
- 광고 삽입 없음

## 배포 전 필수 확인

1. GitHub Pages 리포지토리를 만들고 Settings → Pages에서 GitHub Actions를 선택합니다.
2. Actions 변수 `SITE_URL`을 `https://username.github.io` 또는 커스텀 도메인으로 지정합니다.
3. 프로젝트 Pages(`/repo/`)를 쓰는 경우 `BASE_PATH=/repo/`를 설정합니다. 사용자 Pages(`username.github.io`)는 `/`입니다.
4. `npm install`로 lockfile을 생성하고 **package-lock.json을 커밋**해야 Actions의 `npm ci`가 작동합니다.
5. 실제 도메인 연결 후 sitemap, canonical, OG, RSS, robots.txt를 재검증합니다.
6. Google Search Console 인증 및 등록은 사이트 소유자가 직접 진행합니다.

## Velog 이전

기존 Velog 원문 **미포함**. 저작물·이미지에 대한 사용 권한 및 링크 유효성을 확인하고, 별도 백업 후 점진적으로 이전하세요. `src/content/blog`에 frontmatter를 가진 `.md` 또는 `.mdx` 파일을 추가하면 됩니다. `originalUrl` 필드로 출처를 보존할 수 있습니다. 원문 수정/삭제를 자동으로 수행하지 않습니다.

## 다음 단계

- 실제 Velog 3~5개 게시물과 이미지 변환 검증
- 공용 좋아요 집계 API (선택), 남용 방지
- 디자인 상세 조정, 실제 썸네일 및 아이콘
- 광고 수익화 전에 AdSense 및 호스팅 정책 검토
- 추후 `/projects`, 포트폴리오, 이력서 기능 추가

## 현재 작업 범위와 설정

모든 게시글은 샘플이며 실제 경력·기술 숙련도를 나타내지 않습니다. About 문구 역시 공개 전에 본인 소개로 교체하세요. `/projects`는 준비 페이지입니다.

`SITE_URL` 기본값 `https://example.com`은 로컬 빌드를 위한 예시입니다. 공개 전에 실제 주소로 바꾸세요. SVG OG 이미지는 기본 자산이며 소셜 플랫폼 호환성을 위해 공개 전에 PNG(1200×630)로 교체를 권장합니다. 광고 공간은 필요할 때 레이아웃에 추가할 수 있고 현재 화면에 광고 자리 표시는 없습니다.

## Velog 원본과 canonical 정책

승인 후 원본 Markdown·이미지를 먼저 백업하고, 원본 URL·작성일·태그를 보존한 변환본과 `oldUrl,newUrl` 매핑을 만듭니다. 새 블로그는 자체 URL을 canonical로 사용하고, `originalUrl`은 출처 링크로 표시합니다. 이 정책만으로 중복 색인이 해결되지는 않습니다. 기존 Velog URL은 직접 리디렉션할 수 없으므로 두 사이트를 병행할지, 사용자가 직접 원문에 이전 안내 링크를 넣을지 공개 전에 결정해야 합니다. 원문은 자동 수정·삭제하지 않습니다.

Search Console은 최종 도메인 확정 후 소유권 인증 방식(DNS 또는 HTML)을 선택하고 `/sitemap-index.xml`을 제출합니다.

## 검증 결과

Astro 타입 검사: 오류·경고·힌트 0. 정적 빌드 성공. 의존성 업데이트 후 npm 설치 감사 결과 취약점 0. 게시글 목록을 PC·모바일에서 확인했고, 검색어 필터가 실제로 4개 글을 1개로 좁히는 것을 확인했습니다. 좋아요는 API 미설정 상태에서 비활성·수치 미표시를 확인했습니다. 현재 시스템 기본 Node는 18이므로 실행 전에 Node 22.12 이상으로 전환하세요.

## 새 게시글 올리기

`src/content/blog/`에 새 `.md` 또는 `.mdx` 파일을 만듭니다. `templates/new-post.md`를 복사해 시작할 수도 있습니다. 파일명이 URL 주소가 되므로 발행 후에는 이름을 유지하는 편이 좋습니다. 예를 들어 `my-first-post.md`는 `/blog/my-first-post`로 공개됩니다.

```md
---
title: "게시글 제목"
description: "목록과 검색 결과에 표시할 설명"
pubDate: 2026-10-13
updatedDate: 2026-10-13
category: Backend
tags: [Spring, API]
draft: false
---

## 첫 소제목

여기에 본문을 작성합니다.
```

이미지는 `public/images/`에 넣고 Markdown에서 `![설명](/images/파일명.png)`으로 참조합니다. 저장 후 `npm run dev`에서 확인하고, `npm run check`와 `npm run build`를 통과시키세요. GitHub Pages 공개를 승인한 뒤에는 Markdown과 이미지를 저장소에 올리면 Actions가 빌드합니다. `draft: true`인 글은 목록과 빌드 결과에서 빠집니다. 프로젝트 Pages처럼 `BASE_PATH`가 `/`가 아닌 배포에서는 이미지 절대 경로에 base path를 반영해야 합니다. 이 경우에는 `src/assets/`에서 이미지 자산을 Astro 방식으로 처리하는 편이 안전합니다.

## 좋아요 연동 준비

현재는 좋아요 버튼이 비활성화되고 공유 수치를 표시하지 않습니다. `src/components/LikeButton.astro`는 UI, `src/lib/likes.ts`는 API 호출을 담당합니다. 추후 Worker + D1을 배포한 뒤 `PUBLIC_LIKES_API_URL`에 Worker의 HTTPS 주소를 지정하면 `GET /likes/:postId`와 `POST /likes/:postId`를 호출합니다. 두 응답 모두 `{ "count": 12, "liked": false }` 형식이어야 합니다. 숫자는 서버 응답에서만 표시됩니다. 중복 방지와 요청 제한은 Worker에서 처리해야 하며, 프런트엔드의 버튼 비활성화만으로는 중복을 막을 수 없습니다. Worker 배포와 D1 생성은 아직 수행하지 않았습니다.

## 카테고리와 사이드바

사이드바의 Posts 글자를 누르면 `/blog`에서 전체 글을 봅니다. 옆 화살표로 카테고리 목록을 펼치거나 접을 수 있습니다. 카테고리는 `src/lib/categories.ts`의 6개 고정 목록이며, 각 링크는 `/blog/category/카테고리주소`로 이동합니다. 아직 글이 없는 카테고리도 빈 목록 안내를 표시합니다. 모바일에서는 프로필 아래 메뉴에서 Posts 옆 화살표를 눌러 카테고리를 펼칠 수 있습니다. 사이드바 Topics 영역은 태그 페이지와 중복되어 제거했습니다.

프로필 아래 GitHub, LinkedIn, 이메일, RSS 링크를 제공합니다. 링크를 바꿀 때는 `src/layouts/Base.astro`의 `social-links` 영역을 수정하세요.
