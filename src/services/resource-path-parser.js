class ResourcePathParser {
  constructor(pathString) {
    this.pathParts = pathString.split('/');
    this.isInstanceResource = pathString.endsWith('}.json') || pathString.endsWith('}');
    this.version = this.pathParts[1];
  }

  removeFirstLeaf() {
    this.pathParts.splice(1, 1); // e.g. '/v1/foo' becomes '/foo'
  }

  removeJsonExtension() {
    this.pathParts[this.pathParts.length - 1] = this.pathParts[this.pathParts.length - 1].replace('.json', '');
  }

  normalizePath() {
    this.removeFirstLeaf();
    this.removeJsonExtension();
  }

  getFullPath() {
    return this.pathParts.join('/');
  }

  forEachPathNode(callback) {
    this.pathParts.filter(part => part).forEach(callback);
  }

  isPathVariable(pathNode) {
    return pathNode.startsWith('{');
  }
}

module.exports = ResourcePathParser;
