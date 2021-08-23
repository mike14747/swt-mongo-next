const NestedNotFound = () => {
    return;
};

export function getServerSideProps() {
    return {
        redirect: {
            destination: '/results',
            permanent: false,
        },
    };
}

export default NestedNotFound;
