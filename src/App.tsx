import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [expandedWidgets, setExpandedWidgets] = useState<number[]>([]);
  const [widgets, setWidgets] = useState<
    { type: string; x: number; y: number }[]
  >([]);

  function handleOnDrag(e: any, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDrop(e: any) {
    const widgetType = e.dataTransfer.getData("widgetType");
    const dropX = e.clientX - e.target.getBoundingClientRect().left;
    const dropY = e.clientY - e.target.getBoundingClientRect().top;
    setWidgets([...widgets, { type: widgetType, x: dropX, y: dropY }]);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
  }

  const handleWidgetClick = (index: number) => {
    if (expandedWidgets.includes(index)) {
      setExpandedWidgets(expandedWidgets.filter((i) => i !== index));
    } else {
      setExpandedWidgets([...expandedWidgets, index]);
    }
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-[70%_auto]">
        <div
          className="page border border-red-300 p-2 h-screen relative"
          onDrop={handleOnDrop}
          onDragOver={handleDragOver}
        >
          {widgets.map((widget, index) => (
            <div
              key={index}
              className="absolute cursor-pointer"
              onClick={() => handleWidgetClick(index)}
              style={{ left: widget.x, top: widget.y }}
            >
              {expandedWidgets.includes(index) ? (
                <div>
                  <p>{widget.type}</p>
                  <p>Additional information or detailed view here</p>
                </div>
              ) : (
                widget.type
              )}
            </div>
          ))}
        </div>

        <div>
          <div
            className="widget cursor-move border border-gray-600 p-2 m-2"
            draggable
            onDragStart={(e) => handleOnDrag(e, "Message")}
          >
            Message
          </div>
          {/* Uncomment and add more widgets as needed */}
          {/* <div
            className="widget cursor-move border border-gray-600 p-2 m-2"
            draggable
            onDragStart={(e) => handleOnDrag(e, "Widget B")}
          >
            Widget B
          </div>
          <div
            className="widget cursor-move border border-gray-600 p-2 m-2"
            draggable
            onDragStart={(e) => handleOnDrag(e, "Widget C")}
          >
            Widget C
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
