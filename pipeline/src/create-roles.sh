# output arn arn:aws:iam::{{aws-account-id}}:role/debtfreemeclient-codepipeline-role
aws iam create-role --role-name debtfreemeclient-codepipeline-role --assume-role-policy-document file://codepipeline-role.json

# output arn arn:aws:iam::{{aws-account-id}}:role/debtfreemeclient-codebuild-role
aws iam create-role --role-name debtfreemeclient-codebuild-role --assume-role-policy-document file://codebuild-role.json

