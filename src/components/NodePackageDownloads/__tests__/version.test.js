const { compareVersions } = require('../utils/version');

// You can run by next command
// npx jest src/components/NodePackageDownloads/__tests__/version.test.js
describe('compareVersions', () => {
  test('Compare same versions', () => {
    expect(compareVersions('v2.0.0', 'v2.0.0')).toBe(0);
    expect(compareVersions('v1.0.0', 'v1.0.0')).toBe(0);
  });

  test('Compare major versions', () => {
    expect(compareVersions('v2.0.0', 'v1.0.0')).toBe(1);
    expect(compareVersions('v1.0.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v10.0.0', 'v2.0.0')).toBe(1);
  });

  test('Compare minor versions', () => {
    expect(compareVersions('v2.1.0', 'v2.0.0')).toBe(1);
    expect(compareVersions('v2.0.0', 'v2.1.0')).toBe(-1);
  });

  test('Compare patch versions', () => {
    expect(compareVersions('v2.0.1', 'v2.0.0')).toBe(1);
    expect(compareVersions('v2.0.0', 'v2.0.1')).toBe(-1);
  });

  test('Compare complex versions', () => {
    expect(compareVersions('v2.1.1', 'v2.0.0')).toBe(1);
    expect(compareVersions('v2.0.0', 'v2.1.1')).toBe(-1);
    expect(compareVersions('v2.1.0', 'v2.0.1')).toBe(1);
  });

  test('Compare against v2.0.0', () => {
    expect(compareVersions('v3.0.0', 'v2.0.0')).toBe(1);
    expect(compareVersions('v2.1.0', 'v2.0.0')).toBe(1);
    expect(compareVersions('v2.0.1', 'v2.0.0')).toBe(1);
    expect(compareVersions('v2.0.0', 'v2.0.0')).toBe(0);
    expect(compareVersions('v1.0.3', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.0.2', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.0.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.0.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.12.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.12.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.11.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.11.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.10.2', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.10.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.10.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.9.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.9.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.8.4', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.8.3', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.8.2', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.8.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.8.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.7.3', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.7.2', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.7.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.7.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.6.4', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.6.3', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.6.2', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.6.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.6.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.5.3', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.5.2', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.5.2-rc.2', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.5.2-rc.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.5.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.5.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.4.2', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.4.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.4.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.3.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.2.0', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.2.0-rc.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.1.1', 'v2.0.0')).toBe(-1);
    expect(compareVersions('v1.1.0', 'v2.0.0')).toBe(-1);
  });
}); 