import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
};

export function setUser(userName: string) {
    const cfg = readConfig();
    cfg.currentUserName = userName;
    writeConfig(cfg);
}

export function readConfig(): Config {
    const configFilePath = getConfigFilePath();
    const raw = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
    return validateConfig(raw);
}

function validateConfig(raw: any): Config {
    if (!raw || typeof raw !== "object") {
        throw new Error("Invalid config: not an object");
    }

    if (typeof raw.db_url !== "string") {
        throw new Error("Invalid config: db_url must be a string");
    }

    return {
        dbUrl: raw.db_url,
        currentUserName: raw.current_user_name,
    };
}

function getConfigFilePath(): string {
    const homeDir = os.homedir();
    const fileName = ".gatorconfig.json";
    return path.join(homeDir, fileName);
}

function writeConfig(cfg: Config): void {
    const configFilePath = getConfigFilePath();
    const json = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    };
    fs.writeFileSync(configFilePath, JSON.stringify(json));
}