import { Suspense } from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import HomeScreen from './HomeScreen';
import ThreeDimensionalScene from './Procedural/ThreeDimensionalScene';
import Devlog from './DevLog';
import GameScene from "./Game/GameScene";
// import ProceduralScene from "./Procedural/ProceduralScene";

export default function App() {

  return (
    <div>
      <Switch>
        {/* style the suspense fallback */}
        <Route path="/" exact> <Suspense fallback={<div>Loading...</div>}><HomeScreen/></Suspense></Route>
        <Route path="/three" exact> <ThreeDimensionalScene /></Route>
        <Route path="/devlog" exact> <Devlog /></Route>
        <Route path="/game" exact> <GameScene /></Route>

        {/* <Route path="/procedural" exact><ProceduralScene /></Route> */}
      </Switch>
    </div>
  );
}

