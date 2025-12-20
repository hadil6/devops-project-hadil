import scanner from 'sonarqube-scanner';

scanner.default({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectKey': 'devops-api',
    'sonar.projectName': 'DevOps API',
    'sonar.projectVersion': '1.0',
    'sonar.sources': '.',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.login': 'sqp_4b4fd7e52c5c21ba6d2dcc54f7113f571556d5a5'
  }
}, () => process.exit());
