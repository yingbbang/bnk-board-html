/* 게시글 등록 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#writeForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const boards = StorageDB.get("BOARD") || [];
    const stats  = StorageDB.get("BOARD_STAT") || [];

    const now = new Date().toISOString();
    const id = StorageDB.nextId("SEQ_BOARD_ID");

    boards.push({
      id,
      category: form.category.value,
      title: form.title.value,
      content: form.content.value,
      writer: form.writer.value.trim() || "익명", // ★ 핵심
      status: "ACTIVE",
      created_at: now
    });

    stats.push({
      board_id: id,
      view_count: 0,
      like_count: 0,
      comment_count: 0
    });

    StorageDB.set("BOARD", boards);
    StorageDB.set("BOARD_STAT", stats);

    location.href = "index.html";
  });
});
