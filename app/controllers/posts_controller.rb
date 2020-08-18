class PostsController < ApplicationController
  def index  # indexアクションを定義した
    @posts = Post.all.order(id: "DESC")
  end
  
  def create
    Post.create(content: params[:content], checked: false)    #「checked: false」でメモ作成時に未読の情報を保存
    render json:{ post: post }    # 元々リダイレクトしてたが、レスポンスをJSONで返すように変更
  end

  def checked

    # params[:id]を使用して、既読機能を実行したい投稿の情報を取得
    post = Post.find(params[:id])
    # if文で、post.checked「という既読したか否かを判定するプロパティを指定し、既読していれば「既読を解除するためにfalseへ変更」し、既読していなければ「既読にするためtrueへ変更」
    if post.checked 
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    #最後に、更新したレコードを取得し直し、JSON形式（データ）としてchecked.jsに返却
    item = Post.find(params[:id])
    render json: { post: item }
  end
end
