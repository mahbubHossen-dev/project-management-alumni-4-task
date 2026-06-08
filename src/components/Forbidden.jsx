import React from 'react';

const Forbidden = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
                <div className="max-w-md w-full bg-base-100 shadow-xl rounded-2xl p-8 text-center">

                    <div className="text-7xl mb-4">
                        🚫
                    </div>

                    <h1 className="text-5xl font-bold text-error">
                        403
                    </h1>

                    <h2 className="text-2xl font-semibold mt-3">
                        Access Denied
                    </h2>

                    <p className="text-gray-500 mt-3">
                        You don't have permission to access this page.
                        Please contact the administrator if you believe
                        this is a mistake.
                    </p>

                    <div className="mt-6">
                        <button
                            onClick={() => window.history.back()}
                            className="btn btn-primary"
                        >
                            Go Back
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Forbidden;