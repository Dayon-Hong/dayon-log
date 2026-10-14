---
uuid: cbeb3948-bb14-4e60-a0f8-9f5405fb556b
title: "HashMap으로 추억 점수 합산하기"
description: "프로그래머스 추억 점수 문제를 풀며 반복 검색을 HashMap 조회로 바꾸는 방법과 복잡도를 살펴봅니다."
pubDate: 2025-09-12
updatedDate: 2025-09-12
category: Algorithm
tags: [Java, HashMap, 코테]
draft: false
---

## 문제

[프로그래머스 추억 점수](https://school.programmers.co.kr/learn/courses/30/lessons/176963) 문제에서는 사람 이름 배열 `name`과 각 사람의 그리움 점수 `yearning`, 사진마다 등장하는 사람 이름을 담은 `photo`가 주어집니다. 각 사진 속 사람들의 점수를 더해 사진별 점수 배열을 반환합니다. 명단에 없는 사람은 0점으로 계산합니다.

## 이름 목록을 매번 순회하기

처음에는 사진 속 이름마다 `name` 배열을 처음부터 비교할 수 있습니다.

```java
for (int i = 0; i < photo.length; i++) {
    int sum = 0;
    for (String person : photo[i]) {
        for (int n = 0; n < name.length; n++) {
            if (person.equals(name[n])) {
                sum += yearning[n];
                break;
            }
        }
    }
    answer[i] = sum;
}
```

사진 전체에 등장하는 이름 수를 `P`, 이름 목록의 길이를 `N`이라고 하면 최악의 경우 `O(P × N)`번 비교합니다. 문제 제한에서는 이 방법도 충분히 통과할 수 있지만, 같은 이름 목록을 사진마다 반복 검색합니다.

## HashMap으로 이름과 점수 연결하기

이름을 키로, 점수를 값으로 저장하면 사진 속 이름을 조회할 때마다 명단 전체를 훑지 않아도 됩니다.

```java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] solution(String[] name, int[] yearning, String[][] photo) {
        Map<String, Integer> scoreByName = new HashMap<>();
        for (int i = 0; i < name.length; i++) {
            scoreByName.put(name[i], yearning[i]);
        }

        int[] answer = new int[photo.length];
        for (int i = 0; i < photo.length; i++) {
            for (String person : photo[i]) {
                answer[i] += scoreByName.getOrDefault(person, 0);
            }
        }
        return answer;
    }
}
```

`getOrDefault(person, 0)`은 이름이 맵에 없으면 0을 반환합니다. 따라서 별도의 존재 여부 분기 없이 점수를 합산할 수 있습니다.

맵을 준비하는 데 `O(N)`, 사진 속 이름을 한 번씩 처리하는 데 평균 `O(P)`가 걸려 전체 평균 시간 복잡도는 `O(N + P)`입니다. 공간 복잡도는 `O(N)`입니다. HashMap 조회의 `O(1)`은 평균적인 설명이며, 모든 입력에서 보장되는 절대적인 상수 시간은 아닙니다. 원문에 적힌 ‘최대 100배 빠르다’는 계산량 상한의 비교이지 실제 벤치마크 측정값은 아닙니다.

## 기억해 둘 HashMap 메서드

```java
Map<String, Integer> scores = new HashMap<>();

scores.put("may", 5);                         // 추가 또는 갱신
int score = scores.getOrDefault("jane", 0); // 기본값을 포함해 조회
boolean exists = scores.containsKey("may"); // 키 존재 여부
scores.put("may", scores.getOrDefault("may", 0) + 1); // 빈도 누적 패턴
```

문자열 값 비교에는 `==` 대신 `equals`를 사용합니다. 키와 값이 1:1로 연결되거나, 키별 개수와 합계를 반복해서 조회하는 문제라면 HashMap이 유용합니다.
