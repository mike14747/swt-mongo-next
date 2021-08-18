import PropTypes from 'prop-types';

import styles from '../styles/PlayerStatsBlock.module.css';

const PlayerStatsBlock = ({ stats }) => {
    return (
        <section className={styles.gridContainer}>
            <div className={styles.gridHeading}>Games Played</div>
            <div className={styles.gridValue}>{stats.gamesPlayed}</div>

            <div className={styles.gridHeading}>Avg / Game</div>
            <div className={styles.gridValue}>{(stats.totalPoints / stats.gamesPlayed).toFixed(1)}</div>

            <div className={styles.gridHeading}>800+ games</div>
            <div className={styles.gridValue}>{`${stats.num800plus} (${(stats.num800plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>

            <div className={styles.gridHeading}>700+ games</div>
            <div className={styles.gridValue}>{`${stats.num700plus} (${(stats.num700plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>

            <div className={styles.gridHeading}>600+ games</div>
            <div className={styles.gridValue}>{`${stats.num600plus} (${(stats.num600plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>

            <div className={styles.gridHeading}>500+ games</div>
            <div className={styles.gridValue}>{`${stats.num500plus} (${(stats.num500plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>

            <div className={styles.gridHeading}>400+ games</div>
            <div className={styles.gridValue}>{`${stats.num400plus} (${(stats.num400plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>

            <div className={styles.gridHeading}>300+ games</div>
            <div className={styles.gridValue}>{`${stats.num300plus} (${(stats.num300plus * 100 / stats.gamesPlayed).toFixed(1)})%`}</div>

            <div className={styles.gridHeading}>High Game</div>
            <div className={styles.gridValue}>{`${stats.highGame} (${stats.numHighGames})`}</div>

            <div className={styles.gridHeading}>Best 10-game series</div>
            <div className={styles.gridValue}>{stats.highTenGame}</div>
        </section>
    );
};

PlayerStatsBlock.propTypes = {
    stats: PropTypes.object,
};

export default PlayerStatsBlock;
