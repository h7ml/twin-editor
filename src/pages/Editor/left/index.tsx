import type { FC } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Menu } from 'antd'

import type { Vector3 } from 'three'
import store from '@/store'
import { BASECONFIG } from '@/constants'
import type { BaseConfigTypeItem } from '@/type/SchemaType'
import './index.scss'

interface LeftProps {

}

interface DataSourcesType {
  label: string
  name: string
  key: string
  source?: string
  children?: DataSourcesType[]
}

const dataSources: DataSourcesType[] = [
  {
    label: '模型',
    name: 'material',
    key: 'material',
    children: [
      {
        name: 'diamond',
        key: 'diamond',
        label: '钻石',
        source: './gltf/dflat.glb',
      },
      {
        name: 'monkey',
        key: 'monkey',
        label: '猴子',
        source: './gltf/monkey.glb',
      },
      {
        name: 'wall',
        key: 'wall',
        label: '工厂',
        source: './gltf/wall.glb',
      },
      {
        name: 'tree',
        key: 'tree',
        label: '垂柳',
        source: './gltf/tree.glb',
      },
    ],
  },
  {
    label: '物体',
    name: 'structure',
    key: 'structure',
    children: [
      {
        name: 'boxGeometry',
        key: 'boxGeometry',
        label: '立方体',
      },
      {
        name: 'capsuleGeometry',
        key: 'capsuleGeometry',
        label: '胶囊图',
      },
      {
        name: 'circleGeometry',
        key: 'circleGeometry',
        label: '圆形',
      },
      {
        name: 'coneGeometry',
        key: 'coneGeometry',
        label: '圆锥',
      },
    ],
  },
]

const Left: FC<LeftProps> = () => {
  const [currentRenderItem, setCurrentRenderItem] = useState(dataSources[0]?.children || [])
  const [currentSelectedType, setCurrentSelectedType] = useState(dataSources[0].name)
  const schemaStore = store.schemaStore(state => state)

  const addObject = (baseItem: DataSourcesType) => {
    switch (currentSelectedType) {
      case 'structure':
        schemaStore.addMesh({
          uid: uuidv4(),
          position: {
            x: ~(Math.random() * 5).toFixed(1),
            y: -~(Math.random()).toFixed(1),
            z: ~(Math.random() * 5).toFixed(1),
          } as Vector3,
          geometry: {
            type: baseItem.name as any,
            width: 1,
            height: 1,
            depth: 1,
          },
          material: {
            type: 'meshBasicMaterial',
          },
          baseConfig: BASECONFIG as BaseConfigTypeItem[],
        })
        break
      case 'material':
        schemaStore.addModel({
          uid: uuidv4(),
          position: {
            x: ~(Math.random() * 5).toFixed(1),
            y: -~(Math.random()).toFixed(1),
            z: ~(Math.random() * 5).toFixed(1),
          } as Vector3,
          type: 'gltf',
          source: baseItem.source as string,
          baseConfig: BASECONFIG as BaseConfigTypeItem[],
        })
        break
      default:
        break
    }
  }

  /**
   * toggle tyle
   * @param type
   */
  const handleSelect = ({ key }: { key: string }) => {
    setCurrentSelectedType(key)
    setCurrentRenderItem(
      dataSources.find(item => item.key === key)?.children || [],
    )
  }

  return (
    <div className='flex rounded-md editor-left mb-2' style={{ height: '100%' }}>
      <div className='flex flex-col editor-left-menu pr-1' style={{ backgroundColor: '#252526' }} >
        <Menu theme="dark" defaultSelectedKeys={[dataSources[0].key]} onClick={handleSelect} mode="vertical"
          items={dataSources.map(item => ({ ...item, children: null }))}
          style={{ backgroundColor: '#252526', color: '#ccc' }}/>
      </div>
      <div className='editor-left-item pl-1' style={{ width: '150px', height: 'auto', backgroundColor: '#252526' }}>
        <div className='flex flex-wrap h-min'>
          {
        currentRenderItem.map((item) => {
          return <div onClick={() => addObject(item)} className='hover:bg-slate-300 bg-slate-200 cursor-pointer w-16 h-16 m-1 flex justify-center items-center text-sm rounded' key={item.name}>{item.label}</div>
        })
      }
        </div>
      </div>
    </div>
  )
}

export default Left
