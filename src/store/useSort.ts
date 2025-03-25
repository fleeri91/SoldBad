import { create } from 'zustand'

type listSort = 'name' | 'distance' | 'latestUpdate'

type SortState = {
  nearby: boolean
  listSort: listSort
}

type SortActions = {
  setNearby: (value: boolean) => void
  setSort: (value: listSort) => void
}

const initialState: SortState = {
  nearby: false,
  listSort: 'name',
}

export const useSortStore = create<SortState & SortActions>()((set) => ({
  ...initialState,
  setNearby: (value: boolean) => set({ nearby: value }),
  setSort: (value: listSort) => set({ listSort: value }),
}))
