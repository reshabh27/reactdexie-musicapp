import { useState, useEffect } from "react";
import Player from "./mycomponents/Player";





function App2(props) {

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > props.queue.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, props.queue.length]);


  function forrender(val){
	let playing = <h2>no songs available</h2>;
	if(val.length) 
		playing = <Player
						currentSongIndex={currentSongIndex}
						setCurrentSongIndex={setCurrentSongIndex}
						nextSongIndex={nextSongIndex}
						songs={props.queue}
					/>
		
	return(
		playing
	);
}
  return (
    <div className="App2">
		{forrender(props.queue)}
    </div>
  );
}

export default App2;
