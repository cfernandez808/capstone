#!/bin/bash
set -e
IFS='|'

AWSCLOUDFORMATIONCONFIG="{\
\"Region\": \"us-east-1\",\
\"DeploymentBucketName\": \"amplify-readingface-test-233027-deployment\",\
\"UnauthRoleName\": \"amplify-readingface-test-233027-unauthRole\",\
\"StackName\": \"amplify-readingface-test-233027\",\
\"StackId\": \"arn:aws:cloudformation:us-east-1:599331463232:stack/amplify-readingface-test-233027/31f58a00-342d-11eb-a4f1-0ebd71830845\",\
\"AuthRoleName\": \"amplify-readingface-test-233027-authRole\",\
\"UnauthRoleArn\": \"arn:aws:iam::599331463232:role/amplify-readingface-test-233027-unauthRole\",\
\"AuthRoleArn\": \"arn:aws:iam::599331463232:role/amplify-readingface-test-233027-authRole\"\
}"
PROVIDER_CONFIG="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"


# AWS_CONFIG="{\
# \"configLevel\":\"project\",\
# \"useProfile\":true,\
# \"profileName\":\"default\"\
# }"

amplify env import \
--name test \
--config $PROVIDER_CONFIG \
# --awsInfo $AWS_CONFIG \
