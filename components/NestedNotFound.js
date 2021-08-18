const NestedNotFound = () => {
    return;
};

export function getServerSideProps({ params }) {
    return {
        redirect: {
            destination: '/', // eg: destination: '/player/' + params.playerId,
            permanent: false,
        },
    };
}

export default NestedNotFound;
