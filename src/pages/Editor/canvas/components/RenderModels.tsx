import type { FC } from 'react'
import { memo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { useLoader } from '@react-three/fiber'
import { TransformControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { Vector3 } from 'three'

import { TransformControlsModeItem } from './RenderMesh'
import type { ModelType } from '@/type/SchemaType'

interface RenderModelProps {
  model: ModelType
}

const RenderModels: FC<RenderModelProps> = ({ model }) => {
  const transform = useRef(null)
  const { position } = model
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])
  const { scene } = useLoader(GLTFLoader, model.source)

  return (
    <>
      <TransformControls
        position={currentPosition as any as Vector3}
        size={1}
        ref={transform}
        mode={TransformControlsModeItem.translate}>
        <mesh
          geometry={(scene.children[0] as any).geometry}
          material={(scene.children[0] as any).material}
        />
      </TransformControls>
    </>
  )
}

export default memo(RenderModels, (prevProps, nextProps) => {
  return isEqual(prevProps.model, nextProps.model)
})
