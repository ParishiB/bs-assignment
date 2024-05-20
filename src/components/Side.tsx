import { useState } from "react";

const Side = () => {
  const [widgets, setWidgets] = useState<string[]>([]);

  function handleOnDrag(e: any, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDrop(e: any) {
    const widgetType = e.dataTransfer.getData("widgetType");
    console.log("widgetType", widgetType);
    setWidgets([...widgets, widgetType]);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
  }

  return (
    <div>
      <div
        className="widget"
        draggable
        onDragStart={(e) => handleOnDrag(e, "widget a")}
      >
        Message
      </div>
      <div
        className="widget"
        draggable
        onDragStart={(e) => handleOnDrag(e, "widget b")}
      >
        Widget B
      </div>
      <div
        className="widget"
        draggable
        onDragStart={(e) => handleOnDrag(e, "widget c")}
      >
        Widget C
      </div>
      <div
        className="page border border-red-300 p-2"
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {widgets.map((widget, index) => (
          <div className="" key={index}>
            {widget}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Side;
