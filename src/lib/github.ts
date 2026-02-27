const GITHUB_API_URL = "https://api.github.com";

/**
 * Fetches the repositories owned by the User.
 */
export async function getAdminRepos(accessToken: string) {
  try {
    const response = await fetch(`${GITHUB_API_URL}/user/repos?sort=updated&per_page=10&affiliation=owner`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (!response.ok) return [];
    return await response.json();
  } catch (err) {
    console.error("❌ Network Error fetching repos:", err);
    return [];
  }
}

/**
 * DEEP SCAN: Fetches the specific files changed in a commit.
 * This reveals the "Real Work" behind lazy commit messages.
 */
export async function getCommitDetails(accessToken: string, owner: string, repo: string, sha: string) {
  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/commits/${sha}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const data = await response.json();
    
    // Extract only the filenames to keep the payload lean for the AI
    return {
      files: data.files?.map((f: any) => f.filename) || [],
      stats: data.stats, // Optional: useful if you want to see additions/deletions
    };
  } catch (err) {
    console.error(`❌ Error fetching commit details for ${sha}:`, err);
    return null;
  }
}

/**
 * Fetches real-time commits with a placeholder for file details.
 */
export async function getRecentCommits(accessToken: string, owner: string, repo: string) {
  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/commits?per_page=100`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (!response.ok) return [];

    const data = await response.json();

    return data.map((c: any) => ({
      sha: c.sha,
      fullSha: c.sha, // Keep full SHA for detailed fetching
      message: c.commit.message,
      date: c.commit.author?.date,
      author: c.commit.author?.name || "Unknown Author",
      url: c.html_url,
      avatar: c.author?.avatar_url,
      // We don't fetch files here to avoid hitting GitHub rate limits in a loop.
      // The CommitCard will fetch details individually when needed.
    }));
  } catch (err) {
    console.error("❌ Network Error fetching commits:", err);
    return [];
  }
}