import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';

import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

import { validateColorValue } from '@/utils';
import { DynamicFaviconTitleGradient } from '@/components/dynamic-favicon';
import ColorStripe from '@/components/color-stripe';


export default function ColorPalette({}) {
  const { colors } = useParams();
  const [ colorList, setColorList ] = useState([]);

  function failSafeValidate(color) {
    return validateColorValue(color) || 'transparent';
  }

  useEffect(() => {
    document.querySelector("#app").style.flexDirection = "row";

    const palette = colors.split('-')
      .map((el) => { return {name: el, id: window.crypto.randomUUID() }})
      .map((color) => {
        const validated = failSafeValidate(color.name);
        return {...color, validated: validated}
      });

    setColorList([...palette]);
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", colorList.map((color) => color.name).join("-"))
  }, [colorList])

  const handleDragEnd = (ev) => {
    const { active, over } = ev;

    if (over && active.id !== over.id) {
      setColorList((colors) => {
        const oldIndex = colors.findIndex(color => color.id === active.id);
        const newIndex = colors.findIndex(color => color.id === over.id);
        return arrayMove(colors, oldIndex, newIndex);
      })
    }
  }

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
      >
        <SortableContext items={colorList}>
          {colorList.map((color) => (
            <ColorStripe key={color.id} id={color.id} name={color.validated}/>
          ))}
        </SortableContext>
      </DndContext>
      <DynamicFaviconTitleGradient colors={colorList.map((color) => color.validated)}/>
    </>
  );
}
