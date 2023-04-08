import React, { useState } from 'react';
import Image from 'next/image'

const ImageRequestExample = ({ baseEndpoint, defaultPaths} ) => {
    const [updatedPaths, setUpdatedPaths] = useState(defaultPaths);

    const baseURL = "http://localhost:11100";

    const handleInputChange = (index, event) => {
        const newPaths = [...updatedPaths];
        newPaths[index] = event.target.value;
        setUpdatedPaths(newPaths);
    };

    const getFullURL = () => {
        return baseURL + baseEndpoint + '/' + updatedPaths.join('/');
    }

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(getFullURL());
    }


    return (
        <>
            <div className="mt-3 flex flex-wrap items-center justify-center rounded-t-lg border">
                <div className="ml-2 inline-block h-full">{baseURL + baseEndpoint}</div>
                {defaultPaths.map((defaultPath, index) => (
                    <React.Fragment key={index}>
                        <div className="inline-block h-full px-0">/</div>
                        <input
                            defaultValue={defaultPath}
                            type="text"
                            className="flex-auto flex p-1 m-1 rounded-md"
                            onChange={(event) => handleInputChange(index, event)}
                        />
                    </React.Fragment>
                ))}
                <button
                    onClick={handleCopyUrl}
                    className="mx-2 p-1 border rounded hover:bg-gray-500"
                    title="Copy"
                >
                    Copy
                </button>
            </div>
            <div className="rounded-b-lg overflow-hidden border">
                <Image
                    src={getFullURL()}
                    alt={getFullURL()}
                    width={1650}
                    height={1050}
                />
            </div>
        </>

    );
}

export default ImageRequestExample;
