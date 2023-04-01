import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestExample = ({ baseEndpoint, defaultPaths} ) => {
    const [updatedPaths, setUpdatedPaths] = useState(defaultPaths);
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="mt-3 flex items-center justify-center rounded-t-lg border">
                <div className="inline-block h-full">{baseURL + baseEndpoint}</div>
                {defaultPaths.map((defaultPath, index) => (
                    <>
                        <div className="inline-block h-full px-1">/</div>
                        <input
                            defaultValue={defaultPath}
                            type="text"
                            className="w-full sm:w-auto flex p-2"
                            onChange={(event) => handleInputChange(index, event)}
                        />
                    </>
                ))}
                <button
                    onClick={handleCopyUrl}
                    className="ml-2 p-2 border rounded hover:bg-gray-500"
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
