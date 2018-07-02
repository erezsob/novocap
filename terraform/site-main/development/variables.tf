variable "region" {}

variable "project" {
  default = "noproject"
}

variable "environment" {
  default = "default"
}

variable "prefix_name" {}

variable "domain" {}

variable "bucket_name" {
  description = "The name of the S3 bucket to create."
}

variable "duplicate_content_penalty_secret" {}

# variable "acm_certificate_arn" {}

variable "routing_rules" {
  default = ""
}

variable "not_found_response_path" {
  default = "/404.html"
}

variable "tags" {
  type        = "map"
  description = "Optional Tags"
  default     = {}
}

variable "trusted_signers" {
  type    = "list"
  default = []
}

variable "forward_query_string" {
  description = "Forward the query string to the origin"
  default     = false
}
