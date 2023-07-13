import { create } from 'zustand'

import type { GlobalConfigTyle, MeshType, ModelType, SchemaType } from '../type/SchemaType'

export type SelectCubeType = MeshType | ModelType | null
export interface SchemaStoreProps {
  data: SchemaType
  globalConfig: GlobalConfigTyle
  currentSelectedMesh: SelectCubeType
  addMesh: (mesh: MeshType) => void
  addModel: (model: ModelType) => void
  setData: (data: SchemaType) => void
  updateMesh: (id: string, mesh: MeshType) => void
  updateModel: (id: string, model: ModelType) => void
  setCurrentSelectedMesh: (mesh: MeshType | ModelType | null) => void
  reset: () => void
}

/**
 * json schema store
 * notes: 数据尽量扁平化
 */
const schemaStore = create<SchemaStoreProps>(set => ({
  data: {
    mesh: [],
    model: [],
  },

  globalConfig: {
    globalConfigData: {
      background: '#ffffff',
    },
    globalConfig: [
      {
        name: 'background',
        label: '背景颜色',
        type: 'color',
      },
    ],
  },

  currentSelectedMesh: null,

  addMesh: (mesh: MeshType) => set(state => ({
    data: {
      mesh: [...(state.data.mesh || []), mesh],
      model: state.data.model,
    },
  })),

  addModel: (model: ModelType) => set(state => ({
    data: {
      model: [...(state.data.model || []), model],
      mesh: state.data.mesh,
    },
  })),

  updateMesh: (uid: string, mesh: MeshType) => set(state => ({
    data: {
      mesh: state.data.mesh?.map((item) => {
        if (item.uid === uid)
          return mesh

        return item
      }),
      model: state.data.model,
    },
  })),

  updateModel: (uid: string, model: ModelType) => set(state => ({
    data: {
      model: state.data.model?.map((item) => {
        if (item.uid === uid)
          return model

        return item
      }),
      mesh: state.data.mesh,
    },
  })),

  setData: (data: SchemaType) => set(() => ({
    data,
  })),

  setCurrentSelectedMesh: (cube: MeshType | ModelType | null) => set(() => ({
    currentSelectedMesh: cube,
  })),

  reset: () => set(() => ({
    data: {
      mesh: [],
    },
  })),
}))

export type SchemaStoreType = typeof schemaStore

export default schemaStore
