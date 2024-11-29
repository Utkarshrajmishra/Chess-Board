import ChessGame from "../components/ChessGame";
import MovesList from "../components/MovesList";
const Home = () => {
  return (
    <>
      <div className="w-full h-[100vh] bg-neutral-700 flex flex-col py-1 px-2 gap-3">
        <div>
          <div></div>
          <ChessGame />
        </div>
        <div >
            <p className="text-white font-inter font-bold">Moves List</p>
          <MovesList />
        </div>
      </div>
    </>
  );
};

export default Home;
