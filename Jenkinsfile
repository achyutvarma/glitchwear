pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/achyutvarma/glitchwear.git'
            }
        }

        stage('Deploy Static Files') {
            steps {
                sh '''
                    set -e

                    # Ensure deploy directory exists (root-owned)
                    sudo -n mkdir -p /var/www/glitchwear

                    # Sync repo contents to web root, excluding CI metadata
                    sudo -n rsync -av --delete ./ /var/www/glitchwear/ \
                        --exclude='.git' \
                        --exclude='.github' \
                        --exclude='Jenkinsfile'
                '''
            }
        }

        stage('Reload Nginx') {
            steps {
                sh '''
                    set -e

                    # Validate nginx config, then reload
                    sudo -n nginx -t
                    sudo -n systemctl reload nginx
                '''
            }
        }
    }
}
