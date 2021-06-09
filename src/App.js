import { Suspense } from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import HomeScreen from './HomeScreen';
import ThreeDimensionalScene from './ThreeDimensionalScene';
import Devlog from './DevLog';

export default function App() {

  return (
    <div>
      <Switch>
        {/* style the suspense fallback */}
        <Route path="/" exact> <Suspense fallback={<div>Loading...</div>}><HomeScreen/></Suspense></Route>
        <Route path="/three" exact> <ThreeDimensionalScene /></Route>
        <Route path="/devlog" exact> <Devlog /></Route>
      </Switch>
    </div>
  );
}

