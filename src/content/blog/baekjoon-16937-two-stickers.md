---
uuid: ff38b28d-44a5-4f04-a8d0-0306b9de633d
title: "[백준] 16937 두 스티커: 회전을 포함한 완전 탐색"
description: "두 스티커의 회전과 배치를 모두 확인해 모눈종이에 붙일 수 있는 최대 넓이를 구합니다."
pubDate: 2025-03-03
updatedDate: 2025-03-03
category: Algorithm
tags: [백준, 코테, Java, 브루트포스]
draft: false
---

![백준 16937 두 스티커 문제 이미지](https://velog.velcdn.com/images/dayon_log/post/fd347bbc-0791-44a5-a878-72ba9f44dc6a/image.jpg)

## 문제

[백준 16937번 두 스티커](https://www.acmicpc.net/problem/16937)는 높이 `H`, 너비 `W`인 모눈종이와 여러 직사각형 스티커가 주어질 때, 두 장을 골라 붙인 넓이의 최댓값을 구하는 문제입니다. 스티커는 90도 회전할 수 있고 서로 겹치거나 모눈종이를 벗어나면 안 됩니다.

## 풀이 방향

스티커 두 장을 고르는 조합은 최대 `O(N²)`개입니다. 두 장이 겹치지 않게 직사각형 안에 놓인다면, 한 장이 다른 장의 왼쪽·오른쪽 또는 위·아래에 놓이는 형태로 확인할 수 있습니다. 각 스티커는 원래 방향과 회전한 방향이 있으므로 두 장의 방향 조합을 모두 검사합니다.

처음에는 두 스티커의 가로·세로 길이 합만으로 배치 가능 여부를 판단하려 했지만, 스티커 한 장을 먼저 놓고 남은 영역에 다른 한 장이 들어가는지 검사하는 방식으로 정리했습니다.

## 구현

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    static int height, width;
    static int[][] stickers;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        height = Integer.parseInt(st.nextToken());
        width = Integer.parseInt(st.nextToken());
        int count = Integer.parseInt(br.readLine());

        stickers = new int[count][2];
        for (int i = 0; i < count; i++) {
            st = new StringTokenizer(br.readLine());
            stickers[i][0] = Integer.parseInt(st.nextToken());
            stickers[i][1] = Integer.parseInt(st.nextToken());
        }

        int maxArea = 0;
        for (int i = 0; i < count; i++) {
            for (int j = i + 1; j < count; j++) {
                maxArea = Math.max(maxArea, bestArea(stickers[i], stickers[j]));
            }
        }
        System.out.println(maxArea);
    }

    static int bestArea(int[] first, int[] second) {
        int best = 0;
        for (int firstRotation = 0; firstRotation < 2; firstRotation++) {
            int h1 = first[firstRotation];
            int w1 = first[1 - firstRotation];
            for (int secondRotation = 0; secondRotation < 2; secondRotation++) {
                int h2 = second[secondRotation];
                int w2 = second[1 - secondRotation];
                int area = first[0] * first[1] + second[0] * second[1];

                // 위아래로 배치
                if (h1 + h2 <= height && Math.max(w1, w2) <= width) {
                    best = Math.max(best, area);
                }
                // 좌우로 배치
                if (Math.max(h1, h2) <= height && w1 + w2 <= width) {
                    best = Math.max(best, area);
                }
            }
        }
        return best;
    }
}
```

방향 조합마다 두 스티커의 넓이 합은 같고, 위아래 또는 좌우 배치 조건만 달라집니다. 스티커 쌍을 고르는 데 `O(N²)`, 각 쌍에서 확인하는 방향 조합은 4개이므로 전체 시간 복잡도는 `O(N²)`입니다. 입력 스티커를 저장하는 공간은 `O(N)`입니다.

## 정리

회전이 허용되는 직사각형 배치 문제는 각 도형의 두 방향을 모두 열거하고, 겹치지 않는 배치 조건을 검사할 수 있습니다. 이 문제에서는 가능한 스티커 쌍을 전부 확인해도 제한 안에서 해결할 수 있어 완전 탐색이 적절합니다.
