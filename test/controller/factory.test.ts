import { VirtualTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { expect } from 'chai';
import * as path from 'path';
import { ControllerOptions } from '../../src/controller/schema';

describe('Controller Factory', () => {
  const options: ControllerOptions = {
    extension: 'ts',
    name: 'name',
    path: 'name',
    rootDir: 'src/modules'
  };
  let runner: SchematicTestRunner;
  beforeEach(() => runner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json')
  ));
  it('should generate a new controller file', () => {
    const tree: UnitTestTree = runner.runSchematic('controller', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find(
        (filename) => filename === `/src/modules/${ options.path }/${ options.name }.controller.${ options.extension }`
      )
    ).to.not.be.undefined;
  });
  it('should generate the expected controller file content', () => {
    const tree: UnitTestTree = runner.runSchematic('controller', options, new VirtualTree());
    expect(
      tree
        .read(`/${ options.rootDir }/${ options.path }/${ options.name }.controller.${ options.extension }`)
        .toString()
    ).to.be.equal(
      'import { Controller } from \'@nestjs/common\';\n' +
      '\n' +
      '@Controller()\n' +
      'export class NameController {}\n'
    );
  });
});