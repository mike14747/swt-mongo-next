import PropTypes from 'prop-types';
import PlayerStatsBlockItem from './subcomponents/playerStatsBlockItem';

const PlayerStatsBlock = ({ stats }) => {
    return (
        <div className="grid-container">
            <PlayerStatsBlockItem heading="Games Played" value={stats.gamesPlayed} />
            <PlayerStatsBlockItem heading="Total Points" value={stats.totalPoints} />
            <PlayerStatsBlockItem heading="Avg / Game" value={(stats.totalPoints / stats.gamesPlayed).toFixed(1)} />
            <PlayerStatsBlockItem heading="800+ games" value={`${stats.num800plus} (${(stats.num800plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
            <PlayerStatsBlockItem heading="700+ games" value={`${stats.num700plus} (${(stats.num700plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
            <PlayerStatsBlockItem heading="600+ games" value={`${stats.num600plus} (${(stats.num600plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
            <PlayerStatsBlockItem heading="500+ games" value={`${stats.num500plus} (${(stats.num500plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
            <PlayerStatsBlockItem heading="400+ games" value={`${stats.num400plus} (${(stats.num400plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
            <PlayerStatsBlockItem heading="300+ games" value={`${stats.num300plus} (${(stats.num300plus * 100 / stats.gamesPlayed).toFixed(1)})%`} />
            <PlayerStatsBlockItem heading="High Game" value={`${stats.highGame} (${stats.numHighGames})`} />
            <PlayerStatsBlockItem heading="Best 10-game series" value={stats.highTenGame} />

            <style jsx>{`
                .grid-container {
                    display: grid;
                    grid-template-columns: auto auto;
                    border: 1px #6c757d solid;
                }
                .grid-container:last-child {
                    border-bottom: 0;
                }
            `}</style>
        </div>
    );
};

PlayerStatsBlock.propTypes = {
    stats: PropTypes.object,
};

export default PlayerStatsBlock;
