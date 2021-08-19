const Loading = () => {
    return (
        <div id="loading">
            <img src="/images/loading/loading.gif" alt="Loading" />
            <style jsx>{`
                #loading {
                    text-align: center;
                    margin: 0;
                    padding: 3rem;
                    width: 100vw;
                    height: 100vh;
                    background-color: #ffffff;
                }
            `}</style>
        </div>
    );
};

export default Loading;
