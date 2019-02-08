defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  def game(conn, %{"game" => game}) do
    render conn, "game.html", game: game
  end

  def index(conn, _params) do
    render conn, "index.html"
  end

end
