const template = ({ name, nav }) => {
  const nav_html = nav.map(({ id, name }) => {
    return `
<li id="item-${id}" data-id="${id}" class="${id === 0 ? 'nav-item--active' : 'nav-item'} " style="cursor: pointer; padding-left: 16px; color: white; line-height: 24px;">
  ${name}
</li>
`
  }).join("\n")
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>${name}</title>
    <style>
      html, body {
        margin: 0;
      }
      #nav {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 180px;
        background: rgba(55, 55, 55, 0.85);
      }
      #nav ul {
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: auto;
      }
      #nav ul li {
        padding: 4px 8px 4px 12px;
      }
      #app {
        position: relative;
        padding-left: 180px;
        background-color: #000000;
        box-sizing: border-box;
      }
      #content {
        box-sizing: border-box;
        width: calc(100vw - 180px);
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
      window.max_item_id = ${nav.length - 1};
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
          if (window.current_item_id > window.max_item_id) return;
          select_item(window.current_item_id + 1);
        }
      })
    </script>
  </head>
  <body>
    <div id="app">
      <nav id="nav">
        <div style="width: 100%; background: rgba(66, 66, 66, 0.8); padding: 12px; box-sizing: border-box;">
          <p style="margin: 0; overflow: hidden; color: white; white-space: nowrap; text-overflow: ellipsis; font-size: 16px; line-height: 32px; font-weight: bold;">${name}</p>
        </div>
        <ul>
        ${nav_html}
        </ul>
      </nav>
      <main id="content">
        <img src="/target/${nav[0].id}"></img>
      </main>
    </div>
  </body>
</html>
`
}
module.exports = {
  template
}