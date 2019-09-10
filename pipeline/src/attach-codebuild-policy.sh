aws iam attach-role-policy --policy-arn arn:aws:iam::{{aws-account-id}}:policy/debtfreemeclient-codebuild-policy --role-name debtfreemeclient-codebuild-role & 
#pid=$!
#wait $pid
#echo $pid was terminated.