const NestedNotFound = () => {
    return;
};

export function getServerSideProps() {
    return {
        redirect: {
            destination: '/schedule',
            permanent: false,
        },
    };
}

export default NestedNotFound;
