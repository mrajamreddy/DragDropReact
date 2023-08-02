
import React, { useState, useCallback } from 'react'
import  { ButtonsList } from './buttonsList';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '@mui/material';

const BUTTONS = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
]

 const App = () => {

    const [buttons, setButtons] = useState(BUTTONS)

    const moveButtons = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = buttons[dragIndex]
            const hoverItem = buttons[hoverIndex]
        
            setButtons(buttons => {
                const updatedButtons = [...buttons]
                updatedButtons[dragIndex] = hoverItem
                updatedButtons[hoverIndex] = dragItem
                console.log("updatedButtons",)
                return updatedButtons
            })
        },
        [buttons],
    )

    return (
      <DndProvider backend={HTML5Backend}>
        <div>{buttons.map((button, index) => (
            <ButtonsList
                key={button.id}
                index={index}
                text={button.name}
                moveButtonItem={moveButtons}
            />
        ))}
        </div>
        </DndProvider>
    )
}

export default App;