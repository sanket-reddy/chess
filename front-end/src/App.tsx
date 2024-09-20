import "./App.css";
import ChessBoard from "../components/chessBoard";

function App() {
  return (
    <div className="board my-5 w-full h-screen flex justify-center">
      <ChessBoard />
    </div>
  );
}

export default App;
