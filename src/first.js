
import React, { useState, useCallback } from 'react'
import  { ButtonsList } from './buttonsList';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '@mui/material';

const buttons = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
]

 const App = () => {

    const [button, setButtons] = useState(buttons)

    const moveButtons = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = buttons[dragIndex]
            const hoverItem = buttons[hoverIndex]
        console.log("hover",dragItem,hoverItem)
            setButtons(buttons => {
                const updatedButtons = [...buttons]
                updatedButtons[dragIndex] = hoverItem
                updatedButtons[hoverIndex] = dragItem
                console.log("updatedButtons",updatedButtons)
                return updatedButtons
            })
        },
        [button],
    )

    const [dragOver,setDragOver] =useState();
    const handleDragStart = (event) =>{
              const id= event.taget.id;
              event.dataTransfer.setData("buttonid",id);
    }
    const handleDragOver =(event) =>{
          event.preventDefalut();
    }
    const handleDragEnter =(event) =>{
     const id=event.taget.id;
     setDragOver(id)
    }
    const handleDrop =(event) =>{
      const id= event.taget.id;
      const draggedButton = event.dataTransfer.getData("buttonid");
      const draggedButtonIndex = buttons.findIndex(button=>button.id=draggedButton);
      const dropButtonIndex = buttons.findIndex(button=>button.id=id);
      
    }
    return (
      // <DndProvider backend={HTML5Backend}>
        <div>{buttons.map((button, index) => {
          const  attributes= {
               draggable:true,
               onDragStart:handleDragStart,
               onDragOver:handleDragOver,
               onDrop:handleDrop,
               onDragEnter:handleDragEnter,
              //  dragOver:(index=== dragOver)
          }
          return (
            // <ButtonsList
            //     key={button.id}
            //     index={index}
            //     text={button.name}
            //     moveButtonItem={moveButtons}
            // />
            
            <div key={button.id} {...attributes}>
            {button.name}
              </div>
        )})}
        </div>
        // </DndProvider>
    )
}

export default App;