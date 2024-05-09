import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { Model } from "../components/Model";
import { Suspense, useRef } from "react";
import Loader from "../components/Loader";

const Home = () => {
  const navigate = useNavigate();
  const rulesRef = useRef<HTMLHeadingElement>(null);

  const startGame = () => {
    navigate("/game");
  };

  const scrollToRules = () => {
    if (rulesRef.current) {
      rulesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="w-full flex flex-col justify-center space-y-10 items-center p-10 text-white font-Gayathri">
      <h1 className="absolute top-10 left-10 text-4xl font-bold">
        Knight Game
      </h1>
      <h1 className="text-3xl font-bold">Welcome to our Knight Game !</h1>
      <p className="text-2xl text-[#D2E9F0]">
        You and AI are playing a game on a chessboard.
      </p>

      <div className="flex space-x-3">
        <button
          className="text-white font-bold py-1 px-4 border rounded text-lg"
          onClick={scrollToRules}
        >
          Show Rules
        </button>
        <button
          className="bg-[#D2E9F0] text-black font-bold py-1 px-8 rounded text-lg"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>

      <div className="w-96 h-96 flex items-center justify-center">
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [0, 20, -70] }}>
            <ambientLight color={"#000"} />
            <Model
              specificXPosition={0}
              specificYPosition={0}
              specificZPosition={0}
            />
            <Environment preset="sunset" />
            <OrbitControls autoRotate autoRotateSpeed={10} />
          </Canvas>
        </Suspense>
      </div>

      <h1 ref={rulesRef} className="text-2xl font-bold">
        Rules
      </h1>

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
    </div>
  );
};

export default Home;
