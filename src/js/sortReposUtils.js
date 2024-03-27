


class SortReposUtils{
    static sortByMatchingTopics(repoData, topicsList) {
        // Flatten the list of lists into a single list of repositories
        const reposList = repoData.flatMap(page => page);

        // Create a map to store the matching score for each repository
        const matchingScoreMap = new Map();

        // Iterate through each repository in the reposList
        reposList.forEach(repo => {
            // Calculate the matching score for the current repository
            const matchingScore = repo.topics.reduce((score, topic) => {
                // Increase the score if the repository topic exists in the topicsList
                if (topicsList.includes(topic)) {
                    return score + 1;
                }
                return score;
            }, 0);

            // Store the matching score for the repository in the map
            matchingScoreMap.set(repo, matchingScore);
        });

        // Sort the repositories list based on matching topics score first, then by last updated date
        reposList.sort((a, b) => {
            // Compare matching topics score
            const matchingScoreA = matchingScoreMap.get(a);
            const matchingScoreB = matchingScoreMap.get(b);
            if (matchingScoreA !== matchingScoreB) {
                return matchingScoreB - matchingScoreA; // Sort by descending matching score
            }

            // If matching topics score is equal, compare last updated date
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        return reposList;
    }


}
export default SortReposUtils;