// import React from 'react';
// import { usePollinationsImage } from '@pollinations/react';

// const GeneratedImageComponent = () => {
//     const imageUrl = usePollinationsImage('A hyperrealistic timelapse of flawlessly geometric clouds marching across a twilight sky, each cloud moving with mechanical precision, revealing a hidden grid-like structure beneath their surface.', {
//         width: 720,
//         height: 1280,
//         seed: 43,
//         model: 'flux'
//     });

//     return (
//         <div>
//             {imageUrl ? <img src={imageUrl} alt="Generated Image" /> : <p>Loading...</p>}
//         </div>
//     );
// };

// export default GeneratedImageComponent;



import React from 'react';
import { usePollinationsImage } from '@pollinations/react';

const GeneratedImageComponent = () => {
    // const imageUrl = usePollinationsImage("A futuristic city with flying cars and neon lights", {
    //     width: 1024,
    //     height: 1024,
    //     seed: 42,
    //     model: 'flux',
    //     nologo: true
    // });




    const items = [
        {
            prompt: "a whimsical treehouse village nestled in the treetops, connected by rope bridges and ladders",
            width: 720,
            height: 1280,
            seed: 43,
            model: "flux"
        },
        {
            prompt: "a group of astronauts exploring a distant galaxy, marveling at the wonders of the universet",
            width: 720,
            height: 1280,
            seed: 44,
            model: "flux"
        }, {
            prompt: "a fantasy kingdom with a majestic castle perched on a hill, overlooking the realm",
            width: 720,
            height: 1280,
            seed: 43,
            model: 'flux'
        }, {
            prompt: "a robot chef meticulously preparing a gourmet meal in a high-tech kitchen with advanced appliances",
            width: 720,
            height: 1280,
            seed: 43,
            model: 'flux'
        },
        {
            prompt: "A futuristic city with flying cars and neon lights",
            width: 1980,
            height: 1020,
            seed: 44,
            model: 'flux',
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {items.map((config, i) => {
                const imageUrl = usePollinationsImage(config.prompt, {
                    width: config.width,
                    height: config.height,
                    seed: config.seed,
                    model: config.model
                });
                return (
                    <img
                        key={i}
                        src={imageUrl}
                        alt={`Image ${i}`}
                        className="scale-50 rounded-3xl"
                    />
                );
            })}
        </div>
    )
};

export default GeneratedImageComponent;
