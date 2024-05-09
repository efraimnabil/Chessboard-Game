import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { Model } from "../components/Model";
import { Suspense } from "react";

interface IProps {}

const Loader = () => {
  return (
<div role="status">
    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
  );
};

const Home = ({}: IProps) => {
  const navigate = useNavigate();
  const startGame = () => {
    navigate("/game");
  };
  return (
    <div className="w-full flex flex-col justify-center space-y-10 items-center p-10 text-white">
      <h1 className="text-4xl font-bold">Welcome to our Knight Game !</h1>

      <div className="w-96 h-96 flex items-center justify-center">
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [0, 20, -70] }}>
            <ambientLight color={"#000"} />
            <Model
              specificXPosition={0}
              specificYPosition={0}
              specificZPosition={0}
            />
            <Environment preset="night" />
            <OrbitControls autoRotate autoRotateSpeed={10} />
          </Canvas>
        </Suspense>
      </div>
      <p className="text-2xl">
        You and AI are playing a game on a chessboard. The rules of the game are
        as follows:
      </p>
      <ul className="text-2xl list-disc list-inside">
        <li>
          The game starts with a single Knight located at some random position.
        </li>
        <li>
          In each move, a player must move the Knight from cell to one of the
          following locations:
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
          The players move in alternating turns. The first player who is unable
          to make a move loses the game.
        </li>
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={startGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
