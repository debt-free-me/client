# Arn output arn:aws:iam::{{aws-account-id}}:policy/debtfreemeclient-codepipeline-policy
aws iam create-policy --policy-name debtfreemeclient-codepipeline-policy --policy-document file://codepipeline-policy.json

# Arn output arn:aws:iam::{{aws-account-id}}:policy/debtfreemeclient-codebuild-policy
aws iam create-policy --policy-name debtfreemeclient-codebuild-policy --policy-document file://codebuild-policy.json