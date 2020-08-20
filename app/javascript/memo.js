function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    //オブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得。
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST","/posts",true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      const item = XHR.response.post;   //レスポンスとして返却されたメモのレコードデータ(コントローラーのcreateアクションで定義された変数post)を取得
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);

      formText.value = "";

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };
    XHR.onerror = function () {
      alert("Request failed");
    };
  
    e.preventDefault();
  })
}
window.addEventListener("load", memo);


