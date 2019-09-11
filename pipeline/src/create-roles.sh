# output arn arn:aws:iam::{{aws-account-id}}:role/{{prefix}}-codepipeline-role
aws iam create-role --role-name {{prefix}}-codepipeline-role --assume-role-policy-document file://codepipeline-role.json

# output arn arn:aws:iam::{{aws-account-id}}:role/{{prefix}}-codebuild-role
aws iam create-role --role-name {{prefix}}-codebuild-role --assume-role-policy-document file://codebuild-role.json

