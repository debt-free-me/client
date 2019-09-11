# Arn output arn:aws:iam::{{aws-account-id}}:policy/{{prefix}}-codepipeline-policy
aws iam create-policy --policy-name {{prefix}}-codepipeline-policy --policy-document file://codepipeline-policy.json

# Arn output arn:aws:iam::{{aws-account-id}}:policy/{{prefix}}-codebuild-policy
aws iam create-policy --policy-name {{prefix}}-codebuild-policy --policy-document file://codebuild-policy.json