import '@/test'
import { CounterComponent, NumberText } from '@/test'

document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('counter') as CounterComponent
    const counter2 = document.getElementById('counter2') as CounterComponent
    const container = document.getElementById('container')
    const incrementBtn = document.getElementById('increment')
    const decrementBtn = document.getElementById('decrement')

    Object.assign(counter, {
        color: 'pink',
        size: 69,
        bold: true
    })

    counter.toggleAttribute('bold', false)
    console.log(counter.bold)

    counter2.increment()

    incrementBtn.addEventListener('click', () => counter.increment())
    decrementBtn.addEventListener('click', () => counter.decrement())

    // Number text
    for (var i = 0; i < 10; i++) {
        var nt = document.createElement('number-text') as NumberText

        nt.value = i

        nt.debug()

        container.appendChild(nt)
    }
})
