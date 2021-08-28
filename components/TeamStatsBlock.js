import PropTypes from 'prop-types';

import styles from '../styles/StatsBlock.module.css';

const TeamStatsBlock = ({ stats }) => {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>Record</div>
                <div className={styles.statsValue}>{stats.wins}-{stats.losses}-{stats.ties}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>Total Points</div>
                <div className={styles.statsValue}>{stats.totalPoints}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>1-game Average</div>
                <div className={styles.statsValue}>{stats.oneGameAvg}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>1-game High</div>
                <div className={styles.statsValue}>{stats.oneGameHigh}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>1-game Low</div>
                <div className={styles.statsValue}>{stats.oneGameLow}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>10-game Average</div>
                <div className={styles.statsValue}>{stats.tenGameAvg}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>10-game High</div>
                <div className={styles.statsValue}>{stats.tenGameHigh}</div>
            </div>

            <div className={styles.statsRow}>
                <div className={styles.statsHeading}>10-game Low</div>
                <div className={styles.statsValue}>{stats.tenGameLow}</div>
            </div>
        </div>
    );
};

TeamStatsBlock.propTypes = {
    stats: PropTypes.object,
};

export default TeamStatsBlock;
