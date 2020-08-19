//関数checkを定義
function check() {
  //postをクラス名にもつ要素を取得。
  const posts = document.getElementsByClassName("post");
  //postsを配列に変換し、fotEachメソッドで一つずつ取り出せるようにする。
  postsA = Array.from(posts);


  //「要素1つずつに対して、以下の処理を行う」という設定
  postsA.forEach(function (post) {

    //addEventListener(19行目)が重複して追加されることを回避(関数checkを1秒ごとに読み込むが、読み込みとクリックが重なって、重複して実行されないようにする)
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    //『クリック』した際に以下の処理を行う
    post.addEventListener("click", (e) => { 

      //非同期通信でのリクエスト送信!
      const postId = post.getAttribute("data-id");    // 「data-id」の値を取得。非同期通信で動かす属性を指定。 
      const XHR = new XMLHttpRequest();    // XMLHttpRequestを使用してHTTPリクエストのためのオブジェクトを生成。(XMLHttpRequest使いますよ~て言う)
      XHR.open("GET", `/posts/${postId}`, true);    //どのようなリクエストをするのかを指定。
      XHR.responseType = "json";    //レスポンスのデータ形式をJSONに指定。
      XHR.send();   //リクエストを送信する

      //非同期通信でのレスポンス取得!
      //リクエストの送信が成功した(レスポンスの受信がある)場合の処理
      XHR.onload = () => {
        //レスポンスがあった場合の処理
        const item = XHR.response.post;    // 「XHR.response」でレスポンスとして返却されたレコードデータを取得
        if (item.checked === true) {    //既読の時
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {    //未読のとき
          post.removeAttribute("data-check");
        }
        //レスポンスがエラーだった場合の処理(アラートを表示する)
        if (XHR.status != 200) {    //レスポンスのステータスコードが200以外だった場合(「コード200:処理の成功」なので、何かしらの不具合があった場合)
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      }
      //レスポンスそのものが返却されず、すなわちリクエストの送信が失敗した場合の処理(アラートを表示する)
      XHR.onerror = () => {
        alert("Request failed");
      };

      //イベントハンドラー(.onload/.onerror)を実行し終わったら今回のイベントをキャンセルするよう記述。
      e.preventDefault();
    });
  });
}


//check関数が、1秒(1000ミリ秒)に1度実行されるように記述
setInterval(check, 1000);


//(コメントアウト済)loadイベント発火時に関数checkを実行。※ window（ページ）をload（読み込んだ時）。
// window.addEventListener("load", check);