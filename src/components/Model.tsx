import { useGLTF } from "@react-three/drei";

interface IProps {
    specificXPosition: number;
    specificYPosition: number;
    specificZPosition: number;
}
export function Model({specificXPosition, specificYPosition, specificZPosition}: IProps) {
  const model = useGLTF("/compressed.glb");

  return (
    <mesh position={[specificXPosition, specificYPosition, specificZPosition]}>
      <primitive object={model.scene} />
    </mesh>
  );
}
