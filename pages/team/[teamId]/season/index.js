const NestedNotFound = () => {
    return;
};

export function getServerSideProps({ params }) {
    return {
        redirect: {
            destination: '/team/' + params.teamId,
            permanent: false,
        },
    };
}

export default NestedNotFound;
