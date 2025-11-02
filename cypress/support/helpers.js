export function getRandomNumber() {
  return new Date().getTime();
}

export function getRandomEmail() {
  return `qa-tester-${getRandomNumber()}@test.com`;
}

require('browserstack-cypress-cli/bin/testObservability/cypress');
