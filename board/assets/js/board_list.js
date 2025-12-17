document.addEventListener("DOMContentLoaded", () => {
  const boards = (StorageDB.get("BOARD") || [])
    .filter(b => b.status === "ACTIVE")
    .sort((a, b) => {
      // 1. 공지사항 우선
      if (a.is_notice && !b.is_notice) return -1;
      if (!a.is_notice && b.is_notice) return 1;

      // 2. 같은 그룹 내 최신순
      return new Date(b.created_at) - new Date(a.created_at);
    });

  const stats = StorageDB.get("BOARD_STAT") || [];

  const tbody = document.getElementById("boardList");
  tbody.innerHTML = "";

  boards.forEach(b => {
    const stat = stats.find(s => s.board_id === b.id) || {
      view_count: 0
    };

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${b.id}</td>
      <td class="title">
        <a href="view.html?id=${b.id}">
          ${b.is_notice ? "<strong>[공지]</strong> " : ""}
          ${Util.escape(b.title)}
        </a>
      </td>
      <td>
        <span class="status ${b.status}">
          ${b.status}
        </span>
      </td>
      <td>${stat.view_count}</td>
      <td>${Util.fmt(b.created_at)}</td>
    `;

    tbody.appendChild(tr);
  });
});
