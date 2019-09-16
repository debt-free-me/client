aws s3api create-bucket --bucket {{prefix}}-website-{{aws-account-id}}-{{aws-region}}-s3 --region {{aws-region}} --create-bucket-configuration LocationConstraint={{aws-region}}

aws s3api put-bucket-website --bucket {{prefix}}-website-{{aws-account-id}}-{{aws-region}}-s3 --website-configuration file://target-bucket-hosting.json

aws s3api put-bucket-policy --bucket {{prefix}}-website-{{aws-account-id}}-{{aws-region}}-s3 --policy file://target-bucket-policy.json