module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    reporters: [
      'default',
      ['jest-stare', {
        resultDir: 'unit-tests/reports/jest-stare',
        reportTitle: '📋 Relatório de Testes Unitários - Simulador CTFL',
        coverageLink: '../coverage/lcov-report/index.html',
        reportHeadline: '📌 Detalhamento dos testes automatizados com Jest',
        reportSummary: true,
        log: true,
        jestStareConfigJson: 'jest-stare-config.json',
        jestGlobalConfigJson: 'jest-global-config.json'
      }]
    ]
  };
  