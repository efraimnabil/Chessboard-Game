import './App.css'

function App() {

  return (
    <div>
      <Chessboard 
          position="start"
          arePiecesDraggable={false}
          boardWidth={600}
      />
    </div>
  )
}

export default App
