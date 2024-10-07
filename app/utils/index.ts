export function formatScore(score: number) {
    if (score >= 1_000_000_000) {
        return `${(score / 1_000_000_000).toFixed(2)}B`;
    }
    if (score >= 1_000_000) {
        return `${(score / 1_000_000).toFixed(2)}M`;
    }
    if (score >= 1_000) {
        return `${(score / 1_000).toFixed(2)}K`;
    }
    return `${score}`;
}