const Loading = () => {
    return (
        <div id="loading">
            <img src="/images/loading/loading.gif" alt="Loading" />
            <style jsx>{`
                #loading {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: auto;
                    padding-bottom: 5rem;
                    width: 100vw;
                    height: 100vh;
                    background-color: #ffffff;
                }
            `}</style>
        </div>
    );
};

export default Loading;
