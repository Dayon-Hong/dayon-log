---
title: "HTTP 요청이 응답이 되기까지"
description: "클라이언트에서 서버까지 요청이 이동하는 과정을 살펴봅니다."
pubDate: 2026-10-10
updatedDate: 2026-10-13
category: "Backend"
tags: ['Backend', 'HTTP']
---

> 기능 확인을 위해 작성한 샘플 콘텐츠입니다. 기존 Velog 글이 아닙니다.

## 먼저 생각할 것

클라이언트에서 서버까지 요청이 이동하는 과정을 살펴봅니다. 작은 예제로 동작을 확인한 다음 실제 상황에 맞게 적용합니다.

## 코드 예제

```typescript
const response = await fetch("/api/posts");
if (!response.ok) throw new Error("요청 실패");
```

### 확인 방법

코드 복사 버튼과 목차 링크가 동작하는지 확인하세요. 정답을 외우기보다 선택의 이유를 기록하는 것이 중요합니다.

## 정리

변경 전후의 결과를 비교하고 필요한 만큼만 개선합니다.
