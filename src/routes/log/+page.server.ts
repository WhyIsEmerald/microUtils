import { execSync } from "child_process";

export async function load() {
  const log = execSync(
    'git log --first-parent --pretty=format:"%h %ad %s" --date=short',
  ).toString();
  const commits = log.split("\n").map((line) => {
    const [hash, date, ...messageArr] = line.split(" ");
    const message = messageArr.join(" ");
    return { hash, date, message, isMerge: false };
  });

  commits.reverse();

  const messageCounts = new Map<string, number>();
  const processedCommits = commits.map((commit) => {
    const exceptions: Record<string, { message: string; isMerge: boolean }> = {
      "180894a": { message: "Merged frontend", isMerge: true },
      ad213ed: { message: "Humble beginnings", isMerge: false },
    };

    let message = commit.message;
    let isMerge = false;

    if (exceptions[commit.hash]) {
      message = exceptions[commit.hash].message;
      isMerge = exceptions[commit.hash].isMerge;
    } else if (message.startsWith("Merge pull request #")) {
      isMerge = true;
      const branch = message.split(" ").pop();
      if (branch) {
        const branchName = branch.split("/").pop();
        if (branchName) {
          message = `Merged ${branchName}`;
        }
      }
    }

    const count = messageCounts.get(message) || 0;
    messageCounts.set(message, count + 1);
    if (count > 0) {
      message = `${message} #${count + 1}`;
    }

    return { ...commit, message, isMerge };
  });

  processedCommits.reverse();

  return {
    commits: processedCommits,
  };
}
