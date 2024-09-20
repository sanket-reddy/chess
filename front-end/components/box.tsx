import React from "react";

interface BoxTypes {
  holding: boolean;
  icon: null | string;
  black?: boolean;
  count: number;
  boxes: string[];
  updateBox: (newBox: string[]) => void;
  dead : string[];
  updateDead : (newIcons : string[] )=> void; 
  updateMove : (prevIndex : number, newIndex : number, icon : string )=>void
}

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

const Box: React.FC<BoxTypes> = (props) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (props.icon) {
      e.dataTransfer.setData("count", String(props.count));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (props.icon) {
    //   alert("invalid move");
    const prevIndex = Number(e.dataTransfer.getData("count"));
    const prevElement = props.boxes[prevIndex];
    const prevColor = prevElement.includes("white") ? "white" : "black";
    const oppentColor = prevColor === "white" ? "black" : "white";
    if(props.icon.includes(oppentColor)){
        props.boxes[prevIndex] = "";
        const currIndex = props.count;
        // const deadElement = props.boxes[currIndex];
        props.boxes[currIndex] = prevElement;
        props.updateBox(props.boxes);
        // const deadIcons = [...props.dead,deadElement]
        // props.updateDead(deadIcons);
        props.updateMove(prevIndex,currIndex,prevElement);
    }
    else{
        alert("invalid move")
    }

    } else {
      const prevIndex = Number(e.dataTransfer.getData("count"));
      const currIndex = props.count;
      const prevElement = props.boxes[prevIndex];
      const temp = props.boxes[prevIndex];
      props.boxes[prevIndex] = props.boxes[currIndex];
      props.boxes[currIndex] = temp;
      props.updateBox(props.boxes);
      props.updateMove(prevIndex,currIndex,prevElement);
    }
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e)}
      onDrop={(e) => handleDrop(e)}
      onDragOver={handleDragOver}
      className={`border flex items-center justify-center border-gray-500 w-[82px] p-4 h-[82px] ${
        props.black ? "bg-[#69923e]" : "bg-[#E3DDD5]"
      }`}
    >
      {props.holding && props.icon ? (
        <img src={`${props.icon}.png`} alt="Chess Piece" />
      ) : null}
    </div>
  );
};

export default Box;
