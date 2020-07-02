pipeline {
  agent any

  parameters {
    string(defaultValue: "5000", description: 'Порт API', name: 'port', trim: true)
  }


  stages {
    stage('Build and run') {
      steps {
         sh """
           image=learn-graphql_${GIT_BRANCH}
           echo "Remove old image \$image"
           [ "\$(docker images -qa --filter=reference=\${image})" ] && docker rmi \$image
           echo "Building image \$image"
           docker build --network host -t \$image -f ./backend/Dockerfile ./backend 
           echo "Run new container \$image"
           docker run -d --network host -p 0.0.0.0:5000:5000/tcp \$image
         """
      }
    }
  }
}

//  echo "Remove old container \$image"
// [ "\$(docker ps -a -q --filter ancestor=\$image --format="{{.ID}}")" ] && docker rm \$(docker stop \$(docker ps -a -q --filter ancestor=\$image --format="{{.ID}}"))
          
