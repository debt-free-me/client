aws iam attach-role-policy --policy-arn arn:aws:iam::{{aws-account-id}}:policy/debtfreemeclient-codepipeline-policy --role-name debtfreemeclient-codepipeline-role &
#pid=$!
#wait $pid
#echo $pid was terminated.