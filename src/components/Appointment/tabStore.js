import create from 'zustand';

export const useTabStore = create((set) => ({
    receved: 0,
    accepted: 0,
    rejected: 0,
    paste: 0,
    accept: v => set(state => ({...state,accepted: v})),
    setPaste: v => set(state => ({...state,paste: v})),
    receve: v => set(state => ({...state,receved: v})),
    reject: v => set(state => ({...state,rejected: v}))
}))