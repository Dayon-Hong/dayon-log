# dayon.log

Astro + TypeScript로 만든 사이드바형 개발 블로그입니다. 글은 `src/content/blog/`에 Markdown/MDX 파일로 관리합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

Node.js 22.12 이상을 권장합니다. 개발 서버는 기본적으로 `http://localhost:4321`에서 실행됩니다.

## 사이트 주소와 배포 경로

블로그 주소는 **[https://dayon-hong.github.io/dayon-log/](https://dayon-hong.github.io/dayon-log/)** 입니다. `astro.config.mjs`에 `site: 'https://dayon-hong.github.io'`, `base: '/dayon-log/'`가 설정되어 있습니다. 배포는 GitHub Actions와 GitHub Pages를 사용합니다. 이 저장소의 기본 브랜치에 변경을 병합하거나 푸시하면 Pages 배포가 시작될 수 있습니다.

## 기능

- 반응형 사이드바, 카테고리별 목록, 라이트/다크 모드
- 홈·전체 글·글 상세·태그·About 페이지
- Markdown/MDX, 목차, 코드 구문 강조와 복사, 브라우저 내 검색
- 게시글 카드 썸네일은 본문 첫 이미지를 중앙 기준 1:1로 자르고, 이미지가 없으면 기본 카테고리 썸네일을 표시
- RSS, sitemap, robots.txt, canonical 및 Open Graph 메타데이터
- 광고·댓글·좋아요·로그인 기능 없음

## 새 게시글 추가

글 작성 및 Notion 백업 처리 절차는 [POSTING_GUIDE.md](./POSTING_GUIDE.md)를 참고하세요. 글은 `src/content/blog/`의 Markdown/MDX 파일로 저장합니다. 각 글은 frontmatter의 고유 UUID를 URL 식별자로 사용하므로 제목을 고쳐도 주소가 바뀌지 않습니다. 파일 이름은 저장용이며 공개 URL에 노출되지 않습니다.

```md
---
title: "게시글 제목"
description: "목록과 검색에 표시할 설명"
uuid: 123e4567-e89b-12d3-a456-426614174000
pubDate: 2026-10-14
category: Backend
tags: [Spring, API]
draft: true
---

## 첫 소제목

본문을 작성합니다.
```

예시 UUID는 형식 참고용이므로 새 글에는 재사용하지 마세요. UUID는 한 번 지정한 뒤 유지합니다. 글 주소는 `/dayon-log/blog/<uuid>/`이며 제목이나 Markdown 파일 이름은 URL에 들어가지 않습니다. `draft: true`인 글은 사이트에 표시되지 않습니다. 검토가 끝난 글만 `draft: false`로 바꾸고 배포하세요.

## 사진 첨부

게시글마다 사진을 `src/content/blog/images/<uuid>/`에 두고, 글 파일에서 상대 경로로 불러옵니다. 글 목록 썸네일은 본문에서 처음 나오는 이미지로 자동 설정하고 정중앙 기준 1:1 비율로 크롭합니다. 이미지가 없는 글은 카테고리 기본 썸네일을 사용합니다. 본문 이미지 너비는 콘텐츠 영역의 최대 80%로 표시합니다.

```md
![사진에 대한 설명](./images/<uuid>/screenshot.png)
```

예를 들어 `src/content/blog/hashmap-study.md`에서는 `src/content/blog/images/123e4567-e89b-12d3-a456-426614174000/example.png`를 `![HashMap 조회 결과](./images/123e4567-e89b-12d3-a456-426614174000/example.png)`로 참조합니다. 상대 경로를 쓰면 `/dayon-log/` 배포 경로에도 별도 절대 URL 수정 없이 대응할 수 있습니다. 이미지의 대체 텍스트에는 사진이나 화면 내용을 짧게 적어주세요. 현재 Notion에서 받은 Markdown에는 이미지의 가로·세로 크기 정보가 포함되지 않아 80% 기본 제한을 적용합니다. Notion 원본에서 크기를 확인할 수 있으면 그 크기를 우선하고, 꼭 맞춰야 하는 너비가 있으면 글 요청에 함께 적습니다.

Astro는 `src/` 안의 로컬 이미지를 Markdown에서 처리합니다. 자세한 형식은 [Astro 이미지 가이드](https://docs.astro.build/en/guides/images/)를 참고하세요.

## Notion에서 글 받기

앞으로 아래 문장을 Notion 원문 링크와 함께 보내면 이 저장소의 글 초안으로 정리합니다. 이 문장은 터미널 명령이 아니라 Codex에 전달하는 재사용 요청 문구입니다.

> 블로그 글 초안 작성: <Notion 페이지 링크>. 원문과 코드의 사실 관계를 보존하고, 제목·설명·카테고리·태그를 정리해 새 UUID를 발급한 뒤 `src/content/blog/`에 `draft: true`로 저장해줘. 본문 URL은 `/blog/<uuid>/`로 하고 제목을 URL에 넣지 마. 첨부 이미지는 UUID별 폴더에 복사해 Markdown 상대 경로로 연결하고 너비는 콘텐츠 최대 80%로 해줘. 원문에서 이미지 크기를 읽을 수 있으면 그 값을 우선해. 근거가 부족한 내용은 지어내지 말고 확인이 필요한 점을 알려줘.

Notion 원문은 수정하지 않고 참고용으로 읽습니다. 본문과 코드는 의미를 유지하면서 읽기 좋은 문장과 제목으로 정돈하고, 원문에 없는 결과·경험·성능 수치를 추가하지 않습니다. 기존 Velog 글을 이전하는 경우에는 별도 승인 전까지 대량 수집·발행하지 않으며, 원문을 임의 수정하거나 삭제하지 않습니다.

검토 후 게시를 원하면 다음처럼 요청합니다.

> 발행 승인: `<uuid>` 글을 공개용으로 바꿔줘.

초안을 `draft: false`로 변경하고 빌드 내용에서 확인한 뒤, 공개 브랜치에 반영하기 전에 변경 사항을 보여드립니다. 사이트 공개 배포는 별도 승인 후 진행합니다.

## 기존 글 이전 및 SEO

Velog 원문은 자동 수정·삭제하지 않습니다. 이전 시 원문 Markdown, 이미지, URL, 작성일, 태그를 보존하고 이전 URL 매핑과 중복 콘텐츠 정책을 함께 검토합니다. 새 글은 자체 URL을 canonical로 사용하며 원본 링크가 제공된 글은 출처를 표시합니다. Google Search Console 등록은 사이트 소유자가 최종 도메인에서 진행합니다.

## 프로젝트 구조

- `src/content/blog/`: Markdown/MDX 게시글
- `src/content.config.ts`: 콘텐츠 컬렉션 스키마
- `src/components/`: 페이지 공통 UI
- `src/layouts/Base.astro`: 공통 레이아웃, 사이드바, SEO
- `src/lib/`: 게시글·경로·카테고리 처리
- `src/pages/`: 홈, 목록, 태그, 글 상세, RSS 등
- `public/`: 정적 파일
- `.github/workflows/`: GitHub Pages Actions 설정

About 소개는 공개 전에 실제 정보로 검토하세요. 포트폴리오 상세·이력서·댓글·좋아요·광고는 현재 구현 범위에서 제외되어 있습니다.
