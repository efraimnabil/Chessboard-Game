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
