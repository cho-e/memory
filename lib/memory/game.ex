defmodule Memory.Game do

  def new() do
    view = %{
      deck: init_deck(),
      selectedCard: -1,
      matches: 0,
      buffer: false,
      moves: 0,
      score: 0
    }
  end

  def init_deck() do
    cards = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"]
    |> Enum.shuffle
    |> Enum.with_index
    |> Enum.map(fn val ->
      %{
        letter: elem(val, 0),
        key: elem(val, 1),
        flipped: false
      }
    end)
  end

  # return client view model for react to render
  def client_view(game) do
    %{
      moves: game.moves,
      score: game.score,
      deck: game.deck,
      selectedCard: game.selectedCard,
      buffer: game.buffer,
      matches: game.matches
    }
  end

  def score(matches, moves, score) do
    div(matches, moves) * 20 + score
  end

  def flipCard(game, %{"flipped" => flipped, "key" => index, "letter" => letter}) do
    newCard = Map.new([{:flipped, true}, {:letter, letter}, {:key, index}])
    newDeck = List.replace_at(game.deck, index, newCard)
    newMoves = game.moves + 1
    newGame = Map.put(game, :deck, newDeck)
    newGame = Map.put(newGame, :moves, newMoves)

    # if there is a card selected, see if it matches
    if (game.selectedCard != -1) do
      newGame
    else
      if (!flipped && game.selectedCard == -1) do
        newSelectedCard = index
        newGame = Map.replace!(newGame, :deck, newDeck)
        newGame = Map.put(newGame, :selectedCard, newSelectedCard)
        newGame
      end
    end
  end

  def evaluateMatch(game, %{"flipped" => flipped, "key" => index, "letter" => letter}) do
    # get the first and second cards
    firstCardIndex = game.selectedCard
    firstCard = Enum.at(game.deck, firstCardIndex)
    secondCard = Map.new([{:flipped, true}, {:letter, letter}, {:key, index}])

    evaluateMatch(game, firstCard, secondCard)
  end

  def evaluateMatch(game, firstCard, secondCard) do
    %{:flipped => flipped1, :key => index1, :letter => letter1} = firstCard
    %{:flipped => flipped2, :key => index2, :letter => letter2} = secondCard
    # if they're the same letter
    if (letter1 == letter2 && index1 != index2) do
      # update Score
      newGame = game

      newScore = ((game.matches + 1) / game.moves) * 200 + game.score

       newGame = Map.put(newGame, :score, newScore)
      # newGame = Map.put(newGame, :score, 4)

      # update number of matches
      newMatches = game.matches + 1
      newGame = Map.put(newGame, :matches, newMatches)

      # reset selected card
      newGame = Map.put(newGame, :selectedCard, -1)

    else
      # flip the cards
      newCard1 = Map.put(firstCard, :flipped, false)
      newCard2 = Map.put(secondCard, :flipped, false)

      newDeck = List.replace_at(game.deck, index1, newCard1)
      newDeck = List.replace_at(newDeck, index2, newCard2)

      # reset selected card
      newGame = Map.put(game, :selectedCard, -1)

      # update game
      newGame = Map.put(newGame, :deck, newDeck)
      newGame
    end
  end
end
