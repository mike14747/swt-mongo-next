import PropTypes from 'prop-types';
import PlayerStatsBlockItem from './subcomponents/playerStatsBlockItem';

const PlayerStatsBlock = ({ stats }) => {
    return (
        <>
            <table className="table table-bordered table-hover">
                <tbody>
                    <PlayerStatsBlockItem heading="Games Played" value={stats.gamesPlayed} />
                    <PlayerStatsBlockItem heading="Total Points" value={stats.totalPoints} />
                    <PlayerStatsBlockItem heading="Avg / Game" value={(parseInt(stats.totalPoints) / stats.gamesPlayed).toFixed(1)} />
                    <PlayerStatsBlockItem heading="800+ games" value={`${stats.num800plus} (${(stats.num800plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
                    <PlayerStatsBlockItem heading="700+ games" value={`${stats.num700plus} (${(stats.num700plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
                    <PlayerStatsBlockItem heading="600+ games" value={`${stats.num600plus} (${(stats.num600plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
                    <PlayerStatsBlockItem heading="500+ games" value={`${stats.num500plus} (${(stats.num500plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
                    <PlayerStatsBlockItem heading="400+ games" value={`${stats.num400plus} (${(stats.num400plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
                    <PlayerStatsBlockItem heading="300+ games" value={`${stats.num300plus} (${(stats.num300plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
                    <PlayerStatsBlockItem heading="High Game" value={`${stats.highGame} (${stats.numHighGames})`} />
                    <PlayerStatsBlockItem heading="Best 10-game series" value={stats.highTenGame} />

                </tbody>
            </table>
        </>
    );
};

PlayerStatsBlock.propTypes = {
    stats: PropTypes.object,
};

export default PlayerStatsBlock;

/*
Total games played: 950

800+ games: 14 (1.5%)

700+ games: 61 (6.4%)

600+ games: 173 (18.2%)

500+ games: 351 (36.9%)

400+ games: 582 (61.3%)

300+ games: 777 (81.8%)

Average score per game: 451.5

High game: 900 (3)

Low game: 80 (1)

Best 10-game series: 6200
*/
