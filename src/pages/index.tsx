import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useNavigate } from "react-router-dom"
import { Model } from "../components/Model"

interface IProps {

}

const Home = ({}: IProps) => {
  const navigate = useNavigate()
  const startGame = () => {
    navigate('/game')
  }
  return (
    <div className="w-full flex flex-col justify-center space-y-10 items-center p-10 text-white">
        <h1 
          className="text-4xl font-bold">
            Welcome to our Knight Game !
        </h1>
        <div className="w-96 h-96">
          <Canvas camera={{position: [0, 20, -70]}}>
            <ambientLight color={"#000"} />
            <Model 
              specificXPosition={0}
              specificYPosition={0}
              specificZPosition={0}
            />
            <Environment preset='night'/>
            <OrbitControls autoRotate autoRotateSpeed={10}/>
          </Canvas>
        </div>
        <p 
          className="text-2xl">
            You and AI are playing a game on a chessboard. The rules of the game are as follows:
        </p>
        <ul className="text-2xl list-disc list-inside">
          <li>
            The game starts with a single Knight located at some random position. 
          </li>
          <li>
            In each move, a player must move the Knight from cell to one of the following locations:
            <ul className="list-disc list-inside ml-5">
              <li>2 cells left and 1 cell down</li>
              <li>2 cells left and 1 cell up</li>
              <li>1 cell right and 2 cells down</li>
              <li>1 cell left and 2 cells down</li>
              <p className="text-sm">
                Note: The Knight must remain inside the confines of the board.
              </p>
            </ul>
          </li>
          <li>
            The players move in alternating turns. The first player who is unable to make a move loses the game.
          </li>
        </ul>
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