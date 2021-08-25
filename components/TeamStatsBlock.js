import PropTypes from 'prop-types';

import styles from '../styles/StatsBlock.module.css';

const TeamStatsBlock = ({ stats }) => {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.gridHeading}>Record</div>
            <div className={styles.gridValue}>{stats.wins}-{stats.losses}-{stats.ties}</div>

            <div className={styles.gridHeading}>Total Points</div>
            <div className={styles.gridValue}>{stats.totalPoints}</div>

            <div className={styles.gridHeading}>1-game Average</div>
            <div className={styles.gridValue}>{stats.oneGameAvg}</div>

            <div className={styles.gridHeading}>1-game High</div>
            <div className={styles.gridValue}>{stats.oneGameHigh}</div>

            <div className={styles.gridHeading}>1-game Low</div>
            <div className={styles.gridValue}>{stats.oneGameLow}</div>

            <div className={styles.gridHeading}>10-game Average</div>
            <div className={styles.gridValue}>{stats.tenGameAvg}</div>

            <div className={styles.gridHeading}>10-game High</div>
            <div className={styles.gridValue}>{stats.tenGameHigh}</div>

            <div className={styles.gridHeading}>10-game Low</div>
            <div className={styles.gridValue}>{stats.tenGameLow}</div>
        </div>
    );
};

TeamStatsBlock.propTypes = {
    stats: PropTypes.object,
};

export default TeamStatsBlock;
