// ChessBoard.js
import React, { useEffect, useState } from "react";
import Box from "./box";



interface moveType {
  prevIndex : number,
  newIndex  : number,
  icon : string
}

const ChessBoard: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket>();
  // const [msg,setMsg] = useState<string>("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to the WebSocket server");
      socket.send("Hello Server!");
    };

    socket.onmessage = (event) => {
      const receivedData : moveType = JSON.parse(event.data);
      // console.log('Message from server:', receivedData);
      updateBoardAfterTheMove(receivedData.prevIndex , receivedData.newIndex ,receivedData.icon);  
    
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    setSocket(socket);
    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);


  
  const [box, setBox] = useState<string[]>(Array(64).fill(""));
  const [deadIcons , setDead]  = useState<string[]>([]);
  const [move,setMove] = useState<moveType>();
  const updateBoardAfterTheMove = (prevIndex: number, currIndex: number, icon: string) => {
    setBox((prevBox) => {
      const newArr = [...prevBox];
      newArr[prevIndex] = "";
      const currElement = newArr[currIndex];
      newArr[currIndex] = icon;
  
      if (currElement !== "") {
        setDead((prevDeadIcons) => [...prevDeadIcons, currElement]);
      }
  
      return newArr;
    });
  };
  


  const updateMove= (prevIndex : number, newIndex : number ,icon : string )=>{
    const newArr = {prevIndex,newIndex,icon};
    setMove(newArr);
  }
useEffect(()=>{
  if(socket?.readyState === WebSocket.OPEN){
   socket.send(JSON.stringify(move));
  }
},[move,socket])
  const renderBoard = () => {
    const board = [];
    let count = 0;
    for (let row = 0; row < 8; row++) {
      const rowBoxes = [];
      for (let col = 0; col < 8; col++) {
        const isBlack = (row + col) % 2 === 1;
        rowBoxes.push(
          <Box
            key={count}
            holding={true}
            black={isBlack}
            icon={box[count]}
            dead={deadIcons}
            count={count}
            updateMove={updateMove}
            boxes={box}
            updateBox={updateBoard}
            updateDead={updateDead}
          />
        );
        count++;
      }
      board.push(
        <div key={row} className="flex">
          {rowBoxes}
        </div>
      );
    }
    return board;
  };

const updateDead = (newIcons : string[]) =>{
  setDead(newIcons);
}


  useEffect(() => {
    const init = () => {
      const newArr = Array(64).fill("");
      newArr[0] = "black_rook";
      newArr[7] = "black_rook";
      newArr[56] = "white_rook";
      newArr[63] = "white_rook";
      newArr[57] = "white_knight";
      newArr[62] = "white_knight";
      newArr[1] = "black_knight";
      newArr[6] = "black_knight";
      newArr[2] = "black_bishop";
      newArr[5] = "black_bishop";
      newArr[3] = "black_queen";
      newArr[4] = "black_king";
      newArr[58] = "white_bishop";
      newArr[61] = "white_bishop";
      newArr[59] = "white_queen";
      newArr[60] = "white_king";

      for (let i = 8; i <= 15; i++) {
        newArr[i] = "black_pawn";
      }
      for (let i = 48; i <= 55; i++) {
        newArr[i] = "white_pawn";
      }
      updateBoard(newArr);
    };
    init();
  }, []);


  const updateBoard = (newBoard : string[])=>{
    setBox([...newBoard]);
  }



  return (
    <div>
      <h1>Chess Board</h1>
      <div style={{ display: "inline-block" }}>{renderBoard()}</div>
      <div className="flex border-solid flex-wrap">
      {deadIcons.map((icon ,index)=>(
        <img key={index} src={`${icon}.png`} alt="Chess Piece" />
      ))} 
      </div>
    </div>
  );
};

export default ChessBoard;
