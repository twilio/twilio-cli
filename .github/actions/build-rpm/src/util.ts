import * as fs from 'fs';
import * as path from 'path';

export type VariableKeyPair = {
  name: string;
  value: string;
}

export function parseInputVariables(variables: string): VariableKeyPair[] {
  if (variables !== '') {
    const lineRegex = /^[a-zA-Z0-9_]+=[~a-zA-Z0-9_.-]+$/m;
    // "foo=bar\nboo=foo" -> ["foo=bar", "boo=foo"] -> [["foo", "bar"], ["boo", "foo"]]
    const validateLine = (line: string): string => {
      if (!lineRegex.test(line)) {
        throw new Error(
          `Expected the line input to be in "<name>=<value>" form, got ${line} instead`
        );
      }

      return line;
    }

    return variables
      .split('\n')
      .map(validateLine)
      .map(varPair => varPair.split('='))
      .map(vars => ({name: vars[0], value: vars[1]}));
  }

  return [];
}

export function parseInputSources(sources: string): string[] {
  const validatePath = (filePath: string): string => {
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Expected a valid path to a file, got ${filePath} instead`
      );
    }

    return filePath;
  }

  return sources.split('\n').map(validatePath);
}

export function validateInputFile(filePath: string): string {
  const fullPath = path.resolve(filePath);
  if (fs.existsSync(fullPath)) {
    return fullPath;
  } else {
    throw new Error(`File doesn't exist in: ${fullPath}`);
  }
}

export function copyFileToDir(file: string, targetDir: string): void {
  fs.copyFileSync(file, `${targetDir}/${path.basename(file)}`);
}

export function findFileByExt(
  base: string,
  ext: string,
  files = fs.readdirSync(base),
  result: string[] = []
): string[] {
  for (const file of files) {
    const newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = findFileByExt(newbase, ext, fs.readdirSync(newbase), result);
    } else {
      if (file.substr(-1 * (ext.length + 1)) === `.${ext}`) {
        result.push(newbase);
      }
    }
  }

  return result;
}
