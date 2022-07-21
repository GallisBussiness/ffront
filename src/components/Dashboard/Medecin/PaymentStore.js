import create  from 'zustand'

export const usePaymentStore = create((set) => ({
    total: 6500,
    teleconsultation: 7500,
    facturation: 5500,
    comptabilite:4000,
    ordonnance: 5000,
    assurance:7000,
    toggleAssurance:val => val ? set((state) => ({total: state.total + state.assurance})) : set((state) => ({total: state.total - state.assurance})),
    toggleOrdonnance:val => val ? set((state) => ({total: state.total + state.ordonnance})) : set((state) => ({total: state.total - state.ordonnance})),
    toggleComptabilite: val => val ? set(state => ({total: state.total + state.comptabilite})) : set( state => ({total: state.total - state.comptabilite})),
    toggleFacturation: val => val ? set(state => ({total: state.total + state.facturation})) : set( state => ({total: state.total - state.facturation})),
    toggleTeleconsultation: val => val ? set( state => ({total: state.total + state.teleconsultation})) : set(state => ({total: state.total - state.teleconsultation})),
}))