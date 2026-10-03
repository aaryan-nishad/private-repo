import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (count) => {
    try {
        for (let index = 0; index < count; index += 1) {
            const daysAgo = index === 0 ? 0 : random.int(0, 364);
            const date = moment().subtract(daysAgo, "days").format();

            console.log(`Creating commit dated ${date}`);
            await jsonfile.writeFile(path, { date });
            await git.add([path]);
            await git.commit(date, { "--date": date });
        }

        await git.push();
        console.log(`Created and pushed ${count} commits.`);
    } catch (error) {
        console.error("Failed to create or push commits:", error);
        process.exitCode = 1;
    }
};

makeCommits(100);
