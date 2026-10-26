---
uuid: 4dafea65-4d83-4f65-a4ae-63f9641bb4be
title: "JDK 21 Virtual Thread"
description: "JDK 21 Virtual Thread의 구조와 기존 플랫폼 스레드와의 차이, 적용 시 고려점을 정리합니다."
pubDate: 2024-03-20
updatedDate: 2024-03-20
category: "Backend"
tags: ["Spring","Java"]
draft: false
---

![](https://velog.velcdn.com/images/dayon_log/post/92dfb669-fa9f-4937-82d0-11d7afc09aff/image.jpeg)

### JDK 21

- <b>2023.09.19</b> JDK 21 LTS
- 2023.10.04 Gradle 8.4
- 2023.11.17 Spring 6.1
- 2023.11.23 Spring boot 3.2
- 2023.12.07 Jetbrain Intellij

<p />

### 사전 정의

프로세스(Process) :

> 메모리에 올라와 <b>실행되고 있는 프로그램의 인스턴스,</b> 운영체제로부터 시스템 자원을 할당받는 <b>작업의 단위</b>

스레드(Thread) :

> 프로세스가 할당받은 자원을 이용하는 <b>실행 흐름의 단위</b>

<p />

<p />

## Virtual Thread(가상 스레드) 란?

- JDK 21 에 추가된 <b>경량 스레드</b>
- OS 스레드를 그대로 사용하지 않고 JVM 내부 스케줄링을 통해서 수십만\~수백만개의 스레드를 동시에 사용할 수 있게 한다.

<p />

<p />

## Virtual Thread 배경

### 전통적인 JAVA의 Thread

- Java의 Thread는 OS Thread를 Wrapping한 것 = <b>Platform Thread</b>
- Java 애플리케이션에서 Thread를 사용하면 실제로는 OS Thread를 사용한 것
- OS Thread는 생성 갯수가 제한적이고, 생성하고 유지하는 비용이 비싸다
- 이 때문에 애플리케이션에는 <b>플랫폼 스레드</b>를 효율적으로 사용하기 위해 <b>Thread Pool</b>을 사용했다(<b>Thread Pool</b> : 작업 처리에 사용되는 스레드를 제한된 개수로 정해두고 작업 queue에 들어오는 작업들을 하나씩 스레드가 맡아 처리하는 것)

![](https://velog.velcdn.com/images/dayon_log/post/2896ab7d-8d51-4e43-b3a7-fcfc980e621b/image.png)

<p />

### Throughput 의 한계

- 스프링부트와 같은 기본적인 Web Request 처리방식은 <b>Thread Per Request</b> (하나의 요청 / 하나의 스레드)
- 처리량을 높이려면 스레드 증가 필요, but 스레드를 무한정 늘릴 수 없다. (OS 스레드 제약)
- 따라서 애플리케이션의 처리량(throughput)은 스레드 풀에서 감당할 수 있는 범위를 넘을 수 없다.

![](https://velog.velcdn.com/images/dayon_log/post/f6c9c113-6c5d-448a-a80a-75698928e7e5/image.png)

<p />

### Blocking I/O

- Thread에서 I/O 작업을 처리할때 Blocking이 일어난다.
- Thread는 I/O 작업이 마칠때까지 다른 요청을 처리하지 못하고 기다려야 한다.
- 작업을 처리하는 시간보다 대기하는 시간이 길어져 Thread를 효율적으로 사용하지 못한다. ⇒ Non-Blocking 방식의 Reactive Programming이 발전

![](https://velog.velcdn.com/images/dayon_log/post/f86df040-50a8-4e47-924b-19f74400fced/image.png)

![](https://velog.velcdn.com/images/dayon_log/post/3c44df31-cb45-45ae-9c78-b8b28bdfc88d/image.png)

<p />

### Reactive Programming

- 처리량을 높이기 위한 방법으로 비동기 방식의 Reactive 프로그래밍이 발전
- Webflux 방식을 도입해 스레드를 대기하지 않고 다른 작업 처리 가능
- but 코드를 작성하고, 이해하는 비용이 높다 (Mono, Flux)
- Reactive 하게 동작하는 별도의 라이브러리 지원을 필요로 한다.
- JPA를 사용할 수 없고, R2DBC를 사용한다.

<p />

### Java Platform Design

- 자바 플랫폼은 ‘<b>스레드 중심</b>’으로 구성되어있다.
- 스레드 호출 스택은 ThreadLocal 을 사용해 데이터와 컨텍스트를 연결하도록 설계되어있다.
- Exception Stack Trace, Debugger, Profiling 모두 스레드 기반
- Reactive 작업을 할때에는 사용자의 요청이 여러 스레드를 거쳐 처리되는데, 컨텍스트를 확인이 어려워져 디버깅이 어려움

<p />

## 해결하고자 하는 문제

1. <b>Application의 높은 처리량(throughput) 확보</b>
   - Blocking 발생시 내부 스케줄링을 통해 다른 가상 스레드가 이어서 작업을 처리 할 수 있도록 한다. ⇒ Reactive Programming과 동일하게 플랫폼 스레드의 리소스 낭비를 방지
2. <b>자바 플랫폼의 디자인과 조화를 이루는 코드 생성</b>
   - 기존 스레드 구조 그대로 사용

![](https://velog.velcdn.com/images/dayon_log/post/1cfd6422-8c32-45b7-ac7e-4ea59fd92ec6/image.png)

기존의 스레드를 그대로 상속하고 있다.

⇒ 디버깅, 프로파일링등 기존의 도구도 그대로 사용할 수 있도록 한다.

![](https://velog.velcdn.com/images/dayon_log/post/4f336113-640d-4315-a373-4f12eabb653a/image.png)

<p />

<p />

#### <code>[ 가상 스레드 ]</code>

Spring Web MVC 스타일로 코드를 작성하더라도 내부에서 가상 스레드가 기존의 플랫폼 스레드를 직접 사용하는 방식보다 Reactive programming 처럼 효율적으로 스케줄링하여 처리량을 높일 수 있다

<b>🩷 Project Loom ?</b>

경량의 스레드를 Java에 추가하기 위해서 가상 스레드를 비롯한 여러가지 기능들을 개발하는 프로젝트

5년동안 Virtual Thread를 개발하기 위해 노력을 했다고 함

기존 스레드의 사용성을 해치지 않면서도 가상 스레드를 내놓았다는 점에서 좋게 평가함

<p />

<p />

## 구조

### Platform Thread (전통적인 Thread 사용방식)

![](https://velog.velcdn.com/images/dayon_log/post/b4ffcdd1-b097-4d12-b4f8-0e0a774d2c2e/image.png)

- Platform Thread는 실제로는 OS 스레드를 사용하는 것
- 애플리케이션이 Thread Pool 안에 플랫폼 스레드를 OS Thread 와 1:1 매핑을 하는 구조

<p />

<p />

### Virtual Thread

![](https://velog.velcdn.com/images/dayon_log/post/f55e4315-6f70-47cb-a6b5-37088da43efe/image.png)

- Virtual Thread 의 경우 Carrier Thread (Platform Thread 와 유사, 가상 스레드를 실제 OS와 연결해줌) 앞에 Virtual Thread 들이 따로 존재한다.
- Carrier Thread 와 1:1 매핑되는 구조이지만 , 애플리케이션은 Thread Pool 없이 사용하고, JVM 자체적으로 가상 스레드를 OS 스레드와 연결하는 스케줄링한다.
- 가장 큰 차이점은 자체적인 Virtual Thread Scheduling
  <p>
  기존의 Thread는 Blocking 발생시 Carrier Thread(Platform Thread)가 기다리기만 했었다.
  </p>

  <p>
  하지만, Blocking 발생시 버추얼 스레드는 <b>Unmount</b>(연결을 끊고) → 다른 버추얼 스레드가 해당 캐리어 스레드와 <b>Mount</b>(연결)을 한다.
  </p>

<p />

<p />

## 사용법

### 샘플 코드

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) throws Exception {
        run();
    }

    public static void run() throws Exception {

         // Virtual Thread 방법 1 : Thread.startVirtualThread() 빌더 사용
         Thread.startVirtualThread(() -> {
            System.out.println("Hello Virtual Thread");
         });

         // Virtual Thread 방법 2 : Thread.ofVirtual() 빌더 사용
         Runnable runnable = () -> System.out.println("Hi Virtual Thread");
         Thread virtualThread1 = Thread.ofVirtual().start(runnable);

         // Virtual Thread 이름 지정
         Thread.Builder builder = Thread.ofVirtual().name("JVM-Thread");
         Thread virtualThread2 = builder.start(runnable);

         // 스레드가 Virtual Thread인지 확인하여 출력
         System.out.println("Thread is Virtual? " + virtualThread2.isVirtual());

         // ExecutorService 사용
         try (ExecutorService executorService = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i <3; i++) {
                executorService.submit(runnable);
            }
         }
    }
}
```

<p />

<p />

### SpringBoot 3.2 (MVC) 적용법

```yaml
# application.yml
spring:
    threads:
        virtual:
            enabled: true
```

내부에서 발생하는 Tomcat, WAS 에 대한 처리를 Virtual Thread에서 감당하도록 처리해준다.

<p />

<p />

## 사용하는 자원 비교

|  | Platform Thread | Virtual Thread |
| --- | --- | --- |
| Stack size | \~ 2MB (OS 별 차이 있음) | \~10KB |
| 생성시간 | \~ 1ms | \~ 1µs |
| Context Swiching cost | \~100 µs | \~10 µs |

Thread는 기본적으로 최대 2MB의 스택 메모리 사이즈를 가지기 때문에, 컨텍스트 스위칭 시 메모리 이동량이 크다. 또, 생성을 위해선 커널과 통신하여 스케줄링해야 하므로, 시스템 콜을 이용하기 때문에 생성 비용도 적지 않습니다.

하지만 Virtual Thread는 JVM에 의해 생성되기 때문에 시스템 콜과 같은 커널 영역의 호출이 적고, 메모리 크기가 일반 스레드의 1%에 불과합니다. 따라서 Thread에 비해 컨텍스트 스위칭 비용이 적다.

<p />

<p />

### <b>\< 테스트 ></b>

```java
public String ioBound() {
        requestSleep().block(); //Thread.sleep(300) API 호출
        requestSleep().block();
        requestSleep().block();

    return "ok";
}

public Integer cpuBound() {
        IntStream.range(0, 300000000).reduce(0, Integer::sum);
        IntStream.range(0, 300000000).reduce(0, Integer::sum);
        return IntStream.range(0, 300000000).reduce(0, Integer::sum);
}
```

사전 조건 : 테스트하기 위해 애플리케이션 스펙을 최소 사양으로 두고, 256MB의 힙 사이즈를 사용하도록 설정

테스트는 300ms를 sleep하는 API를 3번 호출하는 Request I/O Bound 작업, 0\~300000000(3억)까지 합을 3번 계산하는 CPU Bound 작업으로 진행

![](https://velog.velcdn.com/images/dayon_log/post/e1e63e49-dc9b-421d-b26b-0f152ad09524/image.png)

I/O Bound 작업→ <b>Virtual Thread의 성능은 Thread 모델에 비해 약 51% 이상 향상</b>되었다

CPU Bound 작업 → 일반 스레드 모델이 성능상 우위를 보였다. Virtual Thread가 Switching 되지 않는 경우에는 Platform Thread 사용 비용뿐만 아니라 Virtual Thread 생성 및 스케줄링 비용까지 포함되어 성능 낭비가 발생되기 때문

<p />

### 유의사항 1

- Platform Thread → Virtual Thread (x)
- Task → Virtual Thread (0)
- <b>개별 Task 를 Virtual Thread로 할당하는 것에 이점이 있다.</b>

<p />

### 유의사항 2

- <b>Thread Local 사용한다면 메모리 사용 증가를 주의 해야한다.</b>
- Virtual Thread는 수시로 생성되고, 소멸되며 스위칭이 된다.
- Platform Thread Pool을 사용할때 공유를 위해 ThreadLocal을 사용하던 관습 (X)
- Virtual Thread는 수십\~수백만개까지 늘어날 수 있기에 내부에서 ThreadLocal을 남발해서 사용하면 메모리를 점유하게 되어 메모리 사용이 늘어난다.

<p />

### 유의사항 3

- <b>Pinning issue</b>
- synchronized 사용시 Virtual Thread에 연결된 Carrier Thread가 Blocking이 될 수 있다
- Virtual thread 내에서 synchronized 나 parallelStream 혹은 네이티브 메서드를 쓰면 Virtual Thread가 Carrier Thread에 고정되어 언마운트 할 수 없게 되는 문제 발생한다.

![](https://velog.velcdn.com/images/dayon_log/post/7c5601f2-429c-45ea-abfe-126c9f372ce0/image.png)

⇒ Spring은 synchronized를 ReentrantLock으로 마이그레이션 하는 방향

<p />

## 정리

1. Virtual Thread 는 기존의 Platform Thread를 대체하는것이 목적이 아니다.
   <p>
   도입을 한다고 해서 무조건 처리량이 높아지지 않는다. 필요에 따라 적절히 사용해야 한다
   </p>

   - I/O Blocking 이 발생하는 경우 Virtual Thread 더 좋은 처리량을 보여준다
   - CPU Bound 작업에는 적합하지 않다.
2. Spring MVC 기반 Web API 제공시 편리하게 사용할 수 있다
   - 높은 Throughput을 위해 Webflux을 고려중이라면 대안이 될수 있다
3. Virtual Thread는 기다림에 대한 개선, 그리고 플랫폼 디자인과의 조화
   - Virtual Thread 그 자체로 동시성을 완전히 개선했다고 보기 어렵다

   <p />

---

## 짧은 소감

- 아직 자바 21 버전을 사용해보지 못했는데 이번기회에 Virtual Thread에 대해 자세히 알게되었고, 다음에 사용한다면 이부분을 생각하며 코드를 짜봐야겠다.
- 관련된 Virtual Thread vs Kotlin Coroutine 부분도 더 알아보고 싶다.

<p />

---

## 참고

1. [https://inpa.tistory.com/entry/👩‍💻-프로세스-⚔️-쓰레드-차이](https://inpa.tistory.com/entry/%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%E2%9A%94%EF%B8%8F-%EC%93%B0%EB%A0%88%EB%93%9C-%EC%B0%A8%EC%9D%B4)
2. [https://tech.kakao.com/2023/12/22/techmeet-virtualthread/](https://tech.kakao.com/2023/12/22/techmeet-virtualthread/)
3. [https://findstar.pe.kr/2023/04/17/java-virtual-threads-1/](https://findstar.pe.kr/2023/04/17/java-virtual-threads-1/)
4. [https://techblog.woowahan.com/15398/](https://techblog.woowahan.com/15398/)
5. [https://www.baeldung.com/spring-6-virtual-threads](https://www.baeldung.com/spring-6-virtual-threads)
6. [https://velog.io/@eastperson/synchronized와-ReentrantLock-그리고-JDK-21-Virtual-Thread](https://velog.io/@eastperson/synchronized%EC%99%80-ReentrantLock-%EA%B7%B8%EB%A6%AC%EA%B3%A0-JDK-21-Virtual-Thread)
7. [https://d2.naver.com/helloworld/1203723](https://d2.naver.com/helloworld/1203723)
