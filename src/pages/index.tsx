import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { Model } from "../components/Model";
import { Suspense, useRef } from "react";
import Loader from "../components/Loader";
import options from "../assets/options.png";
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
      

      <div className="flex md:flex-row flex-col gap-3">
        <button
          className="text-white font-bold px-4 pt-2 pb-1 border rounded text-lg"
          onClick={scrollToRules}
        >
          Show Rules
        </button>
        <button
          className="bg-[#D2E9F0] text-black font-bold px-8  pt-2 pb-1 rounded text-lg"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>

      <div className="w-full h-96 flex items-center justify-center">
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [0, 20, -70] }}>
            <ambientLight color={"#000"} />
            <Model
              specificXPosition={0}
              specificYPosition={0}
              specificZPosition={0}
            />
            <Environment preset="sunset" />
            <OrbitControls autoRotate autoRotateSpeed={10} enableZoom={false} enableRotate={false} />
          </Canvas>
        </Suspense>
      </div>

      <h1 ref={rulesRef} className="text-2xl font-bold">
        Rules
      </h1>

      <ul className="text-2xl list-disc space-y-3">
        <li>
          You have a Knight on a chessboard. Starts at a random position.
        </li>
        <li>
          Here are the valid moves for the Knight:
          <div className="flex justify-center my-10">
            <img src={options} alt="options" className="w-64" />
          </div>
        </li>
        <li>
          You and AI will take turns moving the Knight. The first cannot move loses.
        </li>
      </ul>
    </div>
  );
};

export default Home;
