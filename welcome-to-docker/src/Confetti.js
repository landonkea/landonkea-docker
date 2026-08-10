// "import Particles" loads the main React component from react-particles, it renders the particle animation
import Particles from "react-particles";
// "useCallback" is a React hook that memoizes (caches) a function so it doesn't get recreated on every render, keeps things fast
import { useCallback } from "react";
// "loadFull" loads the complete tsparticles library with all features, needed for the confetti to work
import { loadFull } from "tsparticles";

// "const Confetti = () =>" defines a React functional component, this entire file creates the confetti effect
const Confetti = () => {

    // "particlesInit" runs once when the particles engine is first created
    // "useCallback" wraps it so it only gets recreated if its dependencies change (empty [] means never)
    // "async engine =>" means this function receives the particles engine and can do async work
    const particlesInit = useCallback(async engine => {
        // Logs the engine object to the console for debugging (you can see it in browser DevTools)
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        // "await loadFull(engine)" loads all tsparticles features, it's async so we wait for it to finish
        await loadFull(engine);
        // "}, []" closes useCallback and the empty array means this function is created only once
    }, []);

    // "particlesLoaded" runs after all particles have been created and added to the screen
    // It receives the particle container object
    const particlesLoaded = useCallback(async container => {
        // Logs the container to the console, useful for debugging to confirm particles loaded
        await console.log(container);
        // "}, []" means this callback is also created only once
    }, []);

    // "return" renders the Particles component with all the confetti configuration
    return (
        // "<Particles>" is the main component that renders the canvas for the animation
        <Particles
            // "id='tsparticles'" gives the component a unique HTML ID, tsparticles uses this to find the container
            id="tsparticles"
            // "init" passes the initialization function, called once when the engine starts
            init={particlesInit}
            // "loaded" passes the callback for when particles are done loading
            loaded={particlesLoaded}
            // "options" is the big configuration object that controls everything about the confetti
            options={{
                // "fullScreen: { zIndex: 1 }" makes the confetti cover the entire screen
                // "zIndex: 1" puts it behind other content (higher z-index = more on top)
                fullScreen: {
                    zIndex: 1
                },
                // "emitters" are the sources that shoot out particles, we have two: one from the left, one from the right
                emitters: [
                    {
                        // "position: { x: 0, y: 30 }" places this emitter at the left edge (x=0%) and 30% down from the top
                        position: {
                            x: 0,
                            y: 30
                        },
                        // "rate" controls how many particles are emitted and how often
                        rate: {
                            // "quantity: 5" means 5 particles shoot out at a time
                            quantity: 5,
                            // "delay: 0.15" means there's a 0.15 second gap between each burst
                            delay: 0.15
                        },
                        particles: {
                            move: {
                                // "direction: 'top-right'" makes particles fly toward the upper-right corner
                                direction: "top-right",
                                // "outModes" controls what happens when particles fly off the screen
                                outModes: {
                                    // "top: 'none'" means particles that go off the top just disappear (don't bounce)
                                    top: "none",
                                    // "left: 'none'" means particles that go off the left just disappear
                                    left: "none",
                                    // "default: 'destroy'" means all other directions delete the particle when it leaves the screen
                                    default: "destroy"
                                }
                            }
                        }
                    },
                    {
                        // "position: { x: 100, y: 30 }" places the second emitter at the right edge (x=100%) and 30% down
                        position: {
                            x: 100,
                            y: 30
                        },
                        rate: {
                            quantity: 5,
                            delay: 0.15
                        },
                        particles: {
                            move: {
                                // "direction: 'top-left'" makes particles from the right side fly toward the upper-left corner
                                direction: "top-left",
                                outModes: {
                                    top: "none",
                                    // "right: 'none'" means particles that go off the right just disappear
                                    right: "none",
                                    default: "destroy"
                                }
                            }
                        }
                    }
                ],
                // "particles" defines what ALL particles look like and how they behave
                particles: {
                    // "color" sets the colors of the confetti pieces
                    color: {
                        // "value: ['#ffffff', '#FF0000']" means particles will randomly be white or red
                        value: [
                            "#ffffff",
                            "#FF0000"
                        ]
                    },
                    // "move" controls how particles travel across the screen
                    move: {
                        // "decay: 0.05" makes particles gradually slow down over time (0 = no slow, 1 = instant stop)
                        decay: 0.05,
                        // "direction: 'top'" means particles initially move upward
                        direction: "top",
                        // "enable: true" turns on particle movement (without this, particles would just sit still)
                        enable: true,
                        // "gravity" pulls particles downward over time, making them arc and fall like real confetti
                        gravity: {
                            // "enable: true" turns on gravity so particles fall after their initial burst
                            "enable": true
                        },
                        // "outModes" controls what happens when particles reach the edge of the screen
                        outModes: {
                            top: "none",
                            // "default: 'destroy'" deletes particles that leave the screen (frees up memory)
                            default: "destroy"
                        },
                        // "speed" controls how fast particles move, each particle gets a random speed in this range
                        speed: {
                            min: 10,
                            max: 50
                        }
                    },
                    // "number" controls how many particles exist on screen at once
                    number: {
                        // "value: 0" means start with zero particles, the emitters will add them over time
                        value: 0
                    },
                    // "opacity" controls the transparency of particles
                    opacity: {
                        // "value: 1" means fully opaque (not see-through at all), 0 would be invisible
                        value: 1
                    },
                    // "rotate" makes each particle spin around its own center
                    rotate: {
                        // "value: { min: 0, max: 360 }" means each particle starts at a random rotation (0 to 360 degrees)
                        value: {
                            min: 0,
                            max: 360
                        },
                        // "direction: 'random'" means each particle rotates in a random direction (clockwise or counter-clockwise)
                        direction: "random",
                        // "animation" makes the rotation happen continuously (particles keep spinning)
                        animation: {
                            enable: true,
                            // "speed: 30" controls how fast the spinning is
                            speed: 30
                        }
                    },
                    // "tilt" makes particles wobble/tilt back and forth, adds a tumbling effect
                    tilt: {
                        direction: "random",
                        enable: true,
                        value: {
                            min: 0,
                            max: 360
                        },
                        animation: {
                            enable: true,
                            speed: 30
                        }
                    },
                    // "size" controls how big each confetti piece is
                    size: {
                        // "value: { min: 0, max: 7 }" means each particle has a random size between 0 and 7 pixels
                        value: {
                            min: 0,
                            max: 7
                        },
                        // "animation" makes particles grow from small to their full size after being created
                        animation: {
                            enable: true,
                            // "startValue: 'min'" means particles start at their smallest size
                            startValue: "min",
                            // "count: 1" means the animation plays once per particle
                            count: 1,
                            // "speed: 16" controls how fast particles grow to full size
                            speed: 16,
                            // "sync: true" means all particles animate at the same time
                            sync: true
                        }
                    },
                    // "roll" makes particles rotate in 3D space, like a coin rolling on a table
                    roll: {
                        // "darken" makes the particle darker on one side as it rolls, creates a 3D shadow effect
                        darken: {
                            enable: true,
                            // "value: 25" darkens the shadowed side by 25%
                            value: 25
                        },
                        enable: true,
                        // "speed" controls how fast the rolling animation plays, each particle gets a random speed
                        speed: {
                            min: 5,
                            max: 15
                        }
                    },
                    // "wobble" makes particles sway side to side, like a leaf falling in the wind
                    wobble: {
                        // "distance: 30" controls how far the particle sways left and right (in pixels)
                        distance: 30,
                        enable: true,
                        // "speed" controls how fast the wobble happens, negative values reverse the direction
                        speed: {
                            min: -7,
                            max: 7
                        }
                    },
                    // "shape" determines what shape each confetti piece looks like
                    shape: {
                        // "type: ['square', 'triangle', 'polygon']" means particles are randomly squares, triangles, or polygons
                        type: [
                            "square",
                            "triangle",
                            "polygon"
                        ],
                        // "options" provides extra settings for specific shapes
                        options: {
                            // "polygon" defines how many sides the polygon shapes have
                            polygon: [
                                // "sides: 5" means some polygons are pentagons (5-sided shapes)
                                {
                                    sides: 5
                                },
                                // "sides: 6" means some polygons are hexagons (6-sided shapes)
                                {
                                    sides: 6
                                }
                            ]
                        }
                    }
                }
            }}
        />
    );
}

// "export default Confetti" makes this component available for import in other files, App.js imports it to show confetti
export default Confetti;
