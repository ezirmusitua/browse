const { state } = require("./content")
function generate_navigation({ id, name, children, is_directory }) {
  if (is_directory) {
    return `<ul style="padding-left: 4px">
<li title="${name}" class="limit-line" style="color: white; font-size: 16px; font-weight: bold; cursor: default;">${name}</li>
${children.map(generate_navigation).join("\n")}
</ul>`;
  } else {
    return `
<li title="${name}" id="item-${id}" data-id="${id}" class="${id === 0 ? 'nav-item--active' : 'nav-item'} " style="cursor: pointer; padding-left: 16px; color: white; line-height: 24px;">
  ${name}
</li>`
  }
}

const template = (item) => {
  const nav_html = generate_navigation(item)
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>${item.name}</title>
    <style>
      .limit-line {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
      }
      html, body {
        margin: 0;
      }
      #nav {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 240px;
        overflow-x: hidden;
        background: rgba(55, 55, 55, 0.85);
        overflow-y: auto;
      }
      #nav ul {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      #nav ul li {
        padding: 4px 8px 4px 12px;
        list-style: none;
      }
      #nav ul li:first-child {
        border: 1px solid white;
        border-right: none;
      }
      #nav ul li:not(:first-child) {
        margin-left: 4px;
        border-left: 1px solid white;
      }
      #app {
        position: relative;
        padding-left: 240px;
        background-color: #000000;
        box-sizing: border-box;
      }
      #content {
        box-sizing: border-box;
        width: calc(100vw - 240px);
        height: 100vh;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .nav-item--active {
        background-color: rgba(220, 100, 100, 0.5);
      }
    </style>
    <script>
      window.max_item_id = ${state.id};
      window.current_item_id = 0;
      function select_item(id) {
          const prev_active_item = document.querySelector(".nav-item--active");
          if (prev_active_item) {
            prev_active_item.classList.remove(["nav-item--active"]);
            prev_active_item.classList.add("nav-item")
          }
          var viewer = document.querySelector("#content > img");
          viewer.src = "/target/" + id;
          window.current_item_id = parseInt(id, 10);
          const current_active_item = document.querySelector("#item-" + id);
          current_active_item.classList.remove(["nav-item"]);
          current_active_item.classList.add("nav-item--active");
      }
      window.onunload = () => {
        fetch("http://localhost:8080/signal/close", {
          method: "POST"
        })
        return true;
      }
      window.addEventListener("click", (e) => {
        if (!e?.target?.dataset?.id) return;
        select_item(e.target.dataset.id);
      })
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          if (window.current_item_id < 1) return;
          select_item(window.current_item_id - 1);
        }
        if (e.key === "ArrowRight") {
          if (window.current_item_id >= window.max_item_id) return;
          select_item(window.current_item_id + 1);
        }
      })
    </script>
  </head>
  <body>
    <div id="app">
      <nav id="nav">
        ${nav_html}
      </nav>
      <main id="content">
        <img style="object-fit: contain;" src="/target/0"></img>
      </main>
    </div>
  </body>
</html>
`
}
module.exports = {
  template
}