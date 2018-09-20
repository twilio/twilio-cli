const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

class ConfigDataProject {
  constructor(id, accountSid) {
    this.id = id;
    this.accountSid = accountSid;
  }
}

class ConfigData {
  constructor() {
    this.projects = [];
  }

  getProjectById(projectId) {
    return this.projects.find(project => {
      return project.id === projectId;
    });
  }

  removeProject(projectToRemove) {
    this.projects = this.projects.filter(project => {
      return project.id !== projectToRemove.id;
    });
  }

  addProject(id, accountSid) {
    const existing = this.getProjectById(id);
    if (existing) {
      existing.accountSid = accountSid;
    } else {
      this.projects.push(new ConfigDataProject(id, accountSid));
    }
  }

  loadFromObject(configObj) {
    configObj.projects = configObj.projects || [];
    configObj.projects.forEach(project => {
      this.addProject(project.id, project.accountSid);
    });
  }
}

class Config {
  constructor(configDir) {
    this.configDir = configDir;
    this.filePath = path.join(configDir, 'config.json');
  }

  async load() {
    const configData = new ConfigData();

    if (!fs.existsSync(this.filePath)) {
      return configData;
    }

    configData.loadFromObject(await fs.readJSON(this.filePath));
    return configData;
  }

  async save(userConfig) {
    shell.mkdir('-p', this.configDir);
    await fs.writeJSON(this.filePath, userConfig, { flag: 'w' });
  }
}

module.exports = { Config, ConfigData };
