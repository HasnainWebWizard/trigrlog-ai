const GITHUB_API_URL = "https://api.github.com";

/**
 * Fetches the repositories owned by the User.
 * Sorted by latest update to show active projects first.
 */
export async function getAdminRepos(accessToken: string) {
  try {
    const response = await fetch(`${GITHUB_API_URL}/user/repos?sort=updated&per_page=10&affiliation=owner`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
      // We use no-store to ensure the dashboard reflects your latest pushes
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ GitHub Repo Fetch Error:", error);
      return [];
    }

    return await response.json();
  } catch (err) {
    console.error("❌ Network Error fetching repos:", err);
    return [];
  }
}

/**
 * Fetches real-time commits for a specific repository.
 * This provides the "Context" for our AI to write authentic posts.
 */
export async function getRecentCommits(accessToken: string, owner: string, repo: string) {
  try {
    // We fetch the 5 most recent commits
    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/commits?per_page=5`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`❌ GitHub Commits Error for ${repo}`);
      return [];
    }

    const data = await response.json();

    // Map to a cleaner structure so your UI doesn't have to deal with GitHub's nested JSON
    return data.map((c: any) => ({
      sha: c.sha,
      message: c.commit.message,
      date: c.commit.author?.date,
      author: c.commit.author?.name || "Unknown Author",
      url: c.html_url,
      avatar: c.author?.avatar_url
    }));
  } catch (err) {
    console.error("❌ Network Error fetching commits:", err);
    return [];
  }
}