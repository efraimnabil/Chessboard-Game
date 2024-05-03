import { Chessboard } from 'react-chessboard'
import './App.css'
import { BoardPosition } from 'react-chessboard/dist/chessboard/types'
import { useState } from 'react'

function App() {

  // Random position for the knight
  const randomPosition = (): BoardPosition => {
      const row = Math.floor(Math.random() * 8)
      const col = Math.floor(Math.random() * 8)
      const square = String.fromCharCode('a'.charCodeAt(0) + row) + (col + 1)
      const position: BoardPosition = {}
      position[square as keyof BoardPosition] = 'wN'
      return position
  }

  const [position, setPosition] = useState< BoardPosition | undefined>(randomPosition())

  interface Square {
    row: number;
    col: number;
  }

  const validMoves = (square: Square): Square[] => {
      const moves = [
          {row: -2, col: 1},
          {row: -2, col: -1},
          {row: 1, col: 2},
          {row: -1, col: 2},
      ]
      
      return moves.map(move => {
          return {
              row: square.row + move.row,
              col: square.col + move.col
          }
      }).filter(square => {
          return square.row >= 0 && square.row < 8 && square.col >= 0 && square.col < 8
      })
  }

  const onSquareClick = (square: string) => {

      const knightRow = position ? Object.keys(position).map(square => {
          return square.charCodeAt(0) - 'a'.charCodeAt(0)
      }
      )[0] : 0
      const knightCol = position ? Object.keys(position).map(square => {
          return parseInt(square[1]) - 1
      }
      )[0] : 0

      const squareRow = square.charCodeAt(0) - 'a'.charCodeAt(0)
      const squareCol = parseInt(square[1]) - 1

      console.log(validMoves({row: squareRow, col: squareCol}))

      console.log('clicked square', square.charCodeAt(0) - 'a'.charCodeAt(0), parseInt(square[1]) - 1)

      const validMove = validMoves({row: knightRow, col: knightCol}).filter(move => {
          return move.row === squareRow && move.col === squareCol
      }).length

      if(validMove) {
          // move the piece
          console.log('move the piece to', square)
          const newPosition: BoardPosition = {}
          newPosition[square as keyof BoardPosition] = 'wN'
          setPosition(newPosition)
          return
      }

      if (!position || !position[square as keyof BoardPosition]) {
          return
      }

      const moves = validMoves({row: squareRow, col: squareCol})
      const newPosition: BoardPosition = {}
      moves.forEach(move => {
          const moveSquare = String.fromCharCode('a'.charCodeAt(0) + move.row) + (move.col + 1)
          newPosition[moveSquare as keyof BoardPosition] = 'wN'
      })
  }



  return (
    <div>
      <Chessboard
          position={position}
          arePiecesDraggable={false}
          boardWidth={600}
      />
    </div>
  )
}

export default App
