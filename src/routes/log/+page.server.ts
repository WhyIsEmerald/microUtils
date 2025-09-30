import { execSync } from "child_process";

export async function load() {
  const log = execSync(
    'git log --first-parent --pretty=format:"%h %ad %s" --date=short',
  ).toString();
  const commits = log.split("\n").map((line) => {
    const exceptions: Record<string, string> = {
      "180894a": "Merged frontend",
    };

    const [hash, date, ...messageArr] = line.split(" ");
    let message = messageArr.join(" ");
    let isMerge = false;

    if (exceptions[hash]) {
      message = exceptions[hash];
      isMerge = true;
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
    return { hash, date, message, isMerge };
  });

  return {
    commits,
  };
}
