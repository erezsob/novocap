#!/usr/bin/env groovy

properties([
    buildDiscarder(
        logRotator(artifactDaysToKeepStr: '10', artifactNumToKeepStr: '10', daysToKeepStr: '10', numToKeepStr: '10')),
    disableConcurrentBuilds(), pipelineTriggers([githubPush()])]
)

def containerName
def gitCommit
def gitUrl
def buildInfo = "`BUILD_STATUS`: BUILD_STATUS_RESULT \n" +
    "`BUILD_NUMBER`: ${env.BUILD_NUMBER} \n" +
    "`BUILD_URL`: ${env.BUILD_URL} \n"

timestamps {
    ansiColor('xterm') {
        try {
            node('jenkins-slave-docker') {

                stage('Checkout') { checkout scm }

                stage('Configuration') {
                    // https://stackoverflow.com/a/36332154
                    gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    gitCommitShort = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()

                    // https://stackoverflow.com/a/41620469
                    gitUrl = sh(returnStdout: true, script: 'git config remote.origin.url').trim()

                    buildInfo += "`EXECUTOR_NUMBER`: ${env.EXECUTOR_NUMBER} \n" +
                        "`GIT_COMMIT`: ${gitCommit} \n" +
                        "`GIT_URL`: ${gitUrl} \n" +
                        "`JOB_NAME`: ${env.JOB_NAME} \n" +
                        "`NODE_NAME`: ${env.NODE_NAME} \n"
                    containerName = "${gitCommitShort}_${env.BUILD_NUMBER}_${currentBuild.startTimeInMillis}"
                    // ensure non-conflict with existent containers, even for the same commit
                }

                parallel Test: {
                    stage('Test') {
                        sh "CONTAINER_NAME=test_${containerName} make test"
                    }
                }, Build: {
                    stage('Build') {
                        sh "CONTAINER_NAME=build_${containerName} make build"
                    }
                }


                stage('Archive') { archiveArtifacts artifacts: 'dist/*.*', fingerprint: true, onlyIfSuccessful: true }

                if (env.BRANCH_NAME == 'develop') {
                    stage('Publish') {
                        // clean bucket
                        sh 'aws --region eu-central-1 s3 rm s3://dev-myob-nextgen.orderbird.com/ --recursive'

                        // upload new files
                        s3Upload(
                            acl: 'PublicRead',
                            file: 'dist',
                            bucket: 'dev-myob-nextgen.orderbird.com',
                            path: '')
                    }
                }

                stage('Clean') {
                    sh "docker stop \$(docker ps -aq --filter name=${containerName})"
                    sh "docker rm \$(docker ps -aq --filter name=${containerName})"
                    // not deleting the downloaded base image, in order to speed other builds
                    cleanWs()
                }

                stage('Notify') {
                    buildInfo = buildInfo.replaceAll('BUILD_STATUS_RESULT', 'SUCCESS')
                    emailBody = buildInfo.replaceAll('`', '')

                    mail subject: "SUCCESS: ${env.JOB_NAME} (${env.BUILD_NUMBER})",
                        body: "${emailBody}",
                        to: 'erez.sobel@orderbird.com,roland.castillo@orderbird.com'

                    slackSend channel: 'falcon_system',
                        color: 'good',
                        tokenCredentialId: 'slack-integration-token',
                        message: "${buildInfo}"

                }
            }
        } catch (exc) {
            buildInfo += "`BUILD_EXCEPTION`: \n ```${exc}``` \n"
            buildInfo = buildInfo.replaceAll('BUILD_STATUS_RESULT', 'FAILURE')
            emailBody = buildInfo.replaceAll('`', '')

            mail subject: "FAILURE: ${env.JOB_NAME} (${env.BUILD_NUMBER})",
                body: "${emailBody}",
                to: 'erez.sobel@orderbird.com,roland.castillo@orderbird.com'

            slackSend channel: 'falcon_system',
                color: 'danger',
                tokenCredentialId: 'slack-integration-token',
                message: "${buildInfo}"

            /* Rethrow to fail the Pipeline properly */
            throw exc
        }
    }
}