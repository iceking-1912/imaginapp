import React from 'react';
import { usePollinationsImage } from '@pollinations/react';

const FuturisticCityComponent = () => {
    const imageUrl = usePollinationsImage('A futuristic city with a smooth, uncluttered sky transitioning from warm orange to soft purple tones at sunset. Tall, sleek skyscrapers dominate the view, with large, bold, holographic 3D billboards showcasing futuristic advertisements. The buildings have clean, reflective surfaces, and the streets below are streamlined with minimal crowding. Flying cars gracefully hover in the air, adding a high-tech element to the serene and organized environment. The scene emphasizes verticality and modern aesthetics with a polished cyberpunk vibe.', {
        width: 720,
        height: 1280,
        seed: 44,
        model: 'flux'
    });
    
    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'futuristic_city.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    
    return (
        <div>
            {imageUrl ? (
                <div>
                    <img src={imageUrl} alt="Futuristic City" />
                    <button onClick={handleDownload}>Download Image</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default FuturisticCityComponent;