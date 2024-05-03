import { useNavigate } from "react-router-dom"

interface IProps {

}

const Home = ({}: IProps) => {
  const navigate = useNavigate()
  const startGame = () => {
    navigate('/game')
  }
  return (
    <div className="w-full flex-col justify-center items-center p-10">
        <h1 className="text-4xl">Welcome to our Knight Game !</h1>
        <p className="text-2xl">Click on the button to start the game</p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={startGame}
        >
          Start Game
        </button>
    </div>
  )
}

export default Home