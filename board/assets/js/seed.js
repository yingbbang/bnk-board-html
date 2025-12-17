/* 
 * 최초 1회만 실행되는 로컬스토리지 초기 데이터 세팅
 * - 게시판 기능 동작을 위한 기본 테이블(컬렉션) 생성
 * - 샘플 게시글 1건 삽입
 */
(() => {
  // 이미 초기 데이터가 세팅된 경우 재실행 방지
  if (localStorage.getItem("SEEDED") === "Y") return;

  /* =========================
   * 1. 기본 스토리지 초기화
   * ========================= */

  // 게시글 본문 데이터
  StorageDB.set("BOARD", []);

  // 게시글 통계 데이터 (조회수, 좋아요, 댓글 수)
  StorageDB.set("BOARD_STAT", []);

  // 게시글 수정 이력 데이터
  StorageDB.set("BOARD_HISTORY", []);

  /* =========================
   * 2. 시퀀스(ID) 초기화
   * ========================= */

  // 게시글 PK 시퀀스
  localStorage.setItem("SEQ_BOARD_ID", 0);

  // 게시글 이력 PK 시퀀스
  localStorage.setItem("SEQ_HISTORY_ID", 0);

  /* =========================
   * 3. 샘플 게시글 생성
   * ========================= */

  // ISO 포맷 현재 시간 (created_at / updated_at 공통 사용)
  const now = new Date().toISOString();

  // 게시글 고유 ID 발급
  const id = StorageDB.nextId("SEQ_BOARD_ID");

  // BOARD 테이블에 초기 게시글 1건 삽입
  StorageDB.set("BOARD", [{
    id,                         // 게시글 ID (PK)
    title: "공지사항 테스트",    // 게시글 제목
    content: "초기 게시글입니다.", // 게시글 본문
    status: "ACTIVE",           // 게시글 상태 (ACTIVE / HIDDEN / DELETED 등 확장 가능)
    writer_id: 1,               // 실제 작성자
    created_by: 1,              // 등록자 (대리등록 고려)
    updated_by: 1,              // 최종 수정자
    created_at: now,            // 생성 시각
    updated_at: now,            // 최종 수정 시각
    version: 1                  // 낙관적 락(Optimistic Lock) 버전
  }]);

  /* =========================
   * 4. 게시글 통계 데이터 생성
   * ========================= */

  // BOARD_STAT 테이블에 게시글 통계 초기값 세팅
  StorageDB.set("BOARD_STAT", [{
    board_id: id,       // 게시글 ID (FK)
    view_count: 0,      // 조회수
    like_count: 0,      // 좋아요 수
    comment_count: 0    // 댓글 수
  }]);

  /* =========================
   * 5. 시딩 완료 플래그 설정
   * ========================= */

  // 이후 새로고침 시 초기화 로직이 다시 실행되지 않도록 플래그 저장
  localStorage.setItem("SEEDED", "Y");
})();
