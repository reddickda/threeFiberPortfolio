# Personal react-three-fiber portfolio

The purpose of this project is to be my personal portfolio where I can add any 3D design/scenes/games.

It is live [Here](https://www.davidthehobbyist.com/) hosted via a [Heroku](https://www.heroku.com) App
 
## The Stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project uses React with [react-three-fiber](https://github.com/pmndrs/react-three-fiber) and other libraries related to [three.js](https://threejs.org/) in tandem with raw html and css

### `Routing technique for more scenes`
I use components as my 3D "scenes" and use react routing to be able to navigate betweeen all of the 3D work. I think its neat.

**Feel free to submit a PR or call anything else wrong to me. Or just any improvements you notice!**
**[this](https://discoverthreejs.com/) was a wonderful book that is online and free for learning the basics of three.js that I recommend anyone interested to read!**

Thanks,
DR

## The Games
I have two games available in this portfolio. One is just Three.js (the 3D scene with the robot) and the other is a Unity game.

#Snail Escape
I exported this game as a webgl app from Unity and hosted it on Simmer.io, then just embedded it in the html as an iframe. I also used the same Heroku app that hosts this React site to add a Postgres database where I connected to the cli to make a Leaderboard table. I then connected to that table with a script in the Unity game using npgsql - make sure to download the package, unzip contents, and drag and drop the "NetStandard2.0" dll into a "Plugins" folder in your assets for your Unity project.
