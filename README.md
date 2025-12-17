# BNK Board HTML Project

본 프로젝트는 부산은행 게시판 시스템을 가정하여  
**순수 HTML / CSS / JavaScript 환경에서 게시판 구조와 데이터 설계 사고를 검증**하기 위해 제작되었다.

단순 CRUD 구현이 아닌,  
**금융권 실무 기준의 데이터 구조, 상태 관리, 감사·이력 개념**을 반영하는 것을 목표로 한다.

---

## 1. 프로젝트 목적

- 금융권 게시판 시스템에서 요구되는 **데이터 책임 분리 구조**를 이해하고 구현
- ERD → Data Dictionary → Code Definition으로 이어지는 **설계 문서 체계 확립**
- 서버 없이도 구조적 사고를 검증할 수 있도록 **프론트 단독 구조로 구성**

---

## 2. 구현 범위

### 화면 (HTML)

- 게시글 목록: `index.html`
- 게시글 상세: `view.html`
- 게시글 등록: `write.html`
- 게시글 수정: `edit.html`

### 문서 (Schema)

- `data-dictionary.html`
  - 테이블 구조
  - 컬럼 의미
  - 설계 원칙
  - 상태 기반 운영 규칙

- `code-definition.html`
  - 코드값(role, status, type, category)의 의미
  - 사용 규칙 및 주의사항

- `erd.png`
  - 전체 ERD 시각 자료

---

## 3. 설계 핵심 원칙

- **물리 삭제 금지**
  - 모든 데이터는 status 기반으로 관리

- **권한 분리**
  - role_code + level 조합을 통한 권한 판단

- **책임 추적 가능 구조**
  - writer / created_by / updated_by 분리

- **감사 대응**
  - 게시글 수정 이력(BOARD_HISTORY) 필수 기록

- **성능 고려**
  - 조회수·댓글 수 등 트래픽 데이터 분리(BOARD_STAT)

---

## 4. 디렉토리 구조

```text
bnk-board-html/
 └─ board/
    ├─ index.html
    ├─ view.html
    ├─ write.html
    ├─ edit.html
    ├─ assets/
    │  ├─ css/
    │  ├─ js/
    │  └─ schema/
    │     ├─ data-dictionary.html
    │     ├─ code-definition.html
    │     └─ erd.png
