import create from 'zustand'
import { unstable_batchedUpdates } from 'react-dom'

const PoissonDiskSampling = require('poisson-disk-sampling/src/implementations/fixed-density');
const pds = new PoissonDiskSampling({shape:[45,45],minDistance: 10});
const boxePositions = pds.fill()
const boxes = [
    {pos:[boxePositions[0][0],.5,boxePositions[0][1]], hit:false},
    {pos:[boxePositions[1][0],.5,boxePositions[1][1]], hit: false}, 
    {pos:[boxePositions[2][0],.5,boxePositions[2][1]], hit: false},
    {pos:[boxePositions[3][0],.5,boxePositions[3][1]], hit: false}, 
    {pos:[boxePositions[4][0],.5,boxePositions[4][1]], hit: false},
    {pos:[boxePositions[5][0],.5,boxePositions[5][1]], hit: false}, 
    {pos:[boxePositions[6][0],.5,boxePositions[6][1]], hit: false}
]

export const useStore = create(set => ({
    boxes: boxes,
    score: 0,
    gameState: {
        start: true,
        playing: false,
        paused: false,
        gameOver: false
    },
    resetBoxes: () =>{ 
        const boxePositions = pds.fill()
        const boxes = [
            {pos:[boxePositions[0][0],.5,boxePositions[0][1]], hit:false},
            {pos:[boxePositions[1][0],.5,boxePositions[1][1]], hit: false}, 
            {pos:[boxePositions[2][0],.5,boxePositions[2][1]], hit: false},
            {pos:[boxePositions[3][0],.5,boxePositions[3][1]], hit: false}, 
            {pos:[boxePositions[4][0],.5,boxePositions[4][1]], hit: false},
            {pos:[boxePositions[5][0],.5,boxePositions[5][1]], hit: false}, 
            {pos:[boxePositions[6][0],.5,boxePositions[6][1]], hit: false}
        ]
        set({boxes:boxes})},
    //removeBox: remove box here
    increaseScore:() => set(state => ({ score: state.score + 1 })),
    resetScore: () => set({ score: 0 })
}))

export const nonReactCallbackIncreaseScore = () => {
    unstable_batchedUpdates(() => {
      useStore.getState().increaseScore()
    })
}

export const nonReactCallbackResetScore = () => {
    unstable_batchedUpdates(() => {
      useStore.getState().resetScore()
    })
}

export const nonReactCallbackResetBoxes = () => {
    unstable_batchedUpdates(() => {
      useStore.getState().resetBoxes()
    })
}