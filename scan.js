const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'sqp_4b4fd7e52c5c21ba6d2dcc54f7113f571556d5a5', // remplace par ton token SonarQube
    options: {
      'sonar.projectKey': 'devops-api',
      'sonar.projectName': 'DevOps API',
      'sonar.projectVersion': '1.0',
      'sonar.sources': '.',
      'sonar.sourceEncoding': 'UTF-8'
    }
  },
  () => process.exit()
);
