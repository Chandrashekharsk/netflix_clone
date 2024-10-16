import Body from "./components/Body";
import { Toaster } from 'react-hot-toast'; 
import MovieDialog from "./components/MovieDialog";
 
function App() {

  const hello =()=>{
    console.log("env: "+process.env.REACT_APP_API_URL);
    console.log("END");
  }

  return (
    <div>
      {/* <button onClick={hello}>click</button> */}
       <Body/>
       <Toaster/>  
       <MovieDialog/>
    </div>
  );
}

export default App;
