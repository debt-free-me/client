aws s3api create-bucket --bucket debtfreemeclient-codepipeline-{{aws-region}}-bucket --region {{aws-region}} --create-bucket-configuration LocationConstraint={{aws-region}}