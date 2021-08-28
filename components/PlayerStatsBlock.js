import PropTypes from 'prop-types';

import styles from '../styles/StatsBlock.module.css';

const PlayerStatsBlock = ({ stats }) => {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>Games Played</div>
                <div className={styles.statsValue}>{stats.gamesPlayed}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>Avg / Game</div>
                <div className={styles.statsValue}>{(stats.totalPoints / stats.gamesPlayed).toFixed(1)}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>800+ games</div>
                <div className={styles.statsValue}>{`${stats.num800plus} (${(stats.num800plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>700+ games</div>
                <div className={styles.statsValue}>{`${stats.num700plus} (${(stats.num700plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>600+ games</div>
                <div className={styles.statsValue}>{`${stats.num600plus} (${(stats.num600plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>500+ games</div>
                <div className={styles.statsValue}>{`${stats.num500plus} (${(stats.num500plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>400+ games</div>
                <div className={styles.statsValue}>{`${stats.num400plus} (${(stats.num400plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>300+ games</div>
                <div className={styles.statsValue}>{`${stats.num300plus} (${(stats.num300plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>High Game</div>
                <div className={styles.statsValue}>{`${stats.highGame} (${stats.numHighGames})`}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>Best 10-game series</div>
                <div className={styles.statsValue}>{stats.highTenGame}</div>
            </div>
        </div>
    );
};

PlayerStatsBlock.propTypes = {
    stats: PropTypes.object,
};

export default PlayerStatsBlock;
