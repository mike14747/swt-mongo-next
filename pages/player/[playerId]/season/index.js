const NoPlayerSeason = () => {
    return;
};

export function getServerSideProps({ params }) {
    return {
        redirect: {
            destination: '/player/' + params.playerId,
            permanent: false,
        },
    };
}

export default NoPlayerSeason;
