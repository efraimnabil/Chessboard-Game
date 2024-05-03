import { BoardPosition } from "react-chessboard/dist/chessboard/types"
import { Square } from "../interfaces"
import { moves } from "./constants"

export const changeToSquare = (square: Square): string => {
    return String.fromCharCode('a'.charCodeAt(0) + square.row) + (square.col + 1)
}

export const getKnightSquare = (position: BoardPosition): Square => {
    const square = Object.keys(position).map(square => {
        return {
            row: square.charCodeAt(0) - 'a'.charCodeAt(0),
            col: parseInt(square[1]) - 1
        }
    })[0]
    return square
}

export const validMoves = (square: Square): Square[] => {
    return moves.map(move => {
        return {
            row: square.row + move.row,
            col: square.col + move.col
        }
    }).filter(square => {
        return square.row >= 0 && square.row < 8 && square.col >= 0 && square.col < 8
    })
}

export const createOptionsSquares = (position: BoardPosition): Record<string, React.CSSProperties> => {
    const moves = validMoves(getKnightSquare(position))
    const optionsSquares: Record<string, React.CSSProperties> = {}
    moves.forEach(move => {
        optionsSquares[changeToSquare(move)] = {backgroundColor: 'green'}
    })
    return optionsSquares
}

export const randomPosition = (): BoardPosition => {
    const row = Math.floor(Math.random() * 8)
    const col = Math.floor(Math.random() * 8)
    const square = String.fromCharCode('a'.charCodeAt(0) + row) + (col + 1)
    const position: BoardPosition = {}
    position[square as keyof BoardPosition] = 'wN'
    return position
}