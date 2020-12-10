const NoMatch = () => {
    return (
        <div id="no-match">
            <p className="error"><b>Error 404!</b></p>
            <p>An error has occurred.</p>
            <p>The page you are looking for does not exist!</p>
            <style jsx>{`
                #no-match {
                    margin: 1.5rem;
                    font-size: 120%;
                }

                .error {
                    color: #dc3545;
                }
            `}</style>
        </div>
    );
};

export default NoMatch;
