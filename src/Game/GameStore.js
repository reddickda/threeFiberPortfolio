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

///Todo: if box position is within players, reshuffle?
export const useStore = create(set => ({
    boxes: boxes,
    score: 0,
    gameState: {
        start: true,
        playing: false,
        paused: false,
        gameOver: false
    },
    //fully resets boxes - doesnt work
    resetBoxes: () =>{ 
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
        console.log(boxes)
        set({boxes:boxes})},
    //removeBox: remove box here
    //preserves hit status
    shuffleBoxes:() => {
        const boxePositions = pds.fill()
        set(state => ({boxes: [
            {pos:[boxePositions[0][0],.5,boxePositions[0][1]], hit: state.hit},
            {pos:[boxePositions[1][0],.5,boxePositions[1][1]], hit: state.hit}, 
            {pos:[boxePositions[2][0],.5,boxePositions[2][1]], hit: state.hit},
            {pos:[boxePositions[3][0],.5,boxePositions[3][1]], hit: state.hit}, 
            {pos:[boxePositions[4][0],.5,boxePositions[4][1]], hit: state.hit},
            {pos:[boxePositions[5][0],.5,boxePositions[5][1]], hit: state.hit}, 
            {pos:[boxePositions[6][0],.5,boxePositions[6][1]], hit: state.hit}]}))},
    increaseScore:() => set(state => ({ score: state.score + 1 })),
    resetScore: () => {set({ score: 0 })}
}))

//so we can fire these outside of events

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

export const nonReactCallbackShuffleBoxes = () => {
    unstable_batchedUpdates(() => {
      useStore.getState().shuffleBoxes()
    })
}

export const boxasjhddhd = () => {
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
    unstable_batchedUpdates(() => {
        useStore.setState({boxes: boxes})
      })
}