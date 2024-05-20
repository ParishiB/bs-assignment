import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [popup, setPopup] = useState(false);
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

  const OpenPopup = (index: any) => {
    setPopup(true);
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
              className="absolute"
              style={{ left: widget.x, top: widget.y }}
            >
              {widget.type}
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
        </div>
      </div>
    </>
  );
}

export default App;
