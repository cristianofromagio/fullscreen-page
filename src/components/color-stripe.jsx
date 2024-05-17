import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ColorStripe({id, name}) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});

  const dragStyles = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ ...dragStyles, backgroundColor: name }}
      className={`validate-color ${name === 'transparent' ? 'invalid-color-code' : ''}`}>
    </div>
  )
}
