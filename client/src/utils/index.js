import { surpriseMePrompts } from '../constants/index.js';

const getRandomPrompt = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]


    if (randomPrompt === prompt) return getRandomPrompt(prompt)


    return randomPrompt
}


export default getRandomPrompt;