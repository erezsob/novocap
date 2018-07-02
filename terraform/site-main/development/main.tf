################################################################################################################
## Configure the AWS provider for the specific region
################################################################################################################
terraform {
  backend "s3" {
    bucket = "falcon-terraform"
    key    = "states/development/myob-nextgen.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = "${var.region}"
}

################################################################################################################
## Configure the bucket and static website hosting
################################################################################################################
data "template_file" "bucket_policy" {
  template = "${file("${path.module}/website_bucket_policy.json")}"

  vars {
    bucket = "${var.bucket_name}"
    secret = "${var.duplicate_content_penalty_secret}"
  }
}

resource "aws_s3_bucket" "website_bucket" {
  bucket   = "${var.bucket_name}"
  policy   = "${data.template_file.bucket_policy.rendered}"
  force_destroy = true


  website {
    index_document = "index.html"
    error_document = "404.html"
    routing_rules  = "${var.routing_rules}"
  }

  //  logging {
  //    target_bucket = "${var.log_bucket}"
  //    target_prefix = "${var.log_bucket_prefix}"
  //  }

  tags = "${merge("${var.tags}",map("Name", "${var.bucket_name}", "Environment", "${var.environment}", "Domain", "${var.domain}", "Project", "${var.project}"))}"
}

# ################################################################################################################
# ## Configure the credentials and access to the bucket for a deployment user
# ################################################################################################################
data "template_file" "deployer_role_policy_file" {
  template = "${file("${path.module}/deployer_role_policy.json")}"

  vars {
    bucket = "${var.bucket_name}"
  }
}

resource "aws_iam_policy" "iam_policy" {
  name        = "${var.prefix_name}-deployer-policy"
  path        = "/"
  description = "Policy allowing to publish a new version of the website to the S3 bucket"
  policy      = "${data.template_file.deployer_role_policy_file.rendered}"
}

resource "aws_iam_policy_attachment" "iam_policy_attachment" {
  name       = "${var.bucket_name}-deployer-policy-attachment"
  users = [ "${var.project}-deployer"]
  policy_arn = "${aws_iam_policy.iam_policy.arn}"
}
