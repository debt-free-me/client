bash create-source-bucket.sh && 
bash create-target-bucket.sh &&
bash create-roles.sh && 
bash create-policies.sh && 
bash attach-policies.sh &&
# need to wait the service role to be available?????
sleep 10 &&
bash create-codebuild.sh && 
bash create-codepipeline.sh &&
bash attach-codepipeline-webhook.sh