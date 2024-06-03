export class MonaTodo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
    .containertodo {
      width: 100%;
    }

    .card {
      // margin: 0 auto;
      // width: 40%;
      // border: 1px solid;
      border-radius: 10px;
      // box-shadow: 8px 8px #888888;
      padding: 25px;
      background-color: #303443;
    }

    .card-title {
      border-bottom: 3px solid #e2d1aa;
      padding: 0 0 15px 0;
    }

    .card-title {
      font-family: "verdana";
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    small {
      position: relative;
    left: -5em;
    }

    .todo-list-input {
      padding: 10px;
      width: 50%;
      background-color: #dcdcdc80;
      font-size: 18px;
    }

    .todo-list-parent {
      list-style-type: none;
      padding: 0;
    }

    .todo-list-item {
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid;
      border-radius: 5px;
      padding: 5px 5px;
      margin-bottom: 10px;
      position: relative;
      width : inherit;
      left: .5em;
    }

    .todo-list-item > div {
      position: absolute;
      background: #82fda3;
      top: 0;
      left: 0;
      height: 100%;
      z-index: -1;
    }

    .btn-delete {
      background-color: #fc145d;
      color: #fff;
      border: 2px solid #fff;
      // padding: 5px 10px;
      border-radius: 10px;
      font-size: 14px;
    }

    .btn-delete:hover {
      border: 2px solid #faf;
      background-color: #fc111d;
    }

input.task-done:checked ~ span.item-desc {
      text-decoration: line-through;
      color: crimson;
    }
  </style>

  <!-- ======================================{here}============================================================== -->
  
  <div class="containertodo">
  <div class="card">
  
  <div class="card-title">
  <input type="text" class="todo-list-input" placeholder="type here . ." />
  <small>*hit enter</small>
  </div>
    <div class="card-body">
      <ul class="todo-list-parent"></ul>
    </div>
  </div>
</div>`;
  }
}
customElements.define("mona-todo", MonaTodo);

// <!-- ======================================{function here}============================================================== -->

let td_input = document.querySelector(".todo-list-input");
let todolist_parent = document.querySelector(".todo-list-parent");

td_input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let html = `
          <li class="todo-list-item">
            <div></div>
            <span class="item">
              <input type="checkbox" class="task-done">
              <span class="item-desc"contenteditable>${this.value}</span>
              </span>
              <span class="item-action">
              <button class="btn btn-delete">delete</button>
            </span>
          </li>

          `;
    todolist_parent.insertAdjacentHTML("beforeend", html);
    //remove input value
    this.value = "";
    notification("tes", "tas");

    let index = todolist_parent.childElementCount - 1;

    let delete_items = document.querySelectorAll(".btn-delete");
    delete_items[index].addEventListener("click", function (event) {
      this.parentElement.parentElement.remove();
    });

    let tasks_done = document.querySelectorAll(".task-done");
    tasks_done[index].addEventListener("click", function (event) {
      let width_value = parseInt(this.checked ? 0 : 100);
      if (this.checked) {
        let id = setInterval(() => {
          if (width_value >= 100) clearInterval(id);
          this.parentElement.previousElementSibling.style.width = width_value + "%";
          width_value += 1;
        }, 1);
      } else {
        let id = setInterval(() => {
          if (width_value <= 0) clearInterval(id);
          this.parentElement.previousElementSibling.style.width = width_value + "%";
          width_value -= 1;
        }, 1);
      }
    });
  }
});

// Notification
let notification = function (title, message) {
  // const body = document.querySelector("body");
  // const html = `
  //         <div style="position:absolute;background-color:#82fda3;top:0;right:0;height:100px;width:100px;">
  //         ALERT
  //         </div>
  //   `;
  // body.insertAdjacentHTML("beforeend", html);
};
