import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestExample = ({ baseEndpoint, defaultPaths} ) => {
    const [updatedPaths, setUpdatedPaths] = useState(defaultPaths);
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const baseURL = 'https://api.antapi.org';

    const handleInputChange = (index, event) => {
        const newPaths = [...updatedPaths];
        newPaths[index] = event.target.value;
        setUpdatedPaths(newPaths);
    };

    const getFullURL = () => {
        if (updatedPaths.length === 0) {
            return baseURL + baseEndpoint;
        }
        return baseURL + baseEndpoint + '/' + updatedPaths.join('/');
    }

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(getFullURL());
    }

    const fetchData = async () => {
        if (!getFullURL()) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get(getFullURL());
            setResult(response.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [getFullURL()]);

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
            <div className="px-3 rounded-b-lg pre-wrap whitespace-pre-wrap overflow-auto h-48 border">
                {isLoading ? (
                    "Loading..."
                ) : (
                    JSON.stringify(result, null, 2)
                )}
            </div>
        </>

    );
}

export default RequestExample;
