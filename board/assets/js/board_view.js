document.addEventListener("DOMContentLoaded", () => {
  const id = Number(Util.qs("id"));
  const boards = StorageDB.get("BOARD") || [];

  const board = boards.find(b => b.id === id);
  if (!board || board.status === "DELETED") {
    alert("존재하지 않는 게시글입니다.");
    location.href = "index.html";
    return;
  }

  document.querySelector(".board-view-header .title").textContent = board.title;
  document.querySelector(".board-view-header .meta").textContent =
    `상태: ${board.status} | 작성일: ${Util.fmt(board.created_at)}`;

  document.getElementById("content").innerHTML =
    Util.escape(board.content).replace(/\n/g, "<br>");

  document.getElementById("btnEdit").onclick =
    () => location.href = `edit.html?id=${id}`;

  document.getElementById("btnDelete").onclick = () => {
    if (!confirm("삭제 처리하시겠습니까?")) return;
    board.status = "DELETED";
    board.updated_at = new Date().toISOString();
    StorageDB.set("BOARD", boards);
    location.href = "index.html";
  };
});
