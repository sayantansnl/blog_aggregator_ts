import { readConfig, setUser } from "./config.js";

function main() {
    const cfg = readConfig();
    setUser("Sayantan");
    console.log(cfg);
}

main();