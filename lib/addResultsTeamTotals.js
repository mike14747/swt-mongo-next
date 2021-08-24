export default function addResultsTeamDetails(results) {
    const improvedResults = results.map(week => {
        const matches = week.matches.map(match => {
            const teams = match.teams.map(team => {
                const teamTotals = {
                    wins: 0,
                    losses: 0,
                    ties: 0,
                    gameResults: new Array(10).fill(''),
                    gameTotals: new Array(10).fill(0),
                    totalPoints: 0,
                };

                team.players.forEach(player => {
                    player.scores.forEach((score, index) => teamTotals.gameTotals[index] += score);
                    teamTotals.totalPoints += player.totalPoints;
                });

                return {
                    ...team,
                    teamTotals,
                };
            });

            for (let i = 0; i <= 9; i++) {
                if (teams[0].teamTotals.gameTotals[i] === teams[1].teamTotals.gameTotals[i]) {
                    teams[0].teamTotals.ties++;
                    teams[0].teamTotals.gameResults[i] = 't';
                    teams[1].teamTotals.ties++;
                    teams[1].teamTotals.gameResults[i] = 't';
                } else if (teams[0].teamTotals.gameTotals[i] > teams[1].teamTotals.gameTotals[i]) {
                    teams[0].teamTotals.wins++;
                    teams[0].teamTotals.gameResults[i] = 'w';
                    teams[1].teamTotals.losses++;
                    teams[1].teamTotals.gameResults[i] = 'l';
                } else if (teams[0].teamTotals.gameTotals[i] < teams[1].teamTotals.gameTotals[i]) {
                    teams[0].teamTotals.losses++;
                    teams[0].teamTotals.gameResults[i] = 'l';
                    teams[1].teamTotals.wins++;
                    teams[1].teamTotals.gameResults[i] = 'w';
                }
            }

            return {
                alley: match.alley,
                startTime: match.startTime,
                teams,
            };
        });

        return {
            date: week.date,
            weekId: week.weekId,
            matches,
        };
    });

    return improvedResults;
}
