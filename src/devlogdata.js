export const devlogdata =
[
    {
        "title": "Disclaimer",
        "content": "I am aware that this does not run as smooth or look as good on mobile right now. There is an issue with Ongesturedown from a phone and scrolling with react and how it handles rerendering. This and formatting issues for mobile I have not addressed can make the scrolling+html+3D scene together it look wonky at times."
    },
    {
        "title": "Starting the project:",
        "content": "I have been a programming for years, but recently at work I have started to do more front end than back end. This led to a deep dive into Javascript and React as a framework. Learning this new stack was great, it’s a marketable skill, but the development itself didn’t excite me. I got into computer science because I wanted to make video games, and front end development wasn't quite cutting it. Jump to the present: I discover three.js, a Javascript library on top of WebGL. Take it one step further, I discover React three fiber, a react component library on  TOP of three.js. This was a blessing - I could take what I have become good at from work, and apply it to something directly related to my passion - 3D development."
    },
    {
        "title": "First steps - learning three.js:",
        "content": "The first thing the React three fiber documentation recommends is a good understanding of three.js itself. I spent a good amount of time reading the three.js  documentation, going through examples online, and getting a good foundation of the pure Javascript, and how it is similar to regular  3D development in something like Unity. After getting a good grasp on three.js, I dove into react three fiber. Following some basic tutorials and getting to a point where I was comfortable seeing a three.js project and converting it to react three fiber, and vice versa."
    },
    {
        "title": "Creating and deploying a basic web page with react three fiber:",
        "content": "I use material-ui at work, not raw html and css, so this was what I set out to use as the landing page for my website. A pure material-ui page that used routing to jump to the actual 3D scene. I could not find any examples of this online but I was eventually able to scrape something together and have a material-ui home page with a button that took you to a basic 3D scene with a cool model to look at. I then created a Heroku app, linked it to my github project and enabled automatic deployments so I could have a live website with the intention of a custom domain and 24/7 uptime in the future so I could showcase my work."
    },
    {
        "title": "No more material-ui, combining html and the 3D scene in one:",
        "content": "I did not want to lean so heavily on material-ui as it wasn't showcasing what I wanted to do from the beginning. Thanks to pure happenstance, YouTube recommends me a fantastic video about using css-grid and three.js to have a cool scrolling webpage of html overlaid on top of a full 3D scene. I was absolutely sold and thrilled with the results. So I decided to go with this as my homepage, convert it to react three fiber, and add routing just as I had before so I can still have other 3D scenes. Converting this from three.js to react three fiber was not an easy task so that was when I decided to make the project public to spread the beautiful world of 3D development on webpages throughout the internet."
    },
    {
        "title": "Html button to a new 3D scene with routing:",
        "content": "The entire inspiration for this project was that I wanted to create a video game, or video game-like scene/scenes using React three fiber. I wanted it to be a portfolio website that other people could use for inspiration if they wanted to be able to show their 3D work easily as well. I am still toying with this but have a successful system where I use react-router and the history hook to render different scenes. My first one was just a collection of points that I animate using a sin function to create a sort of ripple effect as a proof of concept."
    },
    {
        "title": "The rotating donut:",
        "content": "Three.js uses a camera system just like any other graphics renderer does like in Unity or Unreal. Something I wanted was not just a 2D html HUD, but a cool 3D HUD like a Mario game or countless others. Here comes the rotating donut. I spent quite a few hours trying to use this donut 3D model I got for free to sit in the top right of the screen just like a 2D HUD element would. Now maybe there's an easier way to do this and I was just unaware but I had to find a way through three.js to have this donut move and rotate with the camera on scroll just like the rest of the webpage but in a way that it appeared static on the screen like a HUD. This ended up just being a position.copy and rotation.copy of the cameras position and rotation on the donut, and then a translateX,Y,and Z to have it move to the corner of the camera. Of course this posed another challenge I have not solved but have an interim solution for, and that’s using a breakpoint system to hardcode different values based on the size of the screen we are working with to determine where to put the donut."
    },
    {
        "title": "The custom domain problem:",
        "content": "I had a custom domain through wix that I wanted to use for my website so I didn’t have to use the provided herokuapp domain. Unfortunately I found I couldn't use the wix domain outside of the wix service, so I transferred it to godaddy for some money. Turns out godaddy doesn't provide the needed records to link it to my deployed heroku app either, I didn’t do enough research on this before but I was stubborn and didn’t want to spend more money on the issue. I ended up paying for heroku monthly for the ssl capability (and the 24/7 uptime), changing the cname record of the godaddy url and enabling forwarding. This isn't a perfect solution but it works and I am happy with it."
    },
    {
        "title": "How to display the dev log:",
        "content": "Used material ui for the dev log anyway! We have come full circle. I just created new devlog data file with an array of section objects with title/content that I built a material page with using the map function and creating components from the callback."
    },{
        "title": "Terrain part1:",
        "content": "First attempts at using perlin noise alg to generate terrain using a plane and coloring based off of vertex Z values."
    },
    {
        "title": "Terrain part2:",
        "content": "Spent a few more hours trying to nail down a good low poly terrain look from procedural generation. Sadly, regular geometries have become deprecated so vertices and colors and position data for large planes to really get the look I want is now extremely difficult to get. Everything is in a buffer, and the vertices just do not want to behave and not blend to really get that low poly look without me building it entirely myself using vertices and color data. Possible, but tedios, and not something to do with noise. The move might just be to pickup blender, create a terrain there, and import. Every resource for procedural generation from before 2021 is now not as useful."
    },
    {
        "title": "Frustration building:",
        "content": "Controls in 3d scene stopped working, getting memory exceeds in my heroku app, other scene just not working. Frustrated. Commenting things out to have a smaller working project again."
    },
    {
        "title": "Terrain pt 3, new scene idea:",
        "content": "Spent a while trying to re implement the Geometry class I wanted but became busy with work and applications so put a plug in that for now and switched to something new. Loading a 3d model with animations and making a lightweight character controller. Ultimately will want to create a full state machine for the character, but simple 3d camera and movement with scrappy animations works for me for now. Going to work on building out the scene a little bit to explore."
    },
    {
        "title": "Actual semblence of gameplay",
        "content": "Added html controls for mobile. Robot can walk around, run animation is smooth, transition to idle not great but works. Can go around and touch a box and increase score."
    },
    {
        "title": "Mainmenu/gameover",
        "content": "When you start the game, display a start menu and disable movement by setting speed to 0, when you reach a certain score, display menu and pause movement again. The boxes reshifting every time you get to one is because it rerenders but holds that state for touched box, this came from me being too lazy to prevent re renders and I liked the way it played."
    },
    {
        "title": "Global/gamestate",
        "content": "Moving gamestate and state-related things to a Zustand store now rather than later to save headache down the road. Start with boxes, score and playstate."
    }
]