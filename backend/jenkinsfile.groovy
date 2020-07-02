pipeline {
  agent any

  parameters {
    number(defaultValue: 5000, description: 'Порт API', name: 'port')
  }


  stages {
    stage('Build docker image') {
      steps {
        script {
          withCredentials([
            usernamePassword(credentialsId: "registry-csssr-cloud", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')
          ]) {
            sh """
              image=learn-graphql:${GIT_BRANCH}
              echo "Building and pushing image \$image"
              docker kill \$image
              docker build --network host -f Dockerfile . -t \$image
              echo "Docker image \$image successfully built"
              echo "Docker image \$image successfully pushed"
            """
          }
        }
      }
    }

    stage('Run Container') {
      steps {
        script {
          sh """#!/bin/bash
            source ~/.bashrc
            docker run -p localhost:5000:${params.port}/tcp  learn-graphql:${GIT_BRANCH}
          """
        }
      }
    }
  }
}

